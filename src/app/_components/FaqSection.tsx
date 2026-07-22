'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

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

export default function FaqSection() {
   const [openFaq, setOpenFaq] = useState<number | null>(null);

   const faqs = [
      { q: "¿Qué recetas están disponibles hoy?", a: "Hoy tienes acceso completo a la Bóveda de Recetas en Airfryer. Las 5 bóvedas restantes (Comidas Rápidas Sanas, Sin Gluten, Panadería SG, Postres SG y Cocina Mediterránea) se irán desbloqueando en las próximas semanas sin costo adicional para ti como miembro fundador." },
      { q: "¿Necesito experiencia previa en cocina?", a: "Para nada. Cada receta incluye pasos detallados, tiempos exactos y valores nutricionales. Está diseñada para que cualquier persona, desde principiantes hasta chefs experimentados, pueda seguirla." },
      { q: "¿Puedo descargar las recetas?", a: "Sí. Cada receta se puede descargar como tarjeta PDF de alta resolución para llevarla al supermercado, imprimirla en tu cocina o consultarla sin conexión a internet." },
      { q: "¿Si no tengo un ingrediente?", a: "La bóveda incluye un sistema de sustitución de ingredientes. Si no tienes algo, te sugerimos alternativas que cumplen la misma función sin afectar el resultado final del plato." },
      { q: "¿Cada cuánto se añaden recetas nuevas?", a: "Mínimo 10 recetas nuevas cada mes, verificadas y probadas por nuestro equipo. Tu biblioteca de recetas crece constantemente." },
      { q: "¿Qué pasa si no me convence?", a: "Tienes 30 días de garantía de devolución completa, sin preguntas. Si sientes que no es para ti, nos escribes y te reembolsamos el 100%." },
      { q: "¿El precio de $10/mes subirá?", a: "Sí. Este es el precio exclusivo de lanzamiento para miembros fundadores. Cuando se publiquen todas las bóvedas, el precio subirá para nuevos miembros. Tú mantendrás tu precio de fundador." },
   ];

   return (
      <section className="py-[90px] md:py-[100px] bg-[#F9F7F2]">
         <div className="max-w-3xl mx-auto px-6">
            <SectionTitle subtitle="Dudas Frecuentes">Preguntas Frecuentes</SectionTitle>
            <div className="space-y-4">
               {faqs.map((faq, i) => (
                  <button 
                     key={i} 
                     className="w-full bg-white rounded-3xl p-6 cursor-pointer border border-[#EBE6DD] flex flex-col text-left transition-colors hover:border-[#74a074]/40" 
                     onClick={() => setOpenFaq(openFaq === i ? null : i)}
                     aria-expanded={openFaq === i}
                  >
                     <div className="flex justify-between items-center font-bold text-[#253725] w-full">
                        {faq.q}
                        <span className="text-[#74a074] ml-4">{openFaq === i ? <Minus size={16} /> : <Plus size={16} />}</span>
                     </div>
                     {openFaq === i && (
                        <motion.p 
                           initial={{ opacity: 0, height: 0 }} 
                           animate={{ opacity: 1, height: 'auto' }} 
                           className="mt-6 text-sm text-[#654836] italic"
                        >
                           {faq.a}
                        </motion.p>
                     )}
                  </button>
               ))}
            </div>
         </div>
      </section>
   );
}
