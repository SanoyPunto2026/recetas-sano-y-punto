'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, FileDown, Search, TrendingUp, Gift, Lock, ChevronDown } from 'lucide-react';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
   <div className="mb-12 md:mb-16 text-center">
      {subtitle && (
         <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase font-black tracking-[0.4em] mb-4 block text-[#D4A373]"
         >
            {subtitle}
         </motion.span>
      )}
      <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight leading-[1.1] text-[#253725]">{children}</h2>
   </div>
);

const bonuses = [
   {
      icon: TrendingUp,
      title: "+10 Recetas Nuevas Cada Mes",
      description: "La bóveda crece constantemente. Cada mes sumamos al menos 10 recetas nuevas verificadas y probadas.",
      value: "$5"
   },
   {
      icon: FileDown,
      title: "Descarga en PDF Premium",
      description: "Cada receta se puede descargar como tarjeta PDF de alta resolución. Llévala al súper o imprímela en tu cocina.",
      value: "$3"
   },
   {
      icon: RefreshCw,
      title: "Guía de Sustitución de Ingredientes",
      description: "¿No tienes un ingrediente? Nuestro sistema te sugiere sustitutos que cumplen la misma función sin arruinar el plato.",
      value: "$4"
   },
   {
      icon: Search,
      title: "Motor de Filtros Inteligente",
      description: "Encuentra tu receta ideal filtrando por dificultad, tiempo de preparación y enfoque del chef (país/región).",
      value: "$3"
   },
   {
      icon: Gift,
      title: "Acceso de Fundador Vitalicio",
      description: "Únete hoy y desbloquea todas las bóvedas futuras sin pagar ni un céntimo más. Este precio no durará.",
      value: "Invaluable"
   },
];

export default function BonusStackSection() {
   const [unlocked, setUnlocked] = useState<number[]>([]);

   const toggleUnlock = (idx: number) => {
      if (unlocked.includes(idx)) {
         setUnlocked(unlocked.filter(i => i !== idx));
      } else {
         setUnlocked([...unlocked, idx]);
      }
   };

   return (
      <section className="py-[90px] md:py-[100px] bg-[#FDFBF7] relative overflow-hidden">
         <div className="absolute -top-10 -left-10 text-[15rem] font-black italic opacity-[0.02] select-none text-[#253725] leading-none pointer-events-none">REGALOS</div>
         
         <div className="max-w-[1000px] mx-auto px-6 relative z-10">
            <SectionTitle>Todo lo que recibes<br />además de las recetas</SectionTitle>

            <div className="text-center mb-12">
               <div className="inline-block bg-[#345334]/10 text-[#345334] px-6 py-3 rounded-full text-sm md:text-base font-bold animate-pulse shadow-sm">
                  Toca cada tarjeta para revelar tu bonus especial 👇
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
               {bonuses.map((bonus, i) => {
                  const isUnlocked = unlocked.includes(i);
                  return (
                     <motion.div
                        key={i}
                        layout
                        onClick={() => toggleUnlock(i)}
                        className={`cursor-pointer overflow-hidden border rounded-[30px] p-6 transition-all duration-500 ${
                           isUnlocked 
                              ? 'bg-white border-[#345334]/30 shadow-[0_15px_40px_-10px_rgba(52,83,52,0.15)]' 
                              : 'bg-white/50 border-[#EBE6DD] shadow-sm hover:shadow-md hover:-translate-y-1'
                        }`}
                     >
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-full flex shrink-0 items-center justify-center transition-all ${
                              isUnlocked ? 'bg-[#345334]/10 text-[#345334]' : 'bg-[#253725]/5 text-[#253725]/40'
                           }`}>
                              {isUnlocked ? <bonus.icon size={20} /> : <Lock size={20} />}
                           </div>
                           <div className="flex-1">
                              <h4 className={`text-xl md:text-2xl font-bold tracking-tight leading-tight ${
                                 isUnlocked ? 'text-[#253725]' : 'text-[#253725]/60'
                              }`}>
                                 {isUnlocked ? bonus.title : `Bonus Secreto #${i + 1}`}
                              </h4>
                              {!isUnlocked && <p className="text-[#654836]/50 text-[11px] md:text-sm mt-1">Haz clic para descubrir</p>}
                           </div>
                           <motion.div 
                              animate={{ rotate: isUnlocked ? 180 : 0 }} 
                              className="text-[#345334]/40 shrink-0"
                           >
                              <ChevronDown size={20} />
                           </motion.div>
                        </div>

                        <AnimatePresence>
                           {isUnlocked && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                 animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                                 exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                 className="overflow-hidden"
                              >
                                 <div className="pt-5 border-t border-[#F0F0F0]">
                                    <div className="flex justify-between items-center mb-3">
                                       <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#D4A373] bg-[#D4A373]/10 px-3 py-1 rounded-full">Valor: {bonus.value}</span>
                                       <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#345334] bg-[#345334]/10 px-3 py-1 rounded-full">Gratis Hoy</span>
                                    </div>
                                    <p className="text-[#654836] text-base md:text-lg leading-relaxed">{bonus.description}</p>
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  )
               })}
            </div>

         </div>
      </section>
   );
}
