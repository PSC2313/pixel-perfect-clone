import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PainCardsSection from "@/components/PainCardsSection";
import RoadmapSection from "@/components/RoadmapSection";

import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PainCardsSection />
      <RoadmapSection />
      
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
