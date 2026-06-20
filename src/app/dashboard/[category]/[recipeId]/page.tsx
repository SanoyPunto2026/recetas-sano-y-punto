"use client";

import { use, useState } from "react";
import Link from "next/link";
import Script from "next/script";

export default function RecipeDetail({ params }: { params: Promise<{ category: string, recipeId: string }> }) {
  const resolvedParams = use(params);
  const { category } = resolvedParams;
  
  const [portions, setPortions] = useState(2);
  const [addedToList, setAddedToList] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Todos los ingredientes ahora tienen la opción de ser sustituidos
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Pechuga de pollo", amount: 150, unit: "g", canSubstitute: true, substitute: "Lomo de cerdo magro" },
    { id: 2, name: "Arroz integral", amount: 80, unit: "g", canSubstitute: true, substitute: "Quinoa tricolor" },
    { id: 3, name: "Brócoli fresco", amount: 100, unit: "g", canSubstitute: true, substitute: "Coliflor" },
    { id: 4, name: "Aceite de oliva extra virgen", amount: 1, unit: "cda", canSubstitute: true, substitute: "Aceite de aguacate" },
  ]);

  const handlePortionChange = (change: number) => {
    if (portions + change > 0) setPortions(portions + change);
  };

  const handleSubstitute = (id: number) => {
    setIngredients(ingredients.map(ing => {
      if (ing.id === id && ing.canSubstitute) {
        return { ...ing, name: ing.substitute as string, substitute: ing.name };
      }
      return ing;
    }));
  };

  // Función infalible para generar el string HTML crudo que html2pdf procesará sin depender del DOM oculto
  const getPDFHTML = (type: 'recipe' | 'list') => {
    const listItems = ingredients.map(ing => {
      const amount = (ing.amount * portions / 2);
      return `
        <div style="padding: 12px 16px; border-bottom: 1px solid #e3ebe3; background: #fbfaf8; margin-bottom: 8px; border-radius: 8px; display: flex; align-items: center; font-size: 16px;">
          ${type === 'list' ? `<div style="width: 20px; height: 20px; border: 2px solid #9ebf9e; border-radius: 4px; margin-right: 15px;"></div>` : ''}
          <span style="font-weight: 900; color: #518451; width: 90px; flex-shrink: 0;">${amount} ${ing.unit}</span>
          <span>${ing.name}</span>
        </div>
      `;
    }).join('');

    const recipeSteps = type === 'recipe' ? `
      <div style="margin-bottom: 40px;">
        <h2 style="color: #345334; font-size: 22px; font-weight: 900; text-transform: uppercase; margin-bottom: 20px;">Paso a Paso</h2>
        <div style="margin-bottom: 20px; display: flex; align-items: flex-start;">
          <div style="font-weight: 900; color: white; background: #518451; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin-right: 15px; flex-shrink: 0; text-align: center; line-height: 30px;">1</div>
          <div style="font-size: 16px; margin-top: 4px;">Sazona la pechuga de pollo con sal, pimienta y tus especias favoritas. Precalienta la Airfryer a 200°C.</div>
        </div>
        <div style="margin-bottom: 20px; display: flex; align-items: flex-start;">
          <div style="font-weight: 900; color: white; background: #518451; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin-right: 15px; flex-shrink: 0; text-align: center; line-height: 30px;">2</div>
          <div style="font-size: 16px; margin-top: 4px;">Coloca el pollo en la canasta y cocina durante 15 minutos. A la mitad del tiempo, dales la vuelta para que se doren parejo.</div>
        </div>
      </div>
    ` : '';

    return `
      <div style="font-family: sans-serif; color: #121e12; padding: 40px; background: white;">
        <div style="text-align: center; border-bottom: 3px solid #e3ebe3; padding-bottom: 20px; margin-bottom: 40px;">
          <div style="font-size: 28px; font-weight: 900; color: #518451; letter-spacing: -0.5px;">SANO Y PUNTO</div>
          <h1 style="font-size: 32px; font-weight: 900; color: #253725; margin: 10px 0;">
            ${type === 'recipe' ? 'Pollo Crujiente (Airfryer)' : 'Mi Lista de Compra Inteligente'}
          </h1>
          <div style="color: #518451; font-weight: bold; font-size: 16px; background: #f4f7f4; display: inline-block; padding: 8px 16px; border-radius: 8px;">
            ${type === 'recipe' 
              ? `⏱ 20 min | 🔥 350 kcal | 👨‍👩‍👧‍👦 ${portions} porciones` 
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
          ${type === 'recipe' 
            ? 'Transformando tu relación con la comida de forma fácil y deliciosa.' 
            : 'Generado automáticamente por app.sanoypunto.com'}<br/>
          app.sanoypunto.com
        </div>
      </div>
    `;
  };

  const handleDownload = async (type: 'recipe' | 'list') => {
    setIsDownloading(true);
    
    const htmlContent = getPDFHTML(type);
    
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     type === 'recipe' ? 'Receta_Pollo_Crujiente.pdf' : 'Lista_de_Compra_SanoYPunto.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set(opt).from(htmlContent).save();
      setIsDownloading(false);
    } catch (err: any) {
      console.error("Error generating PDF", err);
      setIsDownloading(false);
      alert("Hubo un error al generar el PDF. Asegúrate de que la página ha cargado por completo.");
    }
  };

  const BrandLogo = () => (
    <div className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0">
      <svg width="100%" height="100%" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="512" cy="512" r="512" fill="#3F683F"/>
        <g transform="translate(256, 256) scale(21.33)">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 22c0-3 1-5 4-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </div>
  );

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="beforeInteractive" />

      <div className="min-h-screen pb-24 bg-[var(--color-sand-50)] overflow-x-hidden">
        <header className="glass sticky top-0 z-50 border-b border-white/40 shadow-sm bg-white/70 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
            <div className="flex items-center overflow-hidden">
              <Link href={`/dashboard/${category}`} className="text-[var(--color-sage-400)] hover:text-[var(--color-sage-800)] mr-3 sm:mr-4 font-black text-xl sm:text-2xl transition-all hover:-translate-x-1 flex-shrink-0">
                ←
              </Link>
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <BrandLogo />
                <h1 className="text-lg sm:text-xl font-black text-[var(--color-sage-900)] truncate mt-1">Pollo Crujiente</h1>
              </div>
            </div>
            
            <div className="flex flex-shrink-0 justify-end">
              <button className="text-xl sm:text-2xl glass-button p-2 px-3 rounded-xl hover:scale-110 transition shadow-sm border border-white flex justify-center items-center">
                 🤍
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          
          <div className="mb-6 flex justify-end">
            <button 
              onClick={() => handleDownload('recipe')} 
              disabled={isDownloading} 
              className="w-full sm:w-auto text-sm md:text-base bg-[var(--color-sage-700)] hover:bg-[var(--color-sage-800)] text-white px-6 py-3 rounded-2xl hover:-translate-y-1 transition font-bold flex justify-center items-center gap-2 shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <span>📥</span> <span>{isDownloading ? 'Generando PDF...' : 'Descargar Receta en PDF'}</span>
            </button>
          </div>

          <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[var(--color-sage-200)] to-[var(--color-sand-200)] rounded-3xl sm:rounded-[2.5rem] flex items-center justify-center text-8xl sm:text-9xl relative overflow-hidden shadow-md mb-8">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E')]"></div>
            <span className="relative z-10 hover:scale-110 transition-transform duration-500 cursor-default drop-shadow-xl">🍗</span>
            
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex gap-2 sm:gap-3 z-10">
              <span className="glass-button px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-[var(--color-sage-900)] shadow-lg">⏱ 20 min</span>
              <span className="bg-[var(--color-sage-700)] px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-xl">🔥 350 kcal</span>
            </div>
          </div>

          <div className="glass rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 relative z-10 shadow-lg border border-white/60">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10 pb-10 border-b border-white/40">
              <div>
                <h2 className="text-[10px] sm:text-xs font-black text-[var(--color-sage-500)] uppercase tracking-[0.2em] mb-1 sm:mb-2">Producto Principal</h2>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[var(--color-sage-950)] leading-tight">Ajuste Dinámico de Porciones</h3>
              </div>
              
              <div className="flex items-center glass rounded-2xl p-1 sm:p-2 border border-white/60 shadow-inner w-full md:w-auto justify-between md:justify-start">
                <button onClick={() => handlePortionChange(-1)} className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center text-[var(--color-sage-700)] hover:bg-white rounded-xl text-2xl sm:text-3xl font-black transition">-</button>
                <div className="w-16 sm:w-20 text-center font-black text-xl sm:text-2xl text-[var(--color-sage-900)]">{portions}</div>
                <button onClick={() => handlePortionChange(1)} className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center text-[var(--color-sage-700)] hover:bg-white rounded-xl text-2xl sm:text-3xl font-black transition">+</button>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-sage-900)]">Ingredientes</h3>
                
                <div className="w-full sm:w-auto">
                  {!addedToList ? (
                    <button 
                      onClick={() => setAddedToList(true)}
                      className="w-full sm:w-auto text-sm font-black text-[var(--color-sage-900)] glass-button px-5 py-3 rounded-xl hover:-translate-y-1 transition shadow-sm border border-white flex justify-center items-center gap-2"
                    >
                      🛒 Añadir a Lista
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleDownload('list')}
                      disabled={isDownloading}
                      className="w-full sm:w-auto text-sm font-black text-white bg-[var(--color-sage-700)] px-5 py-3 rounded-xl hover:bg-[var(--color-sage-800)] hover:-translate-y-1 transition shadow-xl border border-[var(--color-sage-600)] flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                      <span>✅ Añadido</span> <span className="text-white/40">|</span> <span>{isDownloading ? 'Generando...' : 'Descargar PDF'}</span>
                    </button>
                  )}
                </div>
              </div>
              
              <ul className="space-y-3 sm:space-y-4">
                {ingredients.map((ing) => (
                  <li key={ing.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white/50 rounded-2xl border border-white hover:bg-white transition shadow-sm gap-3 sm:gap-4 group">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--color-sage-500)] shadow-[0_0_10px_rgba(81,132,81,0.5)] flex-shrink-0"></div>
                      <span className="text-[var(--color-sage-900)] font-medium text-base sm:text-lg">
                        <strong className="text-[var(--color-sage-700)] font-black">{(ing.amount * portions / 2)} {ing.unit}</strong> de {ing.name}
                      </span>
                    </div>
                    
                    {ing.canSubstitute && (
                      <button 
                        onClick={() => handleSubstitute(ing.id)}
                        className="self-start sm:self-auto text-[10px] sm:text-xs font-black text-[var(--color-sand-900)] bg-[var(--color-sand-100)] border border-[var(--color-sand-300)] px-3 sm:px-4 py-2 rounded-xl hover:bg-[var(--color-sand-200)] transition flex items-center gap-2 shadow-sm active:scale-95 w-full sm:w-auto justify-center"
                      >
                        🔄 Sustituir
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-sage-900)] mb-6 sm:mb-8">Preparación</h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[var(--color-sage-200)] text-[var(--color-sage-900)] font-black text-lg sm:text-xl rounded-2xl flex items-center justify-center border border-[var(--color-sage-300)] shadow-sm">1</div>
                  <p className="text-[var(--color-sage-800)] text-base sm:text-lg leading-relaxed font-medium mt-1 sm:mt-2">Sazona la pechuga de pollo con sal, pimienta y tus especias favoritas. Precalienta la Airfryer a 200°C.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[var(--color-sage-200)] text-[var(--color-sage-900)] font-black text-lg sm:text-xl rounded-2xl flex items-center justify-center border border-[var(--color-sage-300)] shadow-sm">2</div>
                  <p className="text-[var(--color-sage-800)] text-base sm:text-lg leading-relaxed font-medium mt-1 sm:mt-2">Coloca el pollo en la canasta y cocina durante 15 minutos. A la mitad del tiempo, dales la vuelta para que se doren parejo.</p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
