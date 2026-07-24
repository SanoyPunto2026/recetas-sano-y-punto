'use client';
import { motion } from 'framer-motion';

const recipes = [
   { name: "Pollo a la Parmesana Airfryer", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=70&w=400&auto=format&fit=crop" },
   { name: "Pizza con Base de Coliflor", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=70&w=400&auto=format&fit=crop" },
   { name: "Pasta Shirataki al Pesto", img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=70&w=400&auto=format&fit=crop" },
   { name: "Brownie Sin Azúcar", img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=70&w=400&auto=format&fit=crop" },
   { name: "Ensalada Mediterránea", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=70&w=400&auto=format&fit=crop" },
];

export default function RecipeCarouselSection() {
   const marqueeItems = [...recipes, ...recipes];

   return (
      <section className="py-[60px] md:py-[70px] bg-white overflow-hidden border-t border-b border-[#F0F0F0]">
         <div className="max-w-[1240px] mx-auto px-6 text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-[#253725]">
               Un vistazo a lo que cocinarás...
            </h2>
         </div>

         <div className="relative w-full flex items-center">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <motion.div
               className="flex gap-4 w-max px-6"
               animate={{ x: ["0%", "-50%"] }}
               transition={{
                  ease: "linear",
                  duration: 30,
                  repeat: Infinity,
               }}
            >
               {marqueeItems.map((recipe, i) => (
                  <div key={i} className="relative w-[260px] h-[300px] rounded-3xl overflow-hidden shadow-lg group shrink-0">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img 
                        src={recipe.img} 
                        alt={recipe.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        loading="lazy" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                     <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h4 className="text-white font-bold text-xl leading-tight">{recipe.name}</h4>
                     </div>
                  </div>
               ))}
            </motion.div>
         </div>
      </section>
   );
}
