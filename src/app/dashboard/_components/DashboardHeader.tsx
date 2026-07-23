"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export default function DashboardHeader({ backUrl }: { backUrl?: string }) {
  const handleLogout = () => {
    document.cookie = "recetario_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 md:top-4 w-full md:w-[95%] max-w-5xl mx-auto z-50 md:mb-6">
       <div className="bg-white/80 md:bg-white/60 backdrop-blur-xl border-b md:border border-white/40 md:border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.04)] md:shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:rounded-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
             {backUrl && (
                <Link href={backUrl} className="text-[#4A6741] hover:text-[#253725] mr-1 md:mr-2 font-black text-xl md:text-2xl transition-colors">
                  ←
                </Link>
             )}
             <Link href="/dashboard" className="flex items-center gap-3">
               <div className="w-10 h-10 md:w-14 md:h-14 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-black/10 shrink-0">
                  <Leaf className="text-[#4A6741] w-5 h-5 md:w-6 md:h-6" />
               </div>
               <div className="flex flex-col leading-none">
                  <div className="font-montserrat text-xl md:text-3xl font-black tracking-tighter text-[#1A1C1A] flex items-center gap-1">
                     <span>Sano &</span>
                     <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#4A6741] to-[#8B7355]">Punto.</span>
                  </div>
               </div>
             </Link>
          </div>
          
          <div className="flex items-center">
             <button 
                onClick={handleLogout}
                className="text-sm font-bold text-[#345334] opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 transition-all bg-[#345334]/10 px-4 py-2 rounded-full border border-white/60 shadow-sm"
             >
                Salir
             </button>
          </div>
       </div>
    </nav>
  );
}
