'use client';
import { motion } from 'framer-motion';
import { Flame, Wheat, Croissant, Cake, Globe, Salad, Lock, Image as ImageIcon } from 'lucide-react';

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
      name: "Postres y Repostería", 
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
   // Duplicate array for infinite scroll effect
   const marqueeItems = [...vaults, ...vaults];

   return (
      <div className="py-[90px] md:py-[100px] overflow-hidden">
         <div className="max-w-[1240px] mx-auto px-6 text-center">
            <SectionTitle subtitle="Las 6 Bóvedas">
               <span className="block font-sans font-bold text-[#253725] text-4xl md:text-7xl leading-[1.1]">¿QUÉ ENCONTRARÁS</span>
               <span className="block font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#345334] via-[#74a074] to-[#345334] bg-[length:200%_auto] animate-shimmer pb-2 overflow-visible text-3xl md:text-6xl leading-[1.1]">dentro de la bóveda?</span>
            </SectionTitle>
         </div>

         {/* Marquee Slider */}
         <div className="relative w-full mt-10 flex items-center">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
            
            <motion.div
               className="flex gap-6 w-max px-6"
               animate={{ x: ["0%", "-50%"] }}
               transition={{
                  ease: "linear",
                  duration: 25,
                  repeat: Infinity,
               }}
            >
               {marqueeItems.map((vault, i) => (
                  <div
                     key={i}
                     className={`relative w-[280px] md:w-[320px] shrink-0 bg-white p-6 rounded-[30px] border transition-all hover:translate-y-[-5px] group ${
                        vault.available 
                           ? 'border-[#345334]/30 shadow-[0_15px_40px_-10px_rgba(52,83,52,0.15)]' 
                           : 'border-[#F0F0F0] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.03)]'
                     }`}
                  >
                     {/* Tag badge */}
                     <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        vault.available 
                           ? 'bg-[#345334] text-white shadow-md' 
                           : 'bg-white/90 backdrop-blur-sm text-[#654836]/60 border border-[#F0F0F0]'
                     }`}>
                        {vault.tag}
                     </div>

                     {/* Image Placeholder */}
                     <div className={`w-full aspect-video rounded-2xl mb-5 flex items-center justify-center overflow-hidden border ${
                        vault.available ? 'bg-[#345334]/5 border-[#345334]/10' : 'bg-[#f5f2eb] border-[#EBE6DD]'
                     }`}>
                        <ImageIcon size={32} className={vault.available ? "text-[#345334]/20" : "text-[#654836]/20"} />
                     </div>

                     <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center transition-transform group-hover:scale-110 ${
                           vault.available ? 'bg-[#345334]/10' : 'bg-[#f5f2eb]'
                        }`}>
                           {vault.available ? (
                              <vault.icon size={18} className="text-[#345334]" strokeWidth={2} />
                           ) : (
                              <div className="relative">
                                 <vault.icon size={18} className="text-[#654836]/30" strokeWidth={2} />
                                 <Lock size={10} className="absolute -bottom-1 -right-1 text-[#654836]/40" />
                              </div>
                           )}
                        </div>
                        <h4 className={`text-lg font-bold tracking-tight leading-tight ${
                           vault.available ? 'text-[#253725]' : 'text-[#253725]/60'
                        }`}>{vault.name}</h4>
                     </div>

                     <p className={`text-sm leading-relaxed ${
                        vault.available ? 'text-[#654836]' : 'text-[#654836]/50 italic'
                     }`}>{vault.description}</p>
                  </div>
               ))}
            </motion.div>
         </div>

         <div className="mt-16 max-w-[1240px] mx-auto px-6 text-center">
            <p className="text-lg md:text-xl text-[#654836] max-w-2xl mx-auto italic">
               Como miembro fundador, desbloquearás <strong className="text-[#253725] not-italic">automáticamente y sin costo adicional</strong> cada nueva bóveda conforme se publique.
            </p>
         </div>
      </div>
   );
}
