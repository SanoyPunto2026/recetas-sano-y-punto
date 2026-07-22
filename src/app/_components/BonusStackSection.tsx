'use client';
import { motion } from 'framer-motion';
import { RefreshCw, FileDown, Search, TrendingUp, Gift } from 'lucide-react';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
   <div className="mb-16 md:mb-24 text-center">
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
      <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight leading-[1.1] text-white">{children}</h2>
   </div>
);

const bonuses = [
   {
      icon: TrendingUp,
      title: "+10 Recetas Nuevas Cada Mes",
      description: "La bóveda crece constantemente. Cada mes sumamos al menos 10 recetas nuevas verificadas y probadas.",
      value: "$5/mes"
   },
   {
      icon: FileDown,
      title: "Descarga en PDF Premium",
      description: "Cada receta se puede descargar como tarjeta PDF de alta resolución. Llévala al súper o imprímela en tu cocina.",
      value: "$3/mes"
   },
   {
      icon: RefreshCw,
      title: "Guía de Sustitución de Ingredientes",
      description: "¿No tienes un ingrediente? Nuestro sistema te sugiere sustitutos que cumplen la misma función sin arruinar el plato.",
      value: "$4/mes"
   },
   {
      icon: Search,
      title: "Motor de Filtros Inteligente",
      description: "Encuentra tu receta ideal filtrando por dificultad, tiempo de preparación y enfoque del chef (país/región).",
      value: "$3/mes"
   },
   {
      icon: Gift,
      title: "Acceso de Fundador Vitalicio",
      description: "Únete hoy y desbloquea todas las bóvedas futuras sin pagar ni un céntimo más. Este precio no durará.",
      value: "Invaluable"
   },
];

export default function BonusStackSection() {
   return (
      <section className="py-[90px] md:py-[100px] bg-[#253725] relative overflow-hidden">
         <div className="absolute -top-20 -right-20 text-[20rem] font-black italic opacity-[0.03] select-none text-white leading-none pointer-events-none">BONUS</div>
         
         <div className="max-w-[900px] mx-auto px-6 relative z-10">
            <SectionTitle subtitle="El Stack de Valor">Todo lo que recibes<br />además de las recetas</SectionTitle>

            <div className="space-y-4">
               {bonuses.map((bonus, i) => (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 flex gap-6 items-start hover:bg-white/15 transition-colors group"
                  >
                     <div className="bg-white/10 p-3 rounded-2xl shrink-0 group-hover:bg-[#D4A373]/20 transition-colors">
                        <bonus.icon size={24} className="text-[#D4A373]" />
                     </div>
                     <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                           <h4 className="text-lg md:text-xl font-bold text-white">{bonus.title}</h4>
                           <span className="text-sm font-bold text-[#D4A373] line-through opacity-60 shrink-0">{bonus.value}</span>
                        </div>
                        <p className="text-sm text-white/60 italic leading-relaxed">{bonus.description}</p>
                     </div>
                  </motion.div>
               ))}
            </div>

            <div className="mt-12 text-center">
               <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Valor total: <span className="line-through">$15+/mes</span></p>
               <p className="text-white text-3xl md:text-4xl font-bold mt-2">Todo incluido por <span className="text-[#D4A373]">$10/mes</span></p>
            </div>
         </div>
      </section>
   );
}
