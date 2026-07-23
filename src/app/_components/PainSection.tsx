'use client';
import { motion } from 'framer-motion';
import { Clock, Brain, XCircle, Coins, AlertCircle, Utensils } from 'lucide-react';

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

const PainCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
   <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 md:p-10 rounded-[40px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-[#F0F0F0] flex flex-col items-center text-center transition-all hover:scale-[1.02] hover:shadow-xl group"
   >
      <div className="bg-[#FFF1F1] w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:rotate-12">
         <Icon size={28} className="text-[#FF4D4D]" strokeWidth={2.5} />
      </div>
      <h4 className="text-xl md:text-2xl font-sans font-bold mb-3 text-[#253725] leading-tight tracking-tight">{title}</h4>
      <p className="text-sm md:text-base text-[#654836] leading-relaxed opacity-80 italic">{description}</p>
   </motion.div>
);

export default function PainSection() {
   const pains = [
      { i: Clock, t: "¿Sin tiempo para cocinar?", d: "Llegas a casa agotado/a y lo último que quieres es pensar qué hacer de cenar." },
      { i: Brain, t: "¿Cansado de lo mismo?", d: "Pollo a la plancha, ensalada, arroz... La misma rueda aburrida todas las semanas." },
      { i: XCircle, t: "¿Recetas que no funcionan?", d: "Las recetas 'gratuitas' de internet fallan, no tienen proporciones y pierdes ingredientes." },
      { i: Coins, t: "¿Dinero en comida basura?", d: "Terminas pidiendo comida rápida porque 'no hay tiempo', y tu cartera y tu salud lo pagan." },
      { i: AlertCircle, t: "¿Miedo a la cocina?", d: "Sientes que cocinar saludable es demasiado complejo, caro o requiere ser un chef profesional." },
      { i: Utensils, t: "¿Tu familia merece más?", d: "Quieres alimentar bien a los tuyos pero no sabes por dónde empezar sin morir en el intento." }
   ];

   return (
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
         <SectionTitle subtitle="¿Te suena familiar?">La frustración de querer<br /> comer bien de verdad...</SectionTitle>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {pains.map((p, idx) => (
               <PainCard key={idx} icon={p.i} title={p.t} description={p.d} />
            ))}
         </div>
         <div className="mt-16 text-center">
            <h4 className="text-[#253725] italic text-2xl md:text-3xl font-serif">&quot;¿Y si hubiera una forma de volver a disfrutar la cocina?&quot;</h4>
         </div>
      </div>
   );
}
