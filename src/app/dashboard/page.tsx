"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [userPermissions] = useState({
    "airfryer": true, 
    "sin-gluten": true, 
    "panaderia": true, 
    "postres": true, 
    "comidas-rapidas": true,
    "fridge-filter": true, 
    "grocery-list": true   
  });

  const categories = [
    { 
      id: "airfryer", 
      name: "Recetas en Airfryer", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-24 md:h-24 text-orange-500 drop-shadow-sm transition-transform duration-500 group-hover:scale-110"><rect x="5" y="4" width="14" height="16" rx="3" /><path d="M5 11h14" /><path d="M10 14h4v3h-4z" /><circle cx="12" cy="7.5" r="1.5" /></svg>, 
      color: "bg-gradient-to-br from-white to-[var(--color-sage-50)]",
      textColor: "text-[var(--color-sage-950)]"
    },
    { 
      id: "comidas-rapidas", 
      name: "Comidas Rápidas (Sanas)", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-24 md:h-24 text-rose-500 drop-shadow-sm transition-transform duration-500 group-hover:scale-110"><path d="M4 10a8 8 0 0 1 16 0H4z" /><rect x="3" y="12" width="18" height="2" rx="1" /><path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1H4z" /></svg>, 
      color: "bg-gradient-to-br from-white to-[var(--color-sage-50)]",
      textColor: "text-[var(--color-sage-950)]"
    },
    { 
      id: "sin-gluten", 
      name: "Sin Gluten", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-24 md:h-24 text-emerald-500 drop-shadow-sm transition-transform duration-500 group-hover:scale-110"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><path d="M12 18V8" /><path d="M12 12l-3-3" /><path d="M12 10l3-3" /><path d="M12 14l-3-3" /></svg>, 
      color: "bg-gradient-to-br from-white to-[var(--color-sage-50)]",
      textColor: "text-[var(--color-sage-950)]"
    },
    { 
      id: "panaderia", 
      name: "Panadería Sin Gluten", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-24 md:h-24 text-amber-600 drop-shadow-sm transition-transform duration-500 group-hover:scale-110"><path d="M6 7c0-2.8 2-5 6-5s6 2.2 6 5v2H6V7z" /><path d="M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9z" /><path d="M9 5l-1 2" /><path d="M12 4l-1 3" /><path d="M15 5l-1 2" /></svg>, 
      color: "bg-gradient-to-br from-white to-[var(--color-sage-50)]",
      textColor: "text-[var(--color-sage-950)]"
    },
    { 
      id: "postres", 
      name: "Postres y Repostería", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-24 md:h-24 text-fuchsia-500 drop-shadow-sm transition-transform duration-500 group-hover:scale-110"><path d="M6 14h12l-1.5 7H7.5L6 14z" /><path d="M6 14C4 14 3 12.5 4 11c-.5-2 1.5-3 3-2.5 1-2 4-2 5 0 1-2 4-2 5 0 1.5-.5 3.5.5 3 2.5 1 1.5 0 3-2 3H6z" /><circle cx="12" cy="4" r="2" /></svg>, 
      color: "bg-gradient-to-br from-white to-[var(--color-sage-50)]",
      textColor: "text-[var(--color-sage-950)]"
    },
    { 
      id: "mediterranea", 
      name: "Cocina Mediterránea", 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-24 md:h-24 text-cyan-500 drop-shadow-sm transition-transform duration-500 group-hover:scale-110"><path d="M3 13a9 9 0 0 0 18 0H3z" /><path d="M12 13V5c2 0 4 2 4 4s-2 2-4 2z" /><path d="M8 7v6" /><path d="M7 7v3" /><path d="M9 7v3" /></svg>, 
      color: "bg-gradient-to-br from-white to-[var(--color-sage-50)]",
      textColor: "text-[var(--color-sage-950)]"
    },
  ];

  const [searchInput, setSearchInput] = useState("");

  const clearSearch = () => {
    setSearchInput("");
  };

  const BrandLogo = () => (
    <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
      <circle cx="512" cy="512" r="512" fill="#3F683F"/>
      <g transform="translate(256, 256) scale(21.33)">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 22c0-3 1-5 4-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );

  return (
    <div className="min-h-screen pb-20">
      <header className="glass sticky top-0 z-20 border-b border-white/40 shadow-sm bg-white/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <h1 className="text-xl sm:text-2xl font-black text-gradient mt-1">Sano y Punto</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold opacity-60 hover:opacity-100 transition">Salir</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 flex justify-between items-end">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--color-sage-950)] tracking-tight">Mi Bóveda de Recetas</h2>
        </div>

        {/* Cuadrícula de Categorías */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => {
            return (
              <Link href={`/dashboard/${cat.id}`} key={cat.id} className="group aspect-[4/5] md:aspect-auto">
                <div className={`relative h-full flex flex-col items-center justify-center text-center ${cat.color} rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 transition-all duration-300 hover:scale-[1.05] hover:-translate-y-2 border border-white/60 shadow-lg hover:shadow-2xl gap-4 md:gap-6 overflow-hidden`}>
                  
                  {/* Decorative Background Blob */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/30 rounded-full blur-xl -ml-8 -mb-8 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>

                  {/* Icono Principal de la tarjeta */}
                  <div className="relative z-10 flex items-center justify-center">
                     {cat.icon}
                  </div>
                  
                  {/* Título de la Categoría */}
                  <div className="relative z-10 flex-grow flex flex-col justify-center">
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${cat.textColor} leading-tight drop-shadow-sm px-2`}>
                      {cat.name}
                    </h3>
                  </div>
                  
                  {/* Botón de Explorar */}
                  <div className="relative z-10 mt-auto">
                    <span className={`inline-flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest ${cat.textColor} bg-white/80 px-5 md:px-6 py-2.5 md:py-3 rounded-full group-hover:bg-white transition-colors w-max border border-white shadow-sm`}>
                      Explorar <span className="hidden sm:inline">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </main>
    </div>
  );
}
