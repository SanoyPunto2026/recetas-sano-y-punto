"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { supabase } from "@/lib/supabase";
import DashboardHeader from "../../_components/DashboardHeader";
import FlashcardModal from "@/components/FlashcardModal";
import { AnimatePresence } from "framer-motion";

export default function RecipeDetail({ params }: { params: Promise<{ category: string, recipeId: string }> }) {
  const resolvedParams = use(params);
  const { category, recipeId } = resolvedParams;
  
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [portions, setPortions] = useState(1);
  const [addedToList, setAddedToList] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isStepsModalOpen, setIsStepsModalOpen] = useState(false);

  // Ingredientes gestionados con estado para manejar la sustitución visualmente
  const [ingredientsState, setIngredientsState] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      const { data, error } = await supabase
        .from("banco_recetas")
        .select("*")
        .eq("id", recipeId)
        .single();
      
      if (!error && data) {
        setRecipe(data);
        setPortions(data.porciones || 1);
        
        // Inicializar los ingredientes con la propiedad 'isSubstituted'
        if (data.ingredientes) {
          const parsed = Array.isArray(data.ingredientes) ? data.ingredientes : JSON.parse(data.ingredientes);
          setIngredientsState(parsed.map((ing: any) => ({ ...ing, isSubstituted: false })));
        }
      } else {
        console.error("Error al obtener la receta:", error);
      }
      setLoading(false);
    }
    
    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  const handlePortionChange = (change: number) => {
    if (portions + change > 0) setPortions(portions + change);
  };

  const handleSubstitute = (index: number) => {
    setIngredientsState(prev => prev.map((ing, i) => {
      if (i === index && ing.sustituto) {
        return { ...ing, isSubstituted: !ing.isSubstituted };
      }
      return ing;
    }));
  };

  const replaceSubstitutedIngredients = (text: string, ingredients: any[]) => {
    let newText = text;
    if (!newText) return newText;
    ingredients.forEach(ing => {
      if (ing.isSubstituted && ing.sustituto && ing.ingrediente) {
        // Use a case-insensitive regex to replace the original ingredient
        const regex = new RegExp(ing.ingrediente, 'gi');
        newText = newText.replace(regex, ing.sustituto);
      }
    });
    return newText;
  };

  // Función para generar el PDF (ahora dinámico con datos de Supabase)
  const getPDFHTML = (type: 'recipe' | 'list') => {
    if (!recipe) return '';

    const listItems = ingredientsState.map(ing => {
      // Calcular cantidad basada en la proporción original
      const multiplier = portions / (recipe.porciones || 1);
      const amount = (parseFloat(ing.cantidad) * multiplier).toFixed(1).replace(/\.0$/, '');
      const displayName = ing.isSubstituted ? ing.sustituto : ing.ingrediente;
      
      return `
        <div style="padding: 12px 16px; border-bottom: 1px solid #e3ebe3; background: #fbfaf8; margin-bottom: 8px; border-radius: 8px; display: flex; align-items: center; font-size: 16px;">
          ${type === 'list' ? `<div style="width: 20px; height: 20px; border: 2px solid #9ebf9e; border-radius: 4px; margin-right: 15px; flex-shrink: 0;"></div>` : ''}
          <span style="font-weight: 900; color: #518451; width: 140px; flex-shrink: 0; margin-right: 15px; word-wrap: break-word;">${amount} ${ing.unidad}</span>
          <span style="line-height: 1.4;">${displayName}</span>
        </div>
      `;
    }).join('');

    let recipeSteps = '';
    if (type === 'recipe') {
      const pasosArray = Array.isArray(recipe.pasos) ? recipe.pasos : (typeof recipe.pasos === 'string' ? JSON.parse(recipe.pasos) : []);
      const pasosModificados = pasosArray.map((paso: any) => ({
        ...paso,
        titulo_paso: replaceSubstitutedIngredients(paso.titulo_paso || '', ingredientsState),
        detalle: replaceSubstitutedIngredients(paso.detalle || '', ingredientsState)
      }));
      
      const nutritionAndUtensils = `
        <div style="display: flex; gap: 20px; margin-bottom: 40px; text-align: left;">
          <div style="flex: 1; background: #fbfaf8; padding: 20px; border-radius: 12px; border: 1px solid #e3ebe3;">
            <h3 style="color: #345334; font-size: 16px; font-weight: 900; margin-top: 0; margin-bottom: 15px; text-transform: uppercase;">(Por Porción)</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #518451; font-weight: bold;">Proteína:</span>
              <span style="font-weight: 900;">${recipe.proteina_total || 0}g</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #518451; font-weight: bold;">Carbs:</span>
              <span style="font-weight: 900;">${recipe.carbohidratos_totales || 0}g</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #518451; font-weight: bold;">Grasas:</span>
              <span style="font-weight: 900;">${recipe.grasas_totales || 0}g</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #518451; font-weight: bold;">Fibra:</span>
              <span style="font-weight: 900;">${recipe.fibra_total || 0}g</span>
            </div>
          </div>
          ${recipe.utensilios_necesarios ? `
          <div style="flex: 2; background: #f4f7f4; padding: 20px; border-radius: 12px; border: 1px solid #dce8dc;">
            <h3 style="color: #345334; font-size: 16px; font-weight: 900; margin-top: 0; margin-bottom: 15px; text-transform: uppercase;">Utensilios Necesarios</h3>
            <p style="color: #253725; margin: 0; font-size: 15px; line-height: 1.5;">
              ${recipe.utensilios_necesarios}
            </p>
          </div>
          ` : ''}
        </div>
      `;

      recipeSteps = `
        ${nutritionAndUtensils}
        <div style="margin-bottom: 40px;">
          <h2 style="color: #345334; font-size: 22px; font-weight: 900; text-transform: uppercase; margin-bottom: 20px;">Paso a Paso</h2>
          ${pasosModificados.map((paso: any, idx: number) => `
            <div style="margin-bottom: 20px; display: flex; align-items: flex-start;">
              <div style="font-weight: 900; color: white; background: #518451; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin-right: 15px; flex-shrink: 0; text-align: center; line-height: 30px;">${idx + 1}</div>
              <div style="font-size: 16px; margin-top: 4px;">
                <strong style="color: #345334;">${paso.titulo_paso} (${paso.tiempo_estimado} min):</strong> 
                ${paso.detalle}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    return `
      <div style="font-family: sans-serif; color: #121e12; padding: 40px; background: white;">
        <div style="text-align: center; border-bottom: 3px solid #e3ebe3; padding-bottom: 20px; margin-bottom: 40px;">
          <div style="font-size: 28px; font-weight: 900; color: #518451; letter-spacing: -0.5px;">SANO Y PUNTO</div>
          <h1 style="font-size: 32px; font-weight: 900; color: #253725; margin: 10px 0;">
            ${type === 'recipe' ? recipe.nombre_receta : 'Mi Lista de Compra'}
          </h1>
          <div style="color: #518451; font-weight: bold; font-size: 16px; background: #f4f7f4; display: inline-block; padding: 8px 16px; border-radius: 8px;">
            ${type === 'recipe' 
              ? `⏱ ${recipe.tiempo_total_preparacion || 0} min | 🔥 ${recipe.calorias_totales || 0} kcal | 👨‍👩‍👧‍👦 ${portions} porciones` 
              : `🛒 Lista calculada para ${portions} porciones`}
          </div>
        </div>
        
        <div style="margin-bottom: 40px;">
          <h2 style="color: #345334; font-size: 22px; font-weight: 900; text-transform: uppercase; margin-bottom: 20px;">
            ${type === 'recipe' ? 'Ingredientes' : 'Para comprar en el supermercado'}
          </h2>
          ${listItems}
        </div>
        
        ${recipeSteps}
        
        <div style="margin-top: 60px; text-align: center; color: #74a074; font-size: 14px; border-top: 1px solid #e3ebe3; padding-top: 30px;">
          <strong>Sano y Punto © 2026</strong><br/>
          sanoypunto.app
        </div>
      </div>
    `;
  };

  const handleDownload = async (type: 'recipe' | 'list') => {
    setIsDownloading(true);
    const htmlContent = getPDFHTML(type);
    const opt: any = {
      margin:       [10, 10, 10, 10],
      filename:     type === 'recipe' ? `Receta_${recipe?.nombre_receta?.replace(/\s+/g, '_')}.pdf` : 'Lista_de_Compra_SanoYPunto.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set(opt).from(htmlContent).save();
    } catch (err: any) {
      console.error("Error generating PDF", err);
      alert("Hubo un error al generar el PDF.");
    }
    setIsDownloading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-sand-50)] flex flex-col items-center justify-center">
        <div className="relative w-28 h-28 animate-[spin_4s_linear_infinite] mb-8">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl">🥑</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl">🥕</span>
          <span className="absolute top-1/2 left-0 -translate-y-1/2 text-4xl">🥦</span>
          <span className="absolute top-1/2 right-0 -translate-y-1/2 text-4xl">🍅</span>
        </div>
        <div className="animate-pulse flex flex-col items-center gap-2">
          <h2 className="text-[var(--color-sage-700)] text-2xl font-black">Preparando tu receta...</h2>
          <p className="text-[var(--color-sage-500)] text-base font-bold text-center">Encendiendo fogones y picando verduras 🔪</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[var(--color-sand-50)] flex flex-col items-center justify-center p-4">
        <span className="text-4xl mb-4">🤷‍♂️</span>
        <h2 className="text-[var(--color-sage-800)] text-2xl font-black text-center">No encontramos esta receta</h2>
        <Link href={`/dashboard/${category}`} className="mt-6 text-white bg-[var(--color-sage-600)] px-6 py-2 rounded-full font-bold">Volver al Recetario</Link>
      </div>
    );
  }

  const pasos = Array.isArray(recipe.pasos) ? recipe.pasos : (recipe.pasos ? JSON.parse(recipe.pasos) : []);

  const UtensilIcon = ({ name, className = "" }: { name: string, className?: string }) => {
    const n = name.toLowerCase();
    
    // Default Cutlery
    let svgPath = <path d="M8 2a1 1 0 0 0-1 1v6a3 3 0 0 0 1.5 2.6V21a1 1 0 0 0 2 0v-9.4A3 3 0 0 0 12 9V3a1 1 0 0 0-1-1H8zm12 1a2 2 0 0 0-4 0v10a1 1 0 0 0 1 1h1v7a1 1 0 0 0 2 0v-7h1a1 1 0 0 0 1-1V3z" />;
    
    if (n.includes('airfryer') || n.includes('freidora')) {
      svgPath = (
        <>
          <rect x="5" y="4" width="14" height="16" rx="3" />
          <path d="M7 13h10v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-5z" fill="#ffffff" opacity="0.4" />
          <rect x="9" y="14" width="6" height="2" rx="1" fill="#ffffff" />
          <path d="M9 2h6v2H9z" />
        </>
      );
    } else if (n.includes('tabla')) {
      svgPath = <path d="M7 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V11a3 3 0 0 0-3-3h-1V5a3 3 0 0 0-3-3H7zm6 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />;
    } else if (n.includes('cuchillo')) {
      svgPath = <path d="M22 2.5a1.5 1.5 0 0 0-2.5-1l-6.7 6.7a4.5 4.5 0 0 0-1.8 4L11 14l-6.5 6.5a2.12 2.12 0 0 0 3 3L14 17l1.8-1.8c1.3.4 2.8.2 4-1l4.2-10a1.5 1.5 0 0 0-2-2.7z" />;
    } else if (n.includes('sartén') || n.includes('sarten')) {
      svgPath = (
        <>
          <path d="M21 3a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1z" />
          <path d="M2 13a8 8 0 0 0 16 0V9H2v4zm7 2h2v4H9v-4z" />
        </>
      );
    } else if (n.includes('olla')) {
      svgPath = (
        <>
          <path d="M3 10v6a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-6H3zm15 3h2v2h-2v-2zM4 13h2v2H4v-2z" />
          <path d="M3 6h18v3H3z" />
          <path d="M9 3h6v2H9z" />
        </>
      );
    } else if (n.includes('bol') || n.includes('bowl') || n.includes('tazón') || n.includes('tazon')) {
      svgPath = (
        <>
          <path d="M2 12a10 10 0 0 0 20 0v-1H2v1z" />
          <path d="M22 9v1H2V9c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2z" opacity="0.6" />
        </>
      );
    } else if (n.includes('brocha') || n.includes('pincel')) {
      svgPath = (
        <>
          <path d="M7 2h10v6H7V2z" opacity="0.4" />
          <path d="M6 8h12v4a2 2 0 0 1-2 2h-1v7a1 1 0 0 1-2 0v-7H9v7a1 1 0 0 1-2 0v-7H6V8z" />
        </>
      );
    } else if (n.includes('cuchar')) { // matches cuchara, cucharita, cucharón
      svgPath = <path d="M12 2C8 2 5 5.58 5 10c0 3.3 2.1 6.1 5 7.4V21a1 1 0 0 0 2 0v-3.6c2.9-1.3 5-4.1 5-7.4 0-4.42-3-8-5-8z" />;
    } else if (n.includes('tenedor')) {
      svgPath = <path d="M5 2a1 1 0 0 0-1 1v6a4 4 0 0 0 3 3.8V21a1 1 0 0 0 2 0v-8.2c1.7-.5 3-2 3-3.8V3a1 1 0 0 0-2 0v5a2 2 0 0 1-4 0V3a1 1 0 0 0-1-1z" />;
    } else if (n.includes('espátula') || n.includes('espatula')) {
      svgPath = <path d="M7 2h10v8a3 3 0 0 1-3 3h-1v9a1 1 0 0 1-2 0v-9H9a3 3 0 0 1-3-3V2zm3 2v4h4V4h-4z" opacity="0.8" />;
    } else if (n.includes('papel')) {
      svgPath = (
        <>
          <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" opacity="0.4" />
          <path d="M9 4v16M15 4v16" stroke="currentColor" strokeWidth="2" />
        </>
      );
    } else if (n.includes('rallador')) {
      svgPath = (
        <>
          <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" opacity="0.4" />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" />
          <circle cx="12" cy="13" r="1.5" fill="currentColor" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        </>
      );
    } else if (n.includes('licuadora') || n.includes('batidora')) {
      svgPath = (
        <>
          <path d="M7 2h10v14H7z" opacity="0.4" />
          <path d="M8 16l-1 5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l-1-5H8z" />
        </>
      );
    } else if (n.includes('taza') || n.includes('vaso') || n.includes('copa')) {
      svgPath = (
        <>
          <path d="M5 2h10a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V4a2 2 0 0 1 2-2z" opacity="0.5" />
          <path d="M17 5h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2" fill="none" stroke="currentColor" strokeWidth="2" />
        </>
      );
    } else if (n.includes('horno')) {
      svgPath = (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <rect x="6" y="8" width="12" height="8" rx="1" fill="#fff" opacity="0.4" />
          <circle cx="7" cy="5" r="1.5" fill="#fff" />
          <circle cx="11" cy="5" r="1.5" fill="#fff" />
        </>
      );
    }

    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        {svgPath}
      </svg>
    );
  };

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="beforeInteractive" />

      <div className="min-h-screen pb-24 relative bg-[#FDFCF7] overflow-x-hidden">
        {/* Elementos decorativos orgánicos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#c7d9c7] to-[#9ebf9e] rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-tl from-[#dfccb3] to-[#ceaf8e] rounded-full blur-[140px] mix-blend-multiply" />
        </div>

        <DashboardHeader backUrl={`/dashboard/${category}`} />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 sm:py-10">
          <div className="mb-6 lg:mb-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-sage-950)] mt-2 uppercase tracking-tight">{recipe.nombre_receta}</h1>
            <div className="h-1 w-20 bg-[var(--color-sage-500)] mt-4 mx-auto sm:mx-0"></div>
          </div>
          
          <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[var(--color-sage-200)] to-[var(--color-sand-200)] rounded-3xl sm:rounded-[2.5rem] flex items-center justify-center text-8xl sm:text-9xl relative overflow-hidden shadow-md mb-8">
            {recipe.imagen_url ? (
              <img src={recipe.imagen_url} alt={recipe.nombre_receta} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="relative z-10 hover:scale-110 transition-transform duration-500 cursor-default drop-shadow-xl">{recipe.emoji_representativo || "🍲"}</span>
            )}
            
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex gap-2 sm:gap-3 z-10 flex-wrap">
              <span className="glass-button px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-[var(--color-sage-900)] shadow-lg">⏱ {recipe.tiempo_total_preparacion || 0} min</span>
              <span className="bg-[var(--color-sage-700)] px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-xl">🔥 {recipe.calorias_totales || 0} kcal</span>
              <button 
                onClick={() => setIsStepsModalOpen(true)} 
                className="bg-white text-[var(--color-sage-900)] px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black shadow-xl hover:scale-105 active:scale-95 transition flex items-center justify-center border border-[var(--color-sage-100)]"
              >
                Ver preparación
              </button>
              <span className="glass-button px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-[var(--color-sage-900)] shadow-lg hidden sm:inline-block">📊 {recipe.dificultad || 'Fácil'}</span>
            </div>
          </div>

          <div className="glass rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 relative z-10 shadow-lg border border-white/60">
            
            <div className="mb-10 flex justify-center sm:justify-end">
              <button 
                onClick={() => handleDownload('recipe')} 
                disabled={isDownloading} 
                className="w-full sm:w-auto text-sm md:text-base bg-[var(--color-sage-700)] hover:bg-[var(--color-sage-800)] text-white px-6 py-3 rounded-2xl hover:-translate-y-1 transition font-bold flex justify-center items-center shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
              >
                <span>{isDownloading ? 'Generando PDF...' : 'Descargar Receta en PDF'}</span>
              </button>
            </div>

            {/* Información Nutricional */}
            <div className="mb-10 p-4 sm:p-6 bg-white/60 rounded-3xl border border-white shadow-sm">
              <div className="mb-3 flex flex-wrap gap-2 justify-between items-center">
                <span className="text-[10px] sm:text-xs font-bold text-[var(--color-sage-500)] uppercase tracking-widest">(Por porción)</span>
                {recipe.tiempo_plato && (
                  <span className="text-[10px] sm:text-xs font-bold text-[var(--color-sage-700)] bg-[var(--color-sage-100)] px-2 py-1 rounded-md border border-[var(--color-sage-200)] tracking-wide">
                    Plato recomendado para {recipe.tiempo_plato.toLowerCase()}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 overflow-x-auto pb-2">
                <div className="bg-[var(--color-sand-50)] p-2 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border border-[var(--color-sand-200)] text-center">
                  <span className="text-[8px] sm:text-[10px] font-bold text-[var(--color-sage-500)] uppercase tracking-wider mb-1">Proteína</span>
                  <span className="text-sm sm:text-xl font-black text-[var(--color-sage-800)]">{recipe.proteina_total || 0}g</span>
                </div>
                <div className="bg-[var(--color-sand-50)] p-2 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border border-[var(--color-sand-200)] text-center">
                  <span className="text-[8px] sm:text-[10px] font-bold text-[var(--color-sage-500)] uppercase tracking-wider mb-1">Carbs</span>
                  <span className="text-sm sm:text-xl font-black text-[var(--color-sage-800)]">{recipe.carbohidratos_totales || 0}g</span>
                </div>
                <div className="bg-[var(--color-sand-50)] p-2 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border border-[var(--color-sand-200)] text-center">
                  <span className="text-[8px] sm:text-[10px] font-bold text-[var(--color-sage-500)] uppercase tracking-wider mb-1">Grasas</span>
                  <span className="text-sm sm:text-xl font-black text-[var(--color-sage-800)]">{recipe.grasas_totales || 0}g</span>
                </div>
                <div className="bg-[var(--color-sand-50)] p-2 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border border-[var(--color-sand-200)] text-center">
                  <span className="text-[8px] sm:text-[10px] font-bold text-[var(--color-sage-500)] uppercase tracking-wider mb-1">Fibra</span>
                  <span className="text-sm sm:text-xl font-black text-[var(--color-sage-800)]">{recipe.fibra_total || 0}g</span>
                </div>
              </div>
            </div>

            {/* Utensilios */}
            {recipe.utensilios_necesarios && (
              <div className="mb-2">
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-sage-900)] mb-6">
                  Utensilios Necesarios
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                  {recipe.utensilios_necesarios.split(',').map((utensil: string, idx: number) => {
                    const cleanName = utensil.trim();
                    if (!cleanName) return null;
                    return (
                      <div key={idx} className="snap-start flex-shrink-0 bg-white/70 p-4 sm:p-5 rounded-[2rem] border border-white shadow-sm flex flex-col items-center justify-center gap-3 w-32 sm:w-36 text-center hover:bg-white transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 mb-1 text-[var(--color-sage-700)] group-hover:text-[var(--color-sage-900)] group-hover:scale-110 transition-all">
                          <UtensilIcon name={cleanName} className="w-full h-full drop-shadow-sm" />
                        </div>
                        <span className="text-sm font-bold text-[var(--color-sage-800)] leading-snug">
                          {cleanName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="mb-8 border-b border-white/40"></div>

            <div className="mb-12">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-sage-900)]">Porciones de ingredientes</h3>
                
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="flex items-center glass rounded-2xl p-1 border border-white/60 shadow-inner w-full sm:w-auto justify-between sm:justify-start">
                    <button onClick={() => handlePortionChange(-1)} className="w-10 h-10 sm:h-11 flex items-center justify-center text-[var(--color-sage-700)] hover:bg-white rounded-xl text-xl font-black transition">-</button>
                    <div className="w-8 sm:w-12 text-center font-black text-lg text-[var(--color-sage-900)]">{portions}</div>
                    <button onClick={() => handlePortionChange(1)} className="w-10 h-10 sm:h-11 flex items-center justify-center text-[var(--color-sage-700)] hover:bg-white rounded-xl text-xl font-black transition">+</button>
                  </div>

                  {!addedToList ? (
                    <button 
                      onClick={() => setAddedToList(true)}
                      className="w-full sm:w-auto text-xs sm:text-sm font-black text-[var(--color-sage-900)] glass-button px-2 sm:px-5 py-3 rounded-2xl hover:-translate-y-1 transition shadow-sm border border-white flex justify-center items-center gap-1 sm:gap-2"
                    >
                      🛒 Añadir a Lista
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleDownload('list')}
                      disabled={isDownloading}
                      className="w-full sm:w-auto text-xs sm:text-sm font-black text-white bg-[var(--color-sage-700)] px-2 sm:px-5 py-3 rounded-2xl hover:bg-[var(--color-sage-800)] hover:-translate-y-1 transition shadow-xl border border-[var(--color-sage-600)] flex justify-center items-center gap-1 sm:gap-2 disabled:opacity-50"
                    >
                      <span>✅ Añadido</span> <span className="text-white/40 hidden sm:inline">|</span> <span className="hidden sm:inline">{isDownloading ? 'Generando...' : 'Descargar PDF'}</span>
                    </button>
                  )}
                </div>
              </div>
              
              {ingredientsState.length === 0 ? (
                <p className="text-[var(--color-sage-500)] italic">No hay ingredientes registrados.</p>
              ) : (
                <ul className="space-y-3 sm:space-y-4">
                  {ingredientsState.map((ing, index) => {
                    const multiplier = portions / (recipe.porciones || 1);
                    const amount = (parseFloat(ing.cantidad) * multiplier).toFixed(1).replace(/\.0$/, '');
                    
                    return (
                      <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white/50 rounded-2xl border border-white hover:bg-white transition shadow-sm gap-3 sm:gap-4 group">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-[0_0_10px_rgba(81,132,81,0.5)] flex-shrink-0 ${ing.isSubstituted ? 'bg-[var(--color-sand-500)]' : 'bg-[var(--color-sage-500)]'}`}></div>
                          <span className="text-[var(--color-sage-900)] font-medium text-base sm:text-lg">
                            <strong className="text-[var(--color-sage-700)] font-black">{amount} {ing.unidad}</strong> de <span className={ing.isSubstituted ? "italic" : ""}>{ing.isSubstituted ? ing.sustituto : ing.ingrediente}</span>
                          </span>
                        </div>
                        
                        {ing.sustituto && (
                          <button 
                            onClick={() => handleSubstitute(index)}
                            className={`self-start sm:self-auto text-[10px] sm:text-xs font-black px-3 sm:px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-sm active:scale-95 w-full sm:w-auto justify-center ${
                              ing.isSubstituted 
                                ? "text-white bg-[var(--color-sage-500)] border border-[var(--color-sage-600)] hover:bg-[var(--color-sage-600)]" 
                                : "text-[var(--color-sand-900)] bg-[var(--color-sand-100)] border border-[var(--color-sand-300)] hover:bg-[var(--color-sand-200)]"
                            }`}
                          >
                            🔄 {ing.isSubstituted ? "Deshacer" : "Sustituir"}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="mt-12 bg-white/60 p-8 sm:p-12 rounded-3xl border border-white shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[var(--color-sage-100)] rounded-full flex items-center justify-center mb-6 shadow-inner">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-11 h-11 text-[var(--color-sage-700)] drop-shadow-sm">
                  <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V20H6v-6.13z" opacity="0.4" />
                  <rect x="5" y="16" width="14" height="4" rx="1" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-sage-900)] mb-4">¿Todo listo para cocinar?</h3>
              <p className="text-[var(--color-sage-700)] mb-8 max-w-md">
                Sigue el paso a paso interactivo para preparar esta deliciosa receta de la forma más fácil y guiada.
              </p>
              
              <button 
                onClick={() => setIsStepsModalOpen(true)}
                className="w-full sm:w-auto bg-[var(--color-sage-600)] text-white px-10 py-5 rounded-2xl hover:bg-[var(--color-sage-700)] transition-all font-black text-lg flex justify-center items-center shadow-[0_15px_30px_rgba(81,132,81,0.3)] hover:shadow-[0_20px_40px_rgba(81,132,81,0.4)] hover:-translate-y-1"
              >
                Ver pasos de preparación
              </button>
            </div>

          </div>
        </main>
      </div>

      <AnimatePresence>
        {isStepsModalOpen && (
          <FlashcardModal 
            recipe={{
              ...recipe, 
              pasos: Array.isArray(recipe.pasos) ? recipe.pasos.map((paso: any) => ({
                ...paso,
                titulo_paso: replaceSubstitutedIngredients(paso.titulo_paso || '', ingredientsState),
                detalle: replaceSubstitutedIngredients(paso.detalle || '', ingredientsState)
              })) : (recipe.pasos ? JSON.parse(recipe.pasos).map((paso: any) => ({
                ...paso,
                titulo_paso: replaceSubstitutedIngredients(paso.titulo_paso || '', ingredientsState),
                detalle: replaceSubstitutedIngredients(paso.detalle || '', ingredientsState)
              })) : [])
            }} 
            onClose={() => setIsStepsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
