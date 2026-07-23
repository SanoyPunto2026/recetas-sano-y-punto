const fs = require('fs');
const path = require('path');
const https = require('https');

const rawRecipes = require('./recipes_extracted.json');

// Helper function to translate text using Google Translate
function translateText(text) {
  return new Promise((resolve) => {
    if (!text || text.trim() === '') {
      resolve('');
      return;
    }
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          let translated = '';
          if (parsed && parsed[0]) {
            translated = parsed[0].map(item => item[0]).join('');
          }
          resolve(translated.trim());
        } catch (e) {
          resolve(text); // Fallback to original text on error
        }
      });
    }).on('error', () => {
      resolve(text); // Fallback to original text on error
    });
  });
}

// Map categories to presentation options
function getCategoryPresentation(category) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('airfryer')) {
    return {
      plate: 'rustic ceramic plate',
      table: 'dark wooden table',
      garnish: 'sprig of fresh rosemary'
    };
  } else if (cat.includes('sin-gluten') || cat.includes('singluten')) {
    return {
      plate: 'white handcrafted clay plate',
      table: 'light wooden table',
      garnish: 'fresh cilantro leaves'
    };
  } else if (cat.includes('panaderia') || cat.includes('panadería')) {
    return {
      plate: 'rustic wooden bread board',
      table: 'flour-dusted stone surface',
      garnish: 'dusting of sesame seeds'
    };
  } else if (cat.includes('postre') || cat.includes('repostería') || cat.includes('reposteria')) {
    return {
      plate: 'minimalist ceramic dessert dish',
      table: 'white marble table',
      garnish: 'fresh mint leaf and a dusting of powdered sugar'
    };
  } else if (cat.includes('comida') || cat.includes('rapida') || cat.includes('rápida')) {
    return {
      plate: 'matte black craft plate',
      table: 'industrial metal-accented wooden table',
      garnish: 'sprinkle of toasted sesame seeds'
    };
  } else if (cat.includes('mediterranea') || cat.includes('mediterránea')) {
    return {
      plate: 'terracotta serving bowl',
      table: 'rustic Mediterranean stone table',
      garnish: 'drizzle of extra virgin olive oil and a leaf of fresh basil'
    };
  }
  return {
    plate: 'elegant white porcelain plate',
    table: 'minimalist wooden table',
    garnish: 'fresh microgreens'
  };
}

