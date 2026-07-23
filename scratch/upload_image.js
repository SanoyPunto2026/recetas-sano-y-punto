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
  console.error("Missing Supabase credentials.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function upload() {
  const recipeId = 'b5f222bb-ab68-4542-aa9c-655ae4078cd2';
  const filePath = path.join(__dirname, 'b5f222bb-ab68-4542-aa9c-655ae4078cd2.jpg');
  
  if (!fs.existsSync(filePath)) {
    console.error(`Downloaded image not found at: ${filePath}`);
    process.exit(1);
  }
  
  console.log("Checking / creating bucket 'recetas-imagenes'...");
  
  // Try to create the bucket (it will fail/no-op if it already exists, which is fine)
  const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('recetas-imagenes', {
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png'],
    fileSizeLimit: 5242880 // 5MB
  });
  
  if (bucketError && bucketError.message !== 'Bucket already exists') {
    console.warn("Could not create bucket (it might already exist):", bucketError.message);
  } else {
    console.log("Bucket ready.");
  }
  
  console.log(`Uploading ${filePath} to Supabase Storage...`);
  const fileBody = fs.readFileSync(filePath);
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('recetas-imagenes')
    .upload(`${recipeId}.jpg`, fileBody, {
      contentType: 'image/jpeg',
      upsert: true
    });
    
  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    process.exit(1);
  }
  
  console.log("File uploaded successfully:", uploadData);
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('recetas-imagenes')
    .getPublicUrl(`${recipeId}.jpg`);
    
  const publicUrl = urlData.publicUrl;
  console.log("Public URL:", publicUrl);
  
  console.log(`Updating database for recipe ${recipeId}...`);
  const { data: dbData, error: dbError } = await supabase
    .from('banco_recetas')
    .update({ imagen_url: publicUrl })
    .eq('id', recipeId)
    .select();
    
  if (dbError) {
    console.error("Error updating database:", dbError);
    process.exit(1);
  }
  
  console.log("Database updated successfully!", dbData);
}

upload().catch(console.error);
