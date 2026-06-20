"use client";

import { use, useState } from "react";
import Link from "next/link";

const mockRecipes = [
  { 
    id: 1, 
    title: "Pollo Crujiente sin Aceite", 
    time: "20 min", 
    kcal: "350 kcal", 
    image: "🍗", 
    tags: ["Alto en Proteína", "Rápido"],
    ingredients: ["pollo", "pechuga", "aceite", "especias", "brocoli", "arroz"]
  },
  { 
    id: 2, 
    title: "Papas Rústicas Perfectas", 
    time: "15 min", 
    kcal: "220 kcal", 
    image: "🥔", 
    tags: ["Vegano", "Guarnición"],
    ingredients: ["papas", "patatas", "aceite", "romero", "sal", "pimienta"]
  },
  { 
    id: 3, 
    title: "Salmón Teriyaki Express", 
    time: "12 min", 
    kcal: "410 kcal", 
    image: "🐟", 
    tags: ["Omega 3", "Cena Light"],
    ingredients: ["salmon", "salsa de soya", "soja", "miel", "sesamo", "limon"]
  },
  { 
    id: 4, 
    title: "Tacos de Lechuga y Res", 
    time: "10 min", 
    kcal: "280 kcal", 
    image: "🌮", 
    tags: ["Keto", "Rápido"],
    ingredients: ["lechuga", "carne de res", "carne molida", "cebolla", "tomate", "aguacate", "limon"]
  },
];

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const { category } = resolvedParams;

  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const categoryNames: Record<string, string> = {
    "airfryer": "Recetas en Airfryer",
    "comidas-rapidas": "Comidas Rápidas Sanas"
  };

  const title = categoryNames[category] || "Recetas";

  const handleSearch = () => {
    setAppliedSearch(searchInput.toLowerCase().trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setAppliedSearch("");
  };

  // Lógica Funcional del Filtro de Nevera
  const filteredRecipes = mockRecipes.filter((recipe) => {
    if (!appliedSearch) return true;
    
    // Separamos lo que escribe el usuario por comas o espacios
    const keywords = appliedSearch.split(/[\s,]+/).filter(k => k.length > 2);
    
    if (keywords.length === 0) return true;

    // La receta pasa el filtro si AL MENOS UN ingrediente o el título coincide con lo buscado
    return keywords.some(keyword => {
      const matchIngredient = recipe.ingredients.some(ing => ing.includes(keyword));
      const matchTitle = recipe.title.toLowerCase().includes(keyword);
      return matchIngredient || matchTitle;
    });
  });

  const BrandLogo = () => (
    <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
      <circle cx="512" cy="512" r="512" fill="#3F683F"/>
      <g transform="translate(256, 256) scale(21.33)">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 22c0-3 1-5 4-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );

  return (
    <div className="min-h-screen pb-20">
      <header className="glass sticky top-0 z-20 border-b border-white/40 shadow-sm bg-white/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-[var(--color-sage-400)] hover:text-[var(--color-sage-800)] mr-3 sm:mr-4 font-black text-xl sm:text-2xl transition-all hover:-translate-x-1">
              ←
            </Link>
            <div className="flex items-center gap-3">
              <BrandLogo />
              <h1 className="text-lg sm:text-xl font-black text-gradient truncate mt-1">Sano y Punto</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Order Bump 2: Filtro de Nevera Compacto y Funcional */}
        <div className="mb-8 md:mb-10 glass p-4 md:p-8 rounded-3xl md:rounded-[2rem] relative overflow-hidden retro-shadow border border-white">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
            {/* Ícono gigante solo en PC */}
            <div className="hidden md:block text-6xl">❄️</div>
            
            <div className="flex-1 w-full">
              {/* Encabezado compacto */}
              <div className="flex flex-wrap items-center gap-2 mb-1 md:mb-2">
                <span className="md:hidden text-xl">❄️</span>
                <h3 className="text-lg md:text-2xl font-black text-[var(--color-sage-900)]">
                  ¿Qué hay en tu nevera?
                </h3>
                <span className="text-[9px] md:text-xs bg-[var(--color-sand-300)] text-[var(--color-sage-900)] px-2 py-0.5 md:px-3 md:py-1 rounded-full font-bold uppercase tracking-widest whitespace-nowrap">
                  Filtro Inteligente
                </span>
              </div>
              
              {/* Texto explicativo largo solo en PC */}
              <p className="hidden md:block text-[var(--color-sage-800)] font-medium mb-4 opacity-80 text-base">
                Ingresa ingredientes que tengas en casa y encontraremos qué cocinar para no desperdiciar comida.
              </p>
              
              {/* Barra de búsqueda estilo Google (en una sola línea en móviles) */}
              <div className="flex flex-row gap-2 mt-2 md:mt-0 w-full">
                <div className="relative flex-1">
                  <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-lg">🔍</span>
                  <input 
                    type="text" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ej: pollo, tomate..." 
                    className="w-full pl-9 md:pl-12 pr-8 md:pr-10 py-3 sm:py-4 bg-white/90 border border-white rounded-xl md:rounded-2xl focus:ring-4 focus:ring-[var(--color-sage-300)] outline-none text-black shadow-inner font-medium text-sm md:text-lg"
                  />
                  {searchInput && (
                    <button 
                      onClick={clearSearch}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button 
                  onClick={handleSearch}
                  className="px-4 md:px-8 py-3 md:py-4 bg-[var(--color-sage-700)] hover:bg-[var(--color-sage-800)] text-white font-bold rounded-xl md:rounded-2xl transition shadow-md md:shadow-xl active:scale-95 flex-shrink-0 text-sm md:text-base"
                >
                  Buscar
                </button>
              </div>

              {/* Texto explicativo corto debajo de la barra en móviles */}
              <p className="md:hidden text-[var(--color-sage-800)] text-[11px] mt-3 font-medium text-center opacity-80">
                Ingresa tus ingredientes y encontraremos la receta ideal.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-sage-950)] tracking-tight">{title}</h2>
            {appliedSearch ? (
              <p className="font-bold text-[var(--color-sage-700)] mt-2 text-lg">
                Mostrando resultados para: <span className="italic">"{appliedSearch}"</span>
              </p>
            ) : (
              <p className="font-medium opacity-70 mt-2 text-lg">Explora y selecciona qué quieres cocinar hoy.</p>
            )}
          </div>
          
          <div className="flex items-center glass rounded-full px-6 py-3 shadow-lg border border-white transition hover:shadow-xl">
            <span className="text-sm mr-3 font-bold text-[var(--color-sage-900)] uppercase tracking-wider">📍 País:</span>
            <select className="bg-transparent font-black text-sm outline-none text-[var(--color-sage-900)] cursor-pointer">
              <option>🇪🇸 España</option>
              <option>🇲🇽 México</option>
              <option>🇦🇷 Argentina</option>
              <option>🇨🇴 Colombia</option>
            </select>
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredRecipes.map((recipe) => (
              <Link href={`/dashboard/${category}/${recipe.id}`} key={recipe.id} className="group">
                <div className="glass rounded-[2.5rem] overflow-hidden shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                  
                  <div className="h-48 md:h-56 bg-gradient-to-br from-[var(--color-sage-100)] to-[var(--color-sand-100)] flex items-center justify-center text-7xl md:text-8xl relative group-hover:scale-105 transition-transform duration-500">
                    {recipe.image}
                    <div className="absolute top-4 right-4 glass-button px-3 py-1 rounded-xl text-sm font-black text-[var(--color-sage-900)]">
                      ⏱ {recipe.time}
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-grow bg-white/40">
                    <h3 className="text-2xl font-black text-[var(--color-sage-900)] mb-4 leading-tight">{recipe.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {recipe.tags.map((tag, idx) => (
                        <span key={idx} className="bg-white/80 border border-white text-[var(--color-sage-800)] text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/50">
                      <span className="text-sm font-black text-[var(--color-sage-700)] bg-[var(--color-sage-100)] px-3 py-1.5 rounded-xl border border-white">
                        🔥 {recipe.kcal}
                      </span>
                      <button className="text-sm font-black text-white bg-[var(--color-sage-700)] group-hover:bg-[var(--color-sage-800)] px-6 py-3 rounded-xl transition-all shadow-md group-hover:shadow-lg">
                        Cocinar →
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-[2.5rem] border border-white/60">
            <div className="text-7xl mb-4 opacity-50">🛒</div>
            <h3 className="text-2xl font-black text-[var(--color-sage-900)] mb-2">¡Vaya! No encontramos recetas</h3>
            <p className="text-[var(--color-sage-800)] opacity-80">Prueba buscando otros ingredientes (ej. pollo, papas, salmón, lechuga).</p>
            <button 
              onClick={clearSearch}
              className="mt-6 px-6 py-3 bg-[var(--color-sage-200)] hover:bg-[var(--color-sage-300)] text-[var(--color-sage-900)] font-bold rounded-xl transition"
            >
              Ver todas las recetas
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
