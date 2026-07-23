'use client';
import Script from 'next/script';
import { Check, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import StickyHeader from '../_components/StickyHeader';

export default function UpsellPage() {
   return (
      <div className="min-h-screen bg-[#FDFCF7] flex flex-col">
         <StickyHeader hideButton={true} />

         {/* Alerta importante */}
         <div className="w-[95%] max-w-2xl mx-auto mt-4 bg-[#253725] text-white px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-lg border border-[#74a074]/30 z-50 relative">
            <AlertCircle size={20} className="shrink-0 text-[#D4A373] animate-pulse" />
            <p className="text-[11px] md:text-[13px] font-bold leading-tight tracking-tight">
               <span className="text-[#D4A373] font-black uppercase">IMPORTANTE</span> — No te salgas de esta pestaña. Dale clic al botón de SÍ o NO para continuar y poder entrar a la Bóveda.
            </p>
         </div>

         <main className="flex-1 flex items-start justify-center p-4 md:p-12 overflow-x-hidden relative pt-[20px] md:pt-[40px]">
            {/* Background Subtle Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#74a074]/5 rounded-full blur-[100px]" />
               <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#345334]/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-[#EBE6DD]/50 relative z-10 overflow-hidden flex flex-col items-center">
               
               {/* Content Area */}
               <div className="w-full p-8 md:p-14 bg-white">
                  <div className="flex flex-col items-center text-center">
                     <div className="inline-flex items-center gap-2 bg-[#D4A373]/10 text-[#D4A373] px-4 py-1.5 rounded-full mb-8">
                        <Zap size={14} className="fill-current" />
                        <span className="text-[10px] uppercase font-black tracking-widest">Oferta de un solo paso</span>
                     </div>

                     <h1 className="text-3xl md:text-5xl text-[#253725] font-black mb-6 leading-[1.05]">
                        ¡Tu pedido no está completo!
                     </h1>
                     
                     <p className="text-[#654836] text-sm md:text-lg mb-10 leading-relaxed italic opacity-80 max-w-lg">
                        Complementa tu bóveda de recetas con este <span className="text-[#D4A373] font-bold not-italic font-serif">recurso exclusivo</span> diseñado para ti.
                     </p>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-4 mb-12 max-w-md mx-auto">
                     {[
                        "Beneficio principal del producto",
                        "Segundo beneficio clave",
                        "Tercer beneficio importante",
                        "Recurso exclusivo de Sano & Punto"
                     ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                           <div className="bg-[#D4A373] rounded-full p-1 mt-1 shadow-sm shrink-0">
                              <Check size={14} className="text-white" strokeWidth={3} />
                           </div>
                           <span className="text-[#253725] font-bold text-sm md:text-[16px] leading-tight">{item}</span>
                        </div>
                     ))}
                  </div>

                  {/* HOTMART WIDGET CONTAINER */}
                  <div className="w-full mb-12 bg-[#F9F7F2] rounded-[32px] p-2 border border-[#EBE6DD] shadow-inner relative">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-[#EBE6DD] text-[9px] font-black uppercase tracking-widest text-[#D4A373] whitespace-nowrap">
                        Finalizar Pedido
                     </div>
                     <div id="hotmart-sales-funnel" className="w-full overflow-hidden min-h-[400px]">
                        {/* El widget de Hotmart se montará aquí */}
                        <div className="flex flex-col items-center gap-4 py-12">
                           <div className="w-full h-12 bg-white rounded-xl animate-pulse" />
                           <div className="w-full h-64 bg-white rounded-xl animate-pulse shadow-sm" />
                        </div>
                     </div>
                  </div>

                  {/* Guarantee and Trust */}
                  <div className="max-w-md mx-auto">
                     <div className="flex items-center gap-4 p-5 bg-[#F9F7F2] rounded-2xl border border-[#EBE6DD] mb-8 shadow-sm">
                        <ShieldCheck className="text-[#D4A373] shrink-0" size={28} />
                        <p className="text-[11px] md:text-[12px] text-[#654836] italic tracking-tight uppercase font-bold leading-tight">
                           ACCESO INSTANTÁNEO Y GARANTÍA SANO Y PUNTO DE 15 DÍAS.
                        </p>
                     </div>

                     <div className="flex items-center justify-center gap-2 opacity-30">
                        <AlertCircle size={12} />
                        <p className="text-[9px] text-center text-[#654836] uppercase font-black tracking-tighter">
                           Pago seguro procesado por Hotmart®
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Hotmart Script Integration */}
            <Script 
               src="https://checkout.hotmart.com/lib/hotmart-checkout-elements.js"
               strategy="afterInteractive"
               onLoad={() => {
                  const w = window as any;
                  if (w.checkoutElements) {
                     w.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
                  }
               }}
            />
         </main>
      </div>
   );
}
