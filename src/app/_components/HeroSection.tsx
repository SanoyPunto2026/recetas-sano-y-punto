'use client';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
   return (
      <section className="pt-[40px] md:pt-[60px] pb-[60px] md:pb-[100px] px-6 text-center">
         <div className="max-w-[1000px] mx-auto">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
               <div className="h-[2px] w-8 md:w-24 bg-[#D4A373]/60"></div>
               <span className="text-[#D4A373] text-[9px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                  LANZAMIENTO FUNDADORES 2026
               </span>
               <div className="h-[2px] w-8 md:w-24 bg-[#D4A373]/60"></div>
            </div>

            <h1 className="mb-8 md:mb-12 leading-[1.1] md:leading-tight">
               <span className="block text-[38px] sm:text-[45px] md:text-[80px] lg:text-[100px] text-[#253725] font-sans font-bold tracking-tight">TU BÓVEDA</span>
               <span className="block text-[35px] sm:text-[40px] md:text-[75px] lg:text-[95px] italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#345334] via-[#74a074] to-[#345334] bg-[length:200%_auto] animate-shimmer pb-2 overflow-visible">
                  de recetas
               </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#654836] max-w-2xl mx-auto mb-8 font-light leading-snug">
               <span className="block text-[#253725] font-bold mb-2">6 categorías. Cientos de recetas. Acceso ilimitado.</span>
               Cocina saludable, deliciosa y rápida sin pensar qué hacer de comer.{' '}
               <span className="text-[#253725] font-semibold">Airfryer, sin gluten, mediterránea y mucho más.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center mt-8">
               <a href="#oferta" className="bg-[#345334] text-white px-10 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition-all flex items-center gap-4 whitespace-nowrap hover:bg-[#253725]">
                  ACCEDER A LA BÓVEDA <ArrowRight />
               </a>
            </div>

            {/* Trust bar */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-[#654836]/60 font-bold uppercase tracking-widest">
               <span>✓ 30 días de garantía</span>
               <span className="hidden md:inline">•</span>
               <span>✓ +10 recetas nuevas/mes</span>
               <span className="hidden md:inline">•</span>
               <span>✓ Descarga PDF</span>
            </div>
         </div>
      </section>
   );
}
