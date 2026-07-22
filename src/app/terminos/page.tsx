'use client';
import { Scale } from 'lucide-react';
import LegalLayout from '../_components/LegalLayout';

export default function TerminosPage() {
   return (
      <LegalLayout title="Términos de Servicio" icon={Scale}>
         <p className="text-xl font-medium mb-8 italic">Última actualización: Julio 2026</p>
         
         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar este sitio web (&quot;Bóveda de Recetas&quot; de Sano & Punto, disponible en recetas.sanoypunto.app), usted acepta quedar vinculado por estos Términos de Servicio. El acceso a la plataforma implica la aceptación automática de todas las condiciones aquí descritas.</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">2. Descripción del Servicio</h2>
            <p>La Bóveda de Recetas es un servicio de suscripción mensual que ofrece acceso a una colección curada de recetas saludables organizadas por categorías, incluyendo herramientas como descarga en PDF, filtros avanzados y guías de sustitución de ingredientes.</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">3. Propiedad Intelectual</h2>
            <p>Todo el contenido, incluyendo textos, recetas, imágenes, diseños y logotipos, son propiedad exclusiva de Sano & Punto y están protegidos por las leyes de propiedad intelectual internacionales. Queda prohibida su reproducción o distribución sin consentimiento expreso.</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">4. Suscripción y Pagos</h2>
            <p>El acceso a la Bóveda de Recetas requiere una suscripción mensual. Los pagos se realizan a través de plataformas de pago seguras. Sano & Punto no almacena datos de tarjetas de crédito.</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">5. Garantía de Devolución</h2>
            <p>Ofrecemos una garantía de devolución de 30 días desde la fecha de suscripción. Si no estás satisfecho con el servicio, contacta a <a href="mailto:alejo@sanoypunto.app" className="text-[#345334] font-bold underline">alejo@sanoypunto.app</a> para solicitar un reembolso completo.</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">6. Limitación de Responsabilidad</h2>
            <p>Sano & Punto no se hace responsable de los resultados individuales derivados de la aplicación de las recetas, los cuales pueden variar según la pericia del usuario, los ingredientes utilizados y las condiciones particulares de cada persona (alergias, intolerancias, etc.).</p>
         </section>

         <section>
            <h2 className="text-2xl font-serif font-bold text-[#253725] mb-4">7. Modificaciones</h2>
            <p>Sano & Punto se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a los usuarios a través de la plataforma.</p>
         </section>
      </LegalLayout>
   );
}
