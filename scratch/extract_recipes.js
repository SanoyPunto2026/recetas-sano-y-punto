const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Parse .env.local in the root directory
const envPath = path.join(__dirname, '../.env.local');
let supabaseUrl = '';
let supabaseServiceKey = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      if (key === 'NEXT_PUBLIC_SUPABASE_URL') supabaseUrl = value.trim();
      if (key === 'SUPABASE_SERVICE_ROLE_KEY') supabaseServiceKey = value.trim();
    }
  }
} catch (e) {
  console.error("Error reading .env.local manually:", e);
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials. Url:", supabaseUrl, "Key length:", supabaseServiceKey ? supabaseServiceKey.length : 0);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function extract() {
  console.log("Fetching recipes...");
  const { data, error } = await supabase
    .from('banco_recetas')
    .select('id, nombre_receta, ingredientes, pasos, categoria, emoji_representativo');

  if (error) {
    console.error("Error fetching recipes:", error);
    process.exit(1);
  }

  console.log(`Fetched ${data.length} recipes.`);
  
  // Format details for each recipe to prepare for prompt creation
  const processed = data.map(r => {
    let ingList = [];
    try {
      const ings = typeof r.ingredientes === 'string' ? JSON.parse(r.ingredientes) : r.ingredientes;
      if (Array.isArray(ings)) {
        ingList = ings.map(i => i.ingrediente || i);
      }
    } catch (e) {
      console.error(`Error parsing ingredients for ${r.nombre_receta}:`, e);
    }

    let lastStep = '';
    try {
      const steps = typeof r.pasos === 'string' ? JSON.parse(r.pasos) : r.pasos;
      if (Array.isArray(steps) && steps.length > 0) {
        lastStep = steps[steps.length - 1].detalle || '';
      }
    } catch (e) {
      console.error(`Error parsing steps for ${r.nombre_receta}:`, e);
    }

    return {
      id: r.id,
      name: r.nombre_receta,
      ingredients: ingList,
      lastStep: lastStep,
      category: r.categoria,
      emoji: r.emoji_representativo
    };
  });

  const outputPath = path.join(__dirname, 'recipes_extracted.json');
  fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2));
  console.log(`Saved extracted recipes to ${outputPath}`);
}

extract();
