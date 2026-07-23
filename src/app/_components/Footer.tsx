'use client';
import Link from 'next/link';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
   return (
      <footer className="py-[90px] md:py-[100px] bg-[#253725] text-white/60">
         <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20 mb-20">
               <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <div className="text-4xl font-black mb-8 text-white tracking-tighter flex items-center gap-2" style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}>
                     <span>Sano &</span>
                     <span className="italic text-[#74a074]">Punto.</span>
                  </div>
                  <p className="text-lg leading-relaxed mb-10 max-w-md">Tu bóveda de recetas saludables, deliciosas y fáciles de preparar. Alimenta tu cuerpo, simplifica tu cocina.</p>
                  <div className="flex flex-wrap gap-4">
                     {[
                       { Icon: InstagramIcon, href: "https://www.instagram.com/sanoypunto.app", label: "Instagram" },
                       { Icon: TikTokIcon, href: "https://www.tiktok.com/@sanoypuntoo", label: "TikTok" },
                     ].map((social, i) => (
                       <Link 
                         key={i}
                         href={social.href} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         aria-label={`Visitar nuestro perfil de ${social.label}`}
                         className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#253725] transition-all"
                       >
                         <social.Icon className="w-5 h-5" />
                       </Link>
                     ))}
                  </div>
               </div>

               <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Legal</h4>
                  <ul className="space-y-4">
                     <li><Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link></li>
                     <li><Link href="/terminos" className="hover:text-white transition-colors">Términos</Link></li>
                     <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Contacto</h4>
                  <p className="mb-4">¿Dudas? Escríbenos:</p>
                  <a href="mailto:alejo@sanoypunto.app" className="text-white font-bold text-lg">alejo@sanoypunto.app</a>
               </div>
            </div>
            <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-sm">
               <p>© 2026 Sano & Punto. Todos los derechos reservados.</p>
               <p className="italic">Hecho con ♥ para una vida más saludable.</p>
            </div>
         </div>
      </footer>
   );
}
