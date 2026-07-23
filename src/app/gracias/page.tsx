import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import StickyHeader from '../_components/StickyHeader';

export default function GraciasPage() {
   return (
      <div className="min-h-screen bg-[#FDFCF7] flex flex-col">
         <StickyHeader hideButton={true} />
         
         <main className="flex-1 flex items-center justify-center py-32 px-6">
            <div className="max-w-[600px] w-full bg-white rounded-[40px] p-8 md:p-12 text-center shadow-xl border border-[#EBE6DD]">
               <div className="w-20 h-20 bg-[#345334]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-[#345334]" />
               </div>
               
               <h1 className="text-3xl md:text-5xl font-sans font-bold text-[#253725] mb-4 tracking-tight">
                  ¡Gracias por tu compra!
               </h1>
               
               <p className="text-[#654836] text-lg md:text-xl mb-8 leading-relaxed">
                  Tu acceso ha sido confirmado. En breve recibirás un correo electrónico con todos los detalles de tu compra.
               </p>

               <div className="bg-[#F9F7F2] rounded-3xl p-6 mb-8 border border-[#EBE6DD]/60">
                  <p className="text-sm md:text-base text-[#654836] mb-6">
                     Ya puedes acceder a la Bóveda de Recetas desde nuestra plataforma. Haz clic en el botón de abajo para iniciar sesión.
                  </p>
                  
                  <Link 
                     href="https://recetas.sanoypunto.app/login"
                     className="bg-[#345334] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-[0_15px_30px_rgba(52,83,52,0.2)] hover:shadow-[0_20px_40px_rgba(52,83,52,0.3)] hover:bg-[#253725] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 w-full justify-center"
                  >
                     Iniciar Sesión <ArrowRight size={20} />
                  </Link>
               </div>
               
               <p className="text-xs text-[#654836]/60 italic">
                  Si no recibes el correo en los próximos 5 minutos, revisa tu carpeta de spam o comunícate con nuestro equipo de soporte.
               </p>
            </div>
         </main>
      </div>
   );
}
