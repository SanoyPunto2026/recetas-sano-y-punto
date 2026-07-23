'use client';
import { ArrowRight, ShieldCheck, Flame, Salad, Wheat, Croissant, Cake, Globe, Gift } from 'lucide-react';
import Image from 'next/image';

const OfferItem = ({ icon: Icon, title, price }: { icon: any; title: string; price: string }) => (
   <div className="flex justify-between items-center py-2.5 md:py-4 border-b border-[#EBE6DD] last:border-0">
      <div className="flex items-center gap-3 md:gap-5">
         <div className="bg-[#345334]/10 p-2 rounded-lg">
            <Icon size={16} className="text-[#345334]" />
         </div>
         <span className="font-medium text-[11px] md:text-base uppercase tracking-tight text-[#253725]">{title}</span>
      </div>
      <span className="text-[14px] md:text-xl opacity-30 line-through font-sans font-bold text-[#253725]">${price}</span>
   </div>
);

export default function OfferSection() {
   return (
      <section id="oferta" className="py-[60px] md:py-[70px] bg-[#345334] relative overflow-hidden min-h-[932px] flex flex-col justify-center">
         <div className="absolute -top-20 -left-20 text-[25rem] font-black italic opacity-[0.03] select-none text-white leading-none pointer-events-none">$10</div>
         <div className="max-w-[800px] mx-auto px-4 md:px-6 relative z-10 w-full">
            <div className="bg-white rounded-[40px] md:rounded-[60px] p-6 md:p-16 shadow-2xl relative">

               <div className="flex justify-center mb-6 md:mb-8 pt-4">
                  <div className="relative w-[75%] sm:w-[65%] md:w-[60%] max-w-[340px] aspect-[1.25] hover:scale-[1.03] transition-transform duration-500 filter drop-shadow-[0_25px_50px_rgba(37,55,37,0.2)]">
                     <Image 
                        src="/boveda_cover.png" 
                        alt="Bóveda Sano & Punto" 
                        fill
                        sizes="(max-width: 768px) 75vw, 340px"
                        className="object-contain"
                        priority
                     />
                  </div>
               </div>

               <div className="text-center mb-4 md:mb-6">
                  <h2 className="text-3xl md:text-5xl text-[#253725] leading-tight font-sans font-semibold">Todo lo que recibirás hoy</h2>
               </div>

              <div className="bg-[#F9F7F2] rounded-3xl p-4 md:p-6 border border-[#EBE6DD] mb-4">
                 <div className="flex flex-col">
                    <OfferItem icon={Flame} title="Bóveda Recetas Airfryer" price="5,00" />
                    <OfferItem icon={Salad} title="Bóveda Comidas Rápidas Sanas" price="5,00" />
                    <OfferItem icon={Wheat} title="Bóveda Sin Gluten" price="5,00" />
                    <OfferItem icon={Croissant} title="Bóveda Panadería Sin Gluten" price="5,00" />
                    <OfferItem icon={Cake} title="Bóveda Postres y Repostería" price="5,00" />
                    <OfferItem icon={Globe} title="Bóveda Cocina Mediterránea" price="5,00" />
                    <OfferItem icon={Gift} title="Bonus Secretos x5" price="15,00" />
                 </div>
              </div>

              <div className="text-center relative">
                 <div className="mb-4">
                    <span className="text-sm md:text-xl font-medium uppercase tracking-[0.2em] opacity-40 block mb-1 text-[#253725] line-through">Valor Real: $45,00 USD</span>
                    <div className="relative inline-block">
                       <div className="text-8xl md:text-[9.5rem] font-sans font-bold text-[#253725] relative z-10 bg-gradient-to-br from-[#253725] via-[#74a074] to-[#253725] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] tracking-tighter leading-[1] py-1 px-4 overflow-visible">
                          $10
                       </div>
                       <div className="absolute inset-x-0 bottom-2 h-4 bg-[#74a074]/20 blur-3xl rounded-full scale-150 animate-pulse" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                       <span className="bg-[#345334]/10 text-[#345334] text-xs md:text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Pago único • Acceso de por vida</span>
                    </div>
                 </div>

                 <a 
                    href="https://pay.hotmart.com/H106832606H?checkoutMode=10"
                    className="relative overflow-hidden w-full bg-[#345334] text-white py-4 md:py-6 rounded-2xl text-lg md:text-2xl font-black shadow-2xl hover:bg-[#253725] transition-all group uppercase tracking-[0.1em] flex items-center justify-center gap-4 text-center px-4"
                 >
                    Quiero acceso a la Bóveda <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 </a>

                 <div className="mt-8 flex items-center justify-center gap-4 opacity-50 text-[#253725]">
                    <ShieldCheck size={20} className="text-[#74a074]" />
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-normal">30 días de reembolso sin preguntas • Pago 100% Protegido</p>
                 </div>
                 <p className="mt-4 text-[10px] md:text-xs text-[#654836]/60 italic leading-relaxed max-w-md mx-auto">El valor está expresado en dólares americanos (USD). Al pasar al checkout, el monto será automáticamente convertido a tu moneda local.</p>
              </div>
           </div>
        </div>
     </section>
   );
}
