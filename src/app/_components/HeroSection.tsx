'use client';
import { useState } from 'react';
import { ArrowRight, Play, ShieldCheck, Lock, Star } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
   const [playVideo, setPlayVideo] = useState(false);

   return (
      <section className="pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] px-6 text-center">
         <div className="max-w-[900px] mx-auto">
            
            {/* 1. Título (Problema + Oferta + Curiosidad) */}
            <h1 className="mb-8 md:mb-10 leading-[1.15] md:leading-tight">
               <span className="block text-[40px] sm:text-[45px] md:text-[60px] lg:text-[75px] text-[#253725] font-sans font-bold tracking-tight">
                  ¿Cansado de pensar qué cocinar todos los días?
               </span>
               <span className="block text-[22px] sm:text-[28px] md:text-[35px] lg:text-[42px] italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#345334] via-[#74a074] to-[#345334] bg-[length:200%_auto] animate-shimmer pb-2 mt-2">
                  Descubre el atajo para comer delicioso <span className="underline decoration-[#D4A373] underline-offset-4">sin estrés</span>.
               </span>
            </h1>

            {/* 2. Video Placeholder / Wistia Embed */}
            <div 
               onClick={() => setPlayVideo(true)}
               className="relative w-full aspect-video bg-white rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl mb-10 group cursor-pointer border border-[#EBE6DD]/20"
            >
               {playVideo ? (
                  <iframe 
                     src="https://fast.wistia.net/embed/iframe/txo1m9954y?autoPlay=true" 
                     title="Wistia video player" 
                     allow="autoplay; fullscreen" 
                     allowTransparency={true}
                     frameBorder="0" 
                     scrolling="no" 
                     className="absolute inset-0 w-full h-full" 
                     width="100%" 
                     height="100%"
                  />
               ) : (
                  <>
                     {/* Fondo simulando video */}
                     <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-700">
                        <Image 
                           src="/vsl_thumbnail.png" 
                           alt="Miniatura de video" 
                           fill 
                           sizes="(max-width: 768px) 100vw, 900px"
                           className="object-cover"
                           priority
                        />
                     </div>
                     
                     {/* Botón Play */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#345334]/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#345334]/30 transition-all duration-300 shadow-xl border border-[#345334]/30">
                           <Play className="text-[#345334] w-8 h-8 md:w-10 md:h-10 ml-2" fill="currentColor" />
                        </div>
                     </div>
                  </>
               )}
            </div>

            {/* 3. Texto corto para aterrizar */}
            <p className="text-lg md:text-2xl text-[#654836] max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
               Accede a la bóveda definitiva. Cientos de recetas saludables en airfryer, sin gluten y más. Come sano y ahorra horas al mes.
            </p>

            {/* 4. Botón CTA Sentimental */}
            <div className="flex flex-col items-center justify-center">
               <a 
                  href="#oferta" 
                  className="bg-[#345334] text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl text-lg md:text-xl font-black shadow-[0_20px_50px_rgba(52,83,52,0.3)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(52,83,52,0.5)] active:scale-95 transition-all flex items-center gap-4 text-center hover:bg-[#253725] uppercase tracking-wide"
               >
                  Quiero comer sano sin perder la cabeza <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
               </a>
            </div>

            {/* Trust bar & Badges */}
            <div className="mt-8 flex flex-col items-center gap-6">
               <div className="flex items-center gap-1 text-[#D4A373]">
                  {[...Array(5)].map((_, i) => (
                     <Star key={i} fill="currentColor" className="w-4 h-4 md:w-5 md:h-5" />
                  ))}
                  <span className="text-[#253725] font-bold text-xs md:text-sm ml-2 opacity-80">+5,000 alumnas felices</span>
               </div>
               
               <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[11px] md:text-sm text-[#654836]/70 font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-[#4A6741]" />
                     <span>30 días de garantía</span>
                  </div>
                  <span className="hidden md:inline text-[#EBE6DD]">•</span>
                  <div className="flex items-center gap-2">
                     <Lock className="w-5 h-5 text-[#4A6741]" />
                     <span>Pago 100% Seguro</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
