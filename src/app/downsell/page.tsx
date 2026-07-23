'use client';
import Script from 'next/script';
import { Check, ShieldCheck, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import StickyHeader from '../_components/StickyHeader';

export default function DownsellPage() {
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
               <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-[#EBE6DD]/50 relative z-10 overflow-hidden flex flex-col items-center border-t-4 border-t-[#D4A373]">
               
               {/* Content Area */}
               <div className="w-full p-8 md:p-14 bg-white">
                  <div className="flex flex-col items-center text-center">
                     <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 px-4 py-1.5 rounded-full mb-8">
                        <Clock size={14} className="animate-pulse" />
                        <span className="text-[10px] uppercase font-black tracking-widest">Oportunidad Final e Irrepetible</span>
                     </div>

                     <h1 className="text-3xl md:text-5xl text-[#253725] font-black mb-6 leading-[1.05]">
                        ¿Estás seguro de dejar esto atrás?
                     </h1>
                     
                     <p className="text-[#654836] text-sm md:text-lg mb-10 leading-relaxed italic opacity-80 max-w-lg">
                        Si abandonas esta página, este <span className="text-[#D4A373] font-bold not-italic underline decoration-2">recurso exclusivo</span> no volverá a aparecer a este precio especial. <span className="text-[#253725] font-black">Es ahora o nunca.</span>
                     </p>
                  </div>

                  {/* HOTMART WIDGET CONTAINER */}
                  <div className="w-full mb-12 bg-[#F9F7F2] rounded-[32px] p-2 border border-[#EBE6DD] shadow-inner relative">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-[#EBE6DD] text-[9px] font-black uppercase tracking-widest text-[#D4A373] whitespace-nowrap">
                        Última Oportunidad de Compra
                     </div>
                     <div id="hotmart-sales-funnel" className="w-full overflow-hidden min-h-[400px]">
                        {/* El widget de Hotmart se montará aquí */}
                        <div className="flex flex-col items-center gap-4 py-12">
                           <div className="w-full h-12 bg-white rounded-xl animate-pulse" />
                           <div className="w-full h-64 bg-white rounded-xl animate-pulse shadow-sm" />
                        </div>
                     </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-4 mb-12 max-w-md mx-auto">
                     {[
                        "Última oportunidad para acceder a este recurso",
                        "No volverás a ver este contenido a este precio",
                        "Complemento perfecto para tu bóveda de recetas",
                        "Recurso definitivo exclusivo Sano & Punto"
                     ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                           <div className="bg-[#253725]/10 rounded-full p-1 mt-1 shadow-sm shrink-0">
                              <Check size={14} className="text-[#253725]" strokeWidth={3} />
                           </div>
                           <span className="text-[#253725] font-bold text-sm md:text-[16px] opacity-90 leading-tight">{item}</span>
                        </div>
                     ))}
                  </div>

                  {/* Urgency Alert and Trust */}
                  <div className="max-w-md mx-auto">
                     <div className="flex items-center gap-4 p-5 bg-red-50 rounded-2xl border border-red-100 italic mb-8 shadow-sm">
                        <AlertTriangle className="text-red-500 shrink-0" size={28} />
                        <p className="text-[11px] md:text-[12px] text-red-800 tracking-tight uppercase font-black leading-tight">
                           AL CERRAR ESTA VENTANA, LA OFERTA EXPIRA PERMANENTEMENTE.
                        </p>
                     </div>

                     <div className="flex items-center justify-center gap-2 opacity-30">
                        <AlertCircle size={12} />
                        <p className="text-[9px] text-center text-[#654836] uppercase font-black tracking-tighter">
                           Transacción Segura procesada por Hotmart®
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
