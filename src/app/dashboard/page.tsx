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
    { id: "airfryer", name: "Recetas en Airfryer", icon: "♨️", color: "bg-[var(--color-sage-100)]" },
    { id: "comidas-rapidas", name: "Comidas Rápidas (Sanas)", icon: "🍔", color: "bg-[var(--color-sand-100)]" },
    { id: "sin-gluten", name: "Sin Gluten", icon: "🌾", color: "bg-[var(--color-sage-200)]" },
    { id: "panaderia", name: "Panadería Sin Gluten", icon: "🍞", color: "bg-[var(--color-sand-200)]" },
    { id: "postres", name: "Postres y Repostería", icon: "🍰", color: "bg-white" },
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

        {/* Cuadrícula de Categorías (2 columnas y recuadros en móviles) */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {categories.map((cat) => {
            return (
              <Link href={`/dashboard/${cat.id}`} key={cat.id} className="group aspect-square md:aspect-auto">
                <div className={`relative h-full flex flex-col justify-between ${cat.color} rounded-3xl md:rounded-[2.5rem] p-4 sm:p-5 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:rotate-1 border-2 border-white/50 shadow-lg hover:shadow-xl`}>
                  
                  {/* Ícono de Fondo Decorativo (solo visible en pantallas más grandes) */}
                  <div className="hidden sm:block absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 text-7xl md:text-9xl opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    {cat.icon}
                  </div>

                  {/* Icono Principal de la tarjeta */}
                  <div className="relative z-10 flex justify-between items-start">
                     <div className="text-3xl md:text-6xl bg-white/40 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center rounded-[1rem] md:rounded-2xl backdrop-blur-sm shadow-sm border border-white flex-shrink-0">
                       {cat.icon}
                     </div>
                  </div>
                  
                  {/* Título de la Categoría */}
                  <div className="relative z-10 mt-2 md:mt-6 flex-grow flex flex-col justify-center md:justify-start">
                    <h3 className="text-[13px] sm:text-base md:text-2xl font-black text-[var(--color-sage-900)] leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                  
                  {/* Botón de Explorar */}
                  <div className="relative z-10 mt-2 md:mt-8 pt-2 md:pt-0">
                    <span className="inline-flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-[var(--color-sage-800)] bg-white/50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-full group-hover:bg-white transition-colors w-max border border-white/60">
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