// Process in batches to avoid rate limits
async function processRecipes() {
  console.log(`Starting prompt generation for ${rawRecipes.length} recipes...`);
  const results = [];
  const batchSize = 10;
  
  for (let i = 0; i < rawRecipes.length; i += batchSize) {
    const batch = rawRecipes.slice(i, i + batchSize);
    console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(rawRecipes.length / batchSize)}...`);
    
    const promises = batch.map(async (recipe) => {
      // 1. Translate Name
      const nameEn = await translateText(recipe.name);
      
      // 2. Translate Ingredients list
      const ingredientsStr = recipe.ingredients.join(', ');
      const ingredientsEn = await translateText(ingredientsStr);
      
      // 3. Translate Last Step (Plating)
      const lastStepEn = await translateText(recipe.lastStep);
      
      // 4. Get category presentation details
      const pres = getCategoryPresentation(recipe.category);
      
      // 5. Construct Midjourney prompt
      const prompt = `A stunning, ultra-realistic professional food photography shot of ${nameEn}, featuring ${ingredientsEn}. Plated beautifully: ${lastStepEn || 'Served hot and fresh'}. Served on an elegant ${pres.plate}, placed on a ${pres.table}. The scene is beautifully lit with natural morning window light, creating soft highlights and deep, appetizing textures. Garnished with ${pres.garnish}. Shot with an 85mm lens, f/1.8 aperture, shallow depth of field, cinematic lighting, food styling, 8k resolution, hyper-detailed, mouth-watering --ar 4:3`;
      
      return {
        id: recipe.id,
        emoji: recipe.emoji || '🍽️',
        nameEs: recipe.name,
        nameEn: nameEn,
        category: recipe.category,
        prompt: prompt
      };
    });
    
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
    
    // Tiny sleep between batches to be nice to Google's translation endpoint
    await new Promise(r => setTimeout(r, 1000));
  }
  
  // Write to Markdown file
  let mdContent = `# Prompts de Imágenes para la Bóveda de Recetas\n\n`;
  mdContent += `Este documento contiene los 139 prompts optimizados para generar las imágenes de cada receta utilizando Inteligencias Artificiales de imágenes (Midjourney, DALL-E 3, etc.).\n\n`;
  mdContent += `## Instrucciones de Uso:\n`;
  mdContent += `1. Genera cada imagen usando el prompt correspondiente.\n`;
  mdContent += `2. Guarda la imagen con el nombre exacto del ID de la receta (ej. \`id-de-la-receta.png\` o \`.jpg\`).\n`;
  mdContent += `3. Mira la sección final de este documento para ver cómo compartirlas conmigo para que las organicemos en la app.\n\n---\n\n`;
  
  // Group by category for better readability
  const categoriesMap = {};
  results.forEach(r => {
    if (!categoriesMap[r.category]) {
      categoriesMap[r.category] = [];
    }
    categoriesMap[r.category].push(r);
  });
  
  for (const [catName, list] of Object.entries(categoriesMap)) {
    mdContent += `## Categoría: ${catName.toUpperCase()}\n\n`;
    list.forEach((item, index) => {
      mdContent += `### ${index + 1}. ${item.emoji} ${item.nameEs}\n`;
      mdContent += `- **ID de la Receta:** \`${item.id}\`\n`;
      mdContent += `- **Nombre en Inglés:** *${item.nameEn}*\n`;
      mdContent += `- **Prompt de Generación (Copiar completo):**\n\`\`\`text\n${item.prompt}\n\`\`\`\n\n`;
    });
    mdContent += `---\n\n`;
  }
  
  mdContent += `## 🚀 Cómo Compartirme las Imágenes y Organizarlas en la App\n\n`;
  mdContent += `Una vez que tengas listas las 139 imágenes, el flujo recomendado para subirlas a la app y asociarlas a cada receta es el siguiente:\n\n`;
  mdContent += `### Paso 1: Nombrar los Archivos Correctamente\n`;
  mdContent += `Asegúrate de que cada archivo de imagen esté nombrado **exactamente con el ID de la receta** correspondiente (el valor que aparece arriba en cada receta). Por ejemplo:\n`;
  mdContent += `- Si el ID es \`7b93db04-98ad-4fb8-bfb9-cf56e6d1b777\`, el archivo debe llamarse \`7b93db04-98ad-4fb8-bfb9-cf56e6d1b777.png\` (o \`.jpg\`).\n\n`;
  mdContent += `### Paso 2: Crear una Carpeta Compartida\n`;
  mdContent += `Sube todas las imágenes a una carpeta en **Google Drive, Dropbox o OneDrive** y compárteme el enlace público aquí en el chat.\n\n`;
  mdContent += `### Paso 3: Mi Automatización\n`;
  mdContent += `Cuando me pases el enlace, yo me encargaré de:\n`;
  mdContent += `1. **Descargar y subir** todas las imágenes al Storage de Supabase en un bucket exclusivo (por ejemplo, \`recetas-imagenes\`).\n`;
  mdContent += `2. **Ejecutar un script de base de datos** para actualizar automáticamente la columna correspondiente en la tabla \`banco_recetas\` asociando el enlace del Storage de cada imagen a su respectivo ID.\n`;
  mdContent += `3. **Actualizar los componentes de la interfaz de la app** (\`Dashboard\` y las páginas de detalle de receta) para mostrar la imagen correspondiente en lugar del emoji representativo.\n`;
  
  const outputPath = path.join(__dirname, 'recetas_prompts.md');
  fs.writeFileSync(outputPath, mdContent, 'utf8');
  console.log(`Successfully generated markdown file at: ${outputPath}`);
}

processRecipes().catch(console.error);
