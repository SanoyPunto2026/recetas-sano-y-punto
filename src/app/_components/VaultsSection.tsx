'use client';
import { motion } from 'framer-motion';
import { Flame, Wheat, Croissant, Cake, Globe, Salad, Lock } from 'lucide-react';

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

const vaults = [
   { 
      icon: Flame, 
      name: "Recetas en Airfryer", 
      description: "Platos crujientes, rápidos y con mínimo aceite. El futuro de la cocina saludable.", 
      available: true,
      tag: "DISPONIBLE AHORA"
   },
   { 
      icon: Salad, 
      name: "Comidas Rápidas Sanas", 
      description: "Almuerzos y cenas listas en 15-20 minutos. Cero excusas, máximo sabor.", 
      available: false,
      tag: "PRÓXIMAMENTE"
   },
   { 
      icon: Wheat, 
      name: "Sin Gluten", 
      description: "Recetas completas y deliciosas, 100% libres de gluten para toda la familia.", 
      available: false,
      tag: "PRÓXIMAMENTE"
   },
   { 
      icon: Croissant, 
      name: "Panadería Sin Gluten", 
      description: "Panes artesanales, baguettes y bollería que nadie creerá que son sin gluten.", 
      available: false,
      tag: "PRÓXIMAMENTE"
   },
   { 
      icon: Cake, 
      name: "Postres y Repostería SG", 
      description: "Tartas, galletas, brownies y pudines gourmet sin una pizca de gluten.", 
      available: false,
      tag: "PRÓXIMAMENTE"
   },
   { 
      icon: Globe, 
      name: "Cocina Mediterránea", 
      description: "Lo mejor de la dieta más saludable del mundo, adaptada a tu cocina.", 
      available: false,
      tag: "PRÓXIMAMENTE"
   },
];

export default function VaultsSection() {
   return (
      <div className="py-[90px] md:py-[100px]">
         <div className="max-w-[1240px] mx-auto px-6">
            <SectionTitle subtitle="Las 6 Bóvedas">¿Qué encontrarás dentro?</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {vaults.map((vault, i) => (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className={`relative bg-white p-8 md:p-10 rounded-[40px] border transition-all hover:translate-y-[-5px] group ${
                        vault.available 
                           ? 'border-[#345334]/30 shadow-[0_15px_40px_-10px_rgba(52,83,52,0.15)]' 
                           : 'border-[#F0F0F0] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.03)]'
                     }`}
                  >
                     {/* Tag badge */}
                     <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        vault.available 
                           ? 'bg-[#345334] text-white' 
                           : 'bg-[#f5f2eb] text-[#654836]/60'
                     }`}>
                        {vault.tag}
                     </div>

                     <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                        vault.available 
                           ? 'bg-[#345334]/10' 
                           : 'bg-[#f5f2eb]'
                     }`}>
                        {vault.available ? (
                           <vault.icon size={28} className="text-[#345334]" strokeWidth={2} />
                        ) : (
                           <div className="relative">
                              <vault.icon size={28} className="text-[#654836]/30" strokeWidth={2} />
                              <Lock size={12} className="absolute -bottom-1 -right-1 text-[#654836]/40" />
                           </div>
                        )}
                     </div>

                     <h4 className={`text-xl md:text-2xl font-bold mb-3 tracking-tight ${
                        vault.available ? 'text-[#253725]' : 'text-[#253725]/60'
                     }`}>{vault.name}</h4>
                     <p className={`text-sm leading-relaxed ${
                        vault.available ? 'text-[#654836]' : 'text-[#654836]/50 italic'
                     }`}>{vault.description}</p>
                  </motion.div>
               ))}
            </div>

            <div className="mt-16 text-center">
               <p className="text-lg md:text-xl text-[#654836] max-w-2xl mx-auto italic">
                  Como miembro fundador, desbloquearás <strong className="text-[#253725] not-italic">automáticamente y sin costo adicional</strong> cada nueva bóveda conforme se publique.
               </p>
            </div>
         </div>
      </div>
   );
}
