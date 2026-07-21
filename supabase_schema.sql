-- Ejecuta este script en el SQL Editor de Supabase para crear tu Banco de Recetas en UNA SOLA TABLA

CREATE TABLE IF NOT EXISTS banco_recetas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre_receta TEXT NOT NULL,
    pais TEXT,
    tipo_comida TEXT,
    tiempo_plato TEXT,
    categoria TEXT NOT NULL, -- ej: 'airfryer', 'sin-gluten'
    
    -- Información Nutricional (Por porción)
    porciones INTEGER NOT NULL DEFAULT 1,
    calorias_totales INTEGER,
    proteina_total INTEGER,
    carbohidratos_totales INTEGER,
    grasas_totales INTEGER,
    fibra_total INTEGER,
    
    -- Tiempos y Dificultad
    tiempo_total_preparacion INTEGER, -- En minutos
    dificultad TEXT, -- ej: 'Fácil', 'Media', 'Difícil'
    
    -- Utensilios (Texto libre o lista separada por comas)
    utensilios_necesarios TEXT,

    -- Extras para la App
    emoji_representativo TEXT,
    
    -- Arrays en formato JSON para guardar todos los ingredientes y pasos sin necesitar más tablas
    ingredientes JSONB DEFAULT '[]'::jsonb,
    pasos JSONB DEFAULT '[]'::jsonb,

    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de Seguridad (RLS) para permitir lectura pública
ALTER TABLE banco_recetas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura publica para banco_recetas" ON banco_recetas FOR SELECT USING (true);

-- Tabla para guardar configuraciones de la app, como la contraseña maestra
CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar la contraseña maestra por defecto (SOLO SE PUEDE CAMBIAR DESDE AQUÍ O EL PANEL DE SUPABASE)
INSERT INTO app_settings (key, value) VALUES ('master_password', 'S&77a.') ON CONFLICT (key) DO NOTHING;

-- Habilitar RLS pero NO agregar política de lectura pública.
-- Solo el backend con el Service Role Key podrá leer la contraseña maestra.
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
