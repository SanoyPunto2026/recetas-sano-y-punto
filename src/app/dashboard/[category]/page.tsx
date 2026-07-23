"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DashboardHeader from "../_components/DashboardHeader";

export default function CategoryVault({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const { category } = resolvedParams;

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [filterPais, setFilterPais] = useState<string>("Todos");
  const [filterTiempo, setFilterTiempo] = useState<string>("Todos");
  const [filterDificultad, setFilterDificultad] = useState<string>("Todos");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const categoryNames: Record<string, string> = {
    "airfryer": "Recetas en Airfryer",
    "sin-gluten": "Sin Gluten",
    "panaderia": "Panadería Sin Gluten",
    "postres": "Postres y Repostería",
    "comidas-rapidas": "Comidas Rápidas (Sanas)",
    "mediterranea": "Mediterránea"
  };

  const title = categoryNames[category] || "Recetas";

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      const { data, error } = await supabase
        .from("banco_recetas")
        .select("*")
        .eq("categoria", category);
      
      if (!error && data) {
        setRecipes(data);
      } else {
        console.error("Error al obtener recetas:", error);
      }
      setLoading(false);
    }
    fetchRecipes();
  }, [category]);

  const normalize = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

  const filteredRecipes = recipes.filter(recipe => {
    const matchPais = filterPais === "Todos" || (recipe.pais && normalize(recipe.pais).includes(normalize(filterPais)));
    
    // Check possible column names for meal time
    const recipeTiempo = recipe.tipo_plato || recipe.tiempo_plato || recipe.tipo_comida || recipe.tiempo_del_plato;
    const matchTiempo = filterTiempo === "Todos" || (recipeTiempo && normalize(recipeTiempo).includes(normalize(filterTiempo)));
    
    const matchDificultad = filterDificultad === "Todos" || (recipe.dificultad && normalize(recipe.dificultad).includes(normalize(filterDificultad)));
    
    return matchPais && matchTiempo && matchDificultad;
  });

  const FilterPill = ({ label, options, current, onChange }: any) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <span className="text-[10px] sm:text-xs font-bold text-[var(--color-sage-500)] uppercase tracking-wider w-20 flex-shrink-0">{label}:</span>
      <div className="flex gap-2 flex-wrap pb-2 sm:pb-0">
        {["Todos", ...options].map(opt => (
          <button 
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all border shadow-sm ${
              current === opt 
                ? "bg-[var(--color-sage-700)] text-white border-[var(--color-sage-700)]" 
                : "bg-white/80 text-[var(--color-sage-700)] border-[var(--color-sage-200)] hover:bg-[var(--color-sage-100)]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 relative bg-[#FDFCF7]">
      {/* Elementos decorativos orgánicos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#c7d9c7] to-[#9ebf9e] rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-tl from-[#dfccb3] to-[#ceaf8e] rounded-full blur-[140px] mix-blend-multiply" />
      </div>

      <DashboardHeader backUrl="/dashboard" />
      <main className="max-w-5xl mx-auto px-4 relative z-10 py-8 md:py-12">
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
            <div className="flex justify-between items-end w-full lg:w-auto">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-[var(--color-sage-950)] uppercase tracking-tight">{title}</h2>
                <div className="h-1 w-20 bg-[var(--color-sage-500)] mt-4"></div>
              </div>
              
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden relative glass-button p-3 rounded-2xl font-bold text-[var(--color-sage-800)] flex items-center justify-center shadow-sm border border-white hover:-translate-y-1 transition-transform"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z" />
                </svg>
                {filterPais !== "Todos" || filterTiempo !== "Todos" || filterDificultad !== "Todos" ? (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-sage-600)] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-md">✓</span>
                ) : null}
              </button>
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="hidden lg:flex glass-button px-5 py-3 rounded-2xl font-bold text-[var(--color-sage-800)] items-center gap-2 shadow-sm border border-white hover:-translate-y-1 transition-transform"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z" />
              </svg>
              <span>Filtrar Recetas</span>
              {filterPais !== "Todos" || filterTiempo !== "Todos" || filterDificultad !== "Todos" ? (
                <span className="bg-[var(--color-sage-600)] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-md">✓</span>
              ) : null}
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="bg-white/60 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white shadow-sm mb-10 transition-all duration-300 origin-top">
            <div className="flex flex-col gap-4">
              <FilterPill label="País" options={["España", "México"]} current={filterPais} onChange={setFilterPais} />
              <FilterPill label="Tiempo" options={["Almuerzo", "Desayuno", "Cena"]} current={filterTiempo} onChange={setFilterTiempo} />
              <FilterPill label="Dificultad" options={["Fácil", "Medio", "Difícil"]} current={filterDificultad} onChange={setFilterDificultad} />
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="relative w-24 h-24 animate-[spin_4s_linear_infinite]">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl">🥑</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl">🥕</span>
              <span className="absolute top-1/2 left-0 -translate-y-1/2 text-3xl">🥦</span>
              <span className="absolute top-1/2 right-0 -translate-y-1/2 text-3xl">🍅</span>
            </div>
            <div className="animate-pulse flex flex-col items-center gap-1">
              <h2 className="text-[var(--color-sage-700)] text-xl font-black">Cargando recetas sanas...</h2>
              <p className="text-[var(--color-sage-500)] text-sm font-bold">Preparando el menú para ti</p>
            </div>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="bg-white/40 border-2 border-dashed border-[var(--color-sage-300)] rounded-3xl p-10 text-center shadow-sm">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="text-xl font-black text-[var(--color-sage-800)] mb-2">Sin resultados</h3>
            <p className="text-[var(--color-sage-600)]">No encontramos recetas con estos filtros en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {filteredRecipes.map((recipe) => (
              <Link href={`/dashboard/${category}/${recipe.id}`} key={recipe.id}>
                <div className="glass bg-white/60 rounded-3xl p-6 py-8 md:p-8 flex gap-5 md:gap-6 items-center group cursor-pointer border border-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-[var(--color-sage-100)] flex-shrink-0 border border-white flex items-center justify-center text-5xl md:text-6xl shadow-sm group-hover:bg-[var(--color-sage-200)] transition-colors">
                    {recipe.emoji_representativo || "🍽️"}
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-tight text-[var(--color-sage-900)] mb-3 group-hover:text-[var(--color-sage-600)] transition-colors">{recipe.nombre_receta}</h3>
                    <div className="flex gap-2">
                      <span className="bg-white/50 text-[var(--color-sage-800)] text-[10px] md:text-xs px-2.5 py-1 rounded-md border border-[var(--color-sage-200)] font-bold">⏱ {recipe.tiempo_total_preparacion || 0} min</span>
                      <span className="bg-[var(--color-sand-100)] text-[var(--color-sand-800)] text-[10px] md:text-xs px-2.5 py-1 rounded-md border border-[var(--color-sand-200)] font-bold">🔥 {recipe.calorias_totales || 0} kcal</span>
                    </div>
                  </div>
                  <div className="text-[var(--color-sage-400)] group-hover:text-[var(--color-sage-600)] transition-colors text-2xl pr-2 font-black">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
