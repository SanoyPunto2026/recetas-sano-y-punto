import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Read .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

let url = '';
let key = '';

for (const line of envLines) {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
    url = line.split('=')[1].trim();
  }
  if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
    key = line.split('=')[1].trim();
  }
}

const supabase = createClient(url, key);

const receta = {
  nombre_receta: "Milanesa de Res Saludable Empanizada con Nuez en Airfryer",
  pais: "Mexico",
  tipo_comida: "Plato fuerte",
  tiempo_plato: "Almuerzo",
  categoria: "airfryer",
  porciones: 1,
  calorias_totales: 460,
  proteina_total: 45,
  carbohidratos_totales: 15,
  grasas_totales: 22,
  fibra_total: 5,
  tiempo_total_preparacion: 20,
  dificultad: "Medio",
  utensilios_necesarios: "Airfryer, mazo para carne o rodillo, dos platos hondos, pinzas",
  emoji_representativo: "🥩",
  ingredientes: [
    { cantidad: "150", unidad: "g", ingrediente: "Filete de res magro para milanesa (muy fino)", sustituto: "Pechuga de pollo fileteada" },
    { cantidad: "1", unidad: "Unidad", ingrediente: "Huevo", sustituto: "Claras de huevo líquidas" },
    { cantidad: "2", unidad: "Cucharadas", ingrediente: "Nuez pecana o almendra finamente molida", sustituto: "Harina de avena" },
    { cantidad: "2", unidad: "Cucharadas", ingrediente: "Pan rallado integral o panko", sustituto: "Cereal de maíz sin azúcar triturado" },
    { cantidad: "1", unidad: "Cucharadita", ingrediente: "Aceite de aguacate en spray", sustituto: "Aceite de oliva" },
    { cantidad: "1", unidad: "Pizca", ingrediente: "Ajo en polvo, orégano seco", sustituto: "Pimienta y comino" },
    { cantidad: "1", unidad: "Pizca", ingrediente: "Sal de mar y pimienta negra", sustituto: "Sal refinada" }
  ],
  pasos: [
    { paso_numero: 1, titulo_paso: "Espalmar la carne", tiempo_estimado: 2, ingredientes_usados: "Filete de res", detalle: "Golpea el filete de carne con el mazo o un rodillo pesado entre dos plásticos para que quede súper delgado (esto es clave para que no quede duro en la Airfryer)." },
    { paso_numero: 2, titulo_paso: "Sazonado de la carne", tiempo_estimado: 1, ingredientes_usados: "Carne, Sal, Pimienta, Ajo en polvo", detalle: "Sazona el filete por ambos lados con sal, pimienta y un poco de ajo en polvo." },
    { paso_numero: 3, titulo_paso: "Preparar las estaciones", tiempo_estimado: 2, ingredientes_usados: "Huevo, Nuez molida, Pan rallado, Orégano", detalle: "En un plato hondo bate el huevo. En otro plato, mezcla la nuez molida, el pan rallado integral y una pizca de orégano." },
    { paso_numero: 4, titulo_paso: "Baño líquido", tiempo_estimado: 1, ingredientes_usados: "Carne, Huevo batido", detalle: "Pasa el filete de carne por el huevo batido, escurriendo muy bien el exceso para que no haga costras gruesas." },
    { paso_numero: 5, titulo_paso: "El empanizado", tiempo_estimado: 2, ingredientes_usados: "Carne mojada, Mezcla seca", detalle: "Pasa la carne por la mezcla de nuez y pan rallado. Presiona fuertemente con las manos por ambos lados para que el empanizado se adhiera bien." },
    { paso_numero: 6, titulo_paso: "Precalentamiento y barnizado", tiempo_estimado: 3, ingredientes_usados: "Aceite en spray", detalle: "Precalienta la Airfryer a 200°C. Mientras, rocía ligeramente ambos lados de la milanesa con el aceite en spray." },
    { paso_numero: 7, titulo_paso: "Horneado exprés", tiempo_estimado: 8, ingredientes_usados: "Milanesa empanizada", detalle: "Mete la milanesa en la Airfryer a 200°C por solo 8-10 minutos (si es muy delgada). A la mitad del tiempo, dale la vuelta para que se dore parejo." },
    { paso_numero: 8, titulo_paso: "Servir crujiente", tiempo_estimado: 1, ingredientes_usados: "Ninguno", detalle: "Sácala dorada y crujiente. Tradicionalmente en México se acompaña con una buena ensalada fresca, aguacate y unas gotitas de limón." }
  ]
};

async function insertData() {
  const { data, error } = await supabase
    .from('banco_recetas')
    .insert([receta])
    .select();

  if (error) {
    console.error('Error insertando la receta:', error);
  } else {
    console.log('Receta insertada con exito:', data[0].id);
  }
}

insertData();
