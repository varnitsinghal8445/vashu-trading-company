import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/home/Hero';
import ServicesSection from '../components/home/ServicesSection';
import PhotographerShowcase from '../components/home/PhotographerShowcase';
import ProductsSection from '../components/home/ProductsSection';
import HowItWorks from '../components/home/HowItWorks';
import JourneySection from '../components/home/JourneySection';
import ReviewsSection from '../components/home/ReviewsSection';
import FamilyTeamSection from '../components/home/FamilyTeamSection';
import CinematicCTA from '../components/home/CinematicCTA';

const Home = () => {
  return (
    <PageWrapper className="pt-0">
      <Hero />
      <ServicesSection />
      <PhotographerShowcase />
      <ProductsSection />
      <HowItWorks />
      <JourneySection />
      <FamilyTeamSection />
      <ReviewsSection />
      <CinematicCTA />
    </PageWrapper>
  );
};

export default Home;
