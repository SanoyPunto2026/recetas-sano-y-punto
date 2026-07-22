import dynamic from 'next/dynamic';
import StickyHeader from './_components/StickyHeader';
import HeroSection from './_components/HeroSection';

// Non-critical components loaded dynamically for performance
const PainSection = dynamic(() => import('./_components/PainSection'), { ssr: true });
const TransformationSection = dynamic(() => import('./_components/TransformationSection'), { ssr: true });
const VaultsSection = dynamic(() => import('./_components/VaultsSection'), { ssr: true });
const BonusStackSection = dynamic(() => import('./_components/BonusStackSection'), { ssr: true });
const OfferSection = dynamic(() => import('./_components/OfferSection'), { ssr: true });
const FaqSection = dynamic(() => import('./_components/FaqSection'), { ssr: true });
const Footer = dynamic(() => import('./_components/Footer'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      {/* 1. NAVEGACIÓN STICKY */}
      <StickyHeader />

      {/* 2. HERO */}
      <HeroSection />

      {/* 3. BLOQUE DE DOLOR (PAS Framework) */}
      <section className="bg-[linear-gradient(to_bottom,#ebe2d3_0%,#FDFCF7_15%,#FDFCF7_85%,#ebe2d3_100%)] py-[100px]">
        <PainSection />
        <div className="py-8"></div>
        <TransformationSection />
      </section>

      {/* 4. LAS 6 BÓVEDAS */}
      <VaultsSection />

      {/* 5. STACK DE BONOS (Hormozi) */}
      <BonusStackSection />

      {/* 6. OFERTA IRRESISTIBLE */}
      <OfferSection />

      {/* 7. FAQ */}
      <FaqSection />

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
}
