'use client';
import { Leaf, ArrowDownToLine } from 'lucide-react';
import Link from 'next/link';

export default function StickyHeader({ hideButton = false }: { hideButton?: boolean }) {
   return (
      <nav className="sticky top-2 md:top-6 w-[95%] max-w-4xl mx-auto z-[100]">
         <div className="bg-white/60 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 md:gap-4">
               <div className="w-12 h-12 md:w-14 md:h-14 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-black/10">
                  <Leaf size={24} className="text-[#4A6741]" />
               </div>
               <div className="flex flex-col leading-none">
                  <div className="font-sans text-[22px] md:text-3xl font-black tracking-tighter text-[#1A1C1A] flex items-center gap-1">
                     <span>Sano &</span>
                     <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#4A6741] to-[#8B7355]">Punto.</span>
                  </div>
               </div>
            </div>
            
            {!hideButton && (
               <div className="flex items-center">
                  <a 
                     href="#oferta" 
                     aria-label="Ir a la oferta"
                     className="w-10 h-10 md:w-12 md:h-12 bg-[#345334]/10 text-[#345334] rounded-full flex items-center justify-center hover:bg-[#345334]/20 hover:scale-105 active:scale-95 transition-all shadow-sm"
                  >
                     <ArrowDownToLine size={20} strokeWidth={2.5} />
                  </a>
               </div>
            )}
         </div>
      </nav>
   );
}
