'use client';
import { Cookie as CookieIcon } from 'lucide-react';
import LegalLayout from '../_components/LegalLayout';

export default function CookiesPage() {
   return (
      <LegalLayout title="Política de Cookies" icon={CookieIcon}>
         <p className="text-xl font-medium mb-8 italic">Última actualización: Julio 2026</p>
         
         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en su navegador cuando visita nuestro sitio web. Nos ayudan a recordar sus preferencias, gestionar su sesión de acceso y a entender cómo interactúa con nuestro contenido.</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">Cookies que utilizamos</h2>
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse border border-[#253725]/10 rounded-xl overflow-hidden">
                  <thead className="bg-[#345334]/5">
                     <tr>
                        <th className="p-4 font-bold border-b border-[#253725]/10">Cookie / Servicio</th>
                        <th className="p-4 font-bold border-b border-[#253725]/10">Propósito</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="border-b border-[#253725]/5">
                        <td className="p-4 font-bold">recetario_auth_token</td>
                        <td className="p-4">Cookie de sesión necesaria para gestionar el acceso a la Bóveda de Recetas.</td>
                     </tr>
                     <tr className="border-b border-[#253725]/5">
                        <td className="p-4 font-bold">Supabase</td>
                        <td className="p-4">Cookies técnicas necesarias para la autenticación y gestión de la base de datos.</td>
                     </tr>
                     <tr>
                        <td className="p-4 font-bold">Propias</td>
                        <td className="p-4">Cookies técnicas necesarias para la navegación y el funcionamiento correcto del sitio.</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">Aceptación de Cookies</h2>
            <p>El acceso y la navegación por este sitio implican la aceptación automática de nuestra política de cookies y privacidad. Si no está de acuerdo, le recomendamos cerrar la pestaña de su navegador.</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">Cómo gestionar cookies</h2>
            <p>Puede bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador. Tenga en cuenta que eliminar la cookie de sesión (recetario_auth_token) cerrará su sesión en la Bóveda de Recetas.</p>
         </section>
      </LegalLayout>
   );
}
