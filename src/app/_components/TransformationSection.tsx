'use client';
import { motion } from 'framer-motion';
import { Zap, ChefHat, Target, ArrowRight } from 'lucide-react';

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
      <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight leading-[1.1] text-[#253725]">{children}</h2>
   </div>
);

const BenefitCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
   <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white p-4 md:p-8 rounded-[30px] md:rounded-[40px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.03)] border border-[#F0F0F0] flex flex-col items-center text-center transition-all hover:translate-y-[-5px] hover:shadow-2xl group"
   >
      <div className="bg-[#EFFFF6] w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3 md:mb-5 transition-transform group-hover:scale-110">
         <Icon size={28} className="text-[#10B981]" strokeWidth={2.5} />
      </div>
      <h4 className="text-xl md:text-2xl font-sans font-bold mb-1 md:mb-3 text-[#253725] leading-tight tracking-tight">{title}</h4>
      <p className="text-sm md:text-base text-[#654836] leading-relaxed opacity-80 italic">{description}</p>
   </motion.div>
);

export default function TransformationSection() {
   return (
      <div className="max-w-[1000px] mx-auto px-6 text-center">
         <SectionTitle subtitle="Presentamos la Bóveda de Sano y Punto">
            <span className="block font-sans font-bold text-[#253725] text-4xl md:text-7xl leading-[1.1]">COCINA SALUDABLE</span>
            <span className="block font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#345334] via-[#74a074] to-[#345334] bg-[length:200%_auto] animate-shimmer pb-2 overflow-visible text-3xl md:text-6xl leading-[1.1]">sin complicaciones</span>
         </SectionTitle>

         <p className="text-xl md:text-2xl text-[#654836] mb-12 max-w-2xl mx-auto leading-snug">No es un ebook más como los que ves en internet. Es una <strong className="text-[#253725]">bóveda en constante crecimiento</strong>. Accede desde cualquier lugar, aplica filtros inteligentes y encuentra la receta perfecta en segundos.</p>

         <div className="grid grid-cols-2 gap-3 md:gap-6 text-left max-w-4xl mx-auto mb-24">
            {[
               { t: "Listo en minutos", d: "Recetas rápidas con Airfryer y cocina express.", i: Zap },
               { t: "Sabor de restaurante", d: "Técnicas profesionales simplificadas para ti.", i: ChefHat },
               { t: "Nutrición precisa", d: "Cada receta incluye calorías, macros y tiempos.", i: Target },
               { t: "Cero excusas", d: "¿No tienes un ingrediente? Sustitúyelo al instante.", i: ArrowRight },
            ].map((item, i) => (
               <BenefitCard 
                  key={i}
                  icon={item.i}
                  title={item.t}
                  description={item.d}
               />
            ))}
         </div>

         <a href="#oferta" className="bg-[#345334] text-white w-full max-w-[400px] mx-auto py-6 rounded-2xl text-xl font-bold flex justify-center items-center gap-3 shadow-xl hover:scale-105 transition-all hover:bg-[#253725]">
            QUIERO ACCESO <ArrowRight />
         </a>
      </div>
   );
}
