'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LegalLayout({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
   return (
      <div className="min-h-screen bg-[#FDFCF7] py-20 px-6">
         <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-[#654836] hover:text-[#253725] transition-colors mb-12">
               <ArrowLeft size={20} /> Volver a la landing
            </Link>
            
            <div className="flex items-center gap-4 mb-12">
               <div className="w-16 h-16 bg-[#345334]/10 rounded-2xl flex items-center justify-center text-[#345334]">
                  <Icon size={32} />
               </div>
               <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#253725]">{title}</h1>
            </div>

            <div className="max-w-none text-[#253725] font-medium leading-relaxed space-y-10">
               {children}
            </div>
            
            <div className="mt-20 pt-10 border-t border-[#253725]/10 text-center text-[#654836] text-sm">
               © 2026 Sano & Punto. Todos los derechos reservados.
            </div>
         </div>
      </div>
   );
}
