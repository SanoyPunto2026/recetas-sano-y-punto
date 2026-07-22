'use client';
import { ShieldCheck } from 'lucide-react';
import LegalLayout from '../_components/LegalLayout';

export default function PrivacidadPage() {
   return (
      <LegalLayout title="Política de Privacidad" icon={ShieldCheck}>
         <p className="text-xl font-medium mb-8 italic">Última actualización: Julio 2026</p>
         
         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">1. Responsable del Tratamiento</h2>
            <p>Sano & Punto, con correo electrónico de contacto alejo@sanoypunto.app, es responsable del tratamiento de sus datos personales recolectados a través de este sitio web (recetas.sanoypunto.app).</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">2. Datos Recolectados</h2>
            <p>Recopilamos información necesaria para la gestión comercial y técnica, incluyendo:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
               <li>Datos de navegación (vía cookies).</li>
               <li>Correos electrónicos proporcionados durante el proceso de inicio de sesión.</li>
               <li>Información de uso dentro de la plataforma de recetas.</li>
            </ul>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">3. Finalidad del Tratamiento</h2>
            <p>Sus datos son utilizados para:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
               <li>Gestionar el acceso a la Bóveda de Recetas.</li>
               <li>Mejorar la experiencia del usuario y el rendimiento del sitio.</li>
               <li>Enviar comunicaciones relacionadas con el servicio contratado.</li>
            </ul>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">4. Base Legal y GDPR</h2>
            <p>El tratamiento de sus datos se basa en el interés legítimo de mejora del servicio y en el cumplimiento de la normativa europea de protección de datos (RGPD). Al utilizar nuestro servicio, usted acepta este tratamiento.</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">5. Derechos del Usuario</h2>
            <p>Usted tiene derecho a acceder, rectificar o suprimir sus datos en cualquier momento enviando un correo a <a href="mailto:alejo@sanoypunto.app" className="text-[#345334] font-bold underline">alejo@sanoypunto.app</a>.</p>
         </section>
      </LegalLayout>
   );
}
