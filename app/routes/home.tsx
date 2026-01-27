import Hero from '../components/LandingPage';
import Features from '../components/Features';
import FeaturedLecturers from '~/components/lectures';
import MeetTheHOD from '~/components/metheHOD';
import PresidentPortfolio from '~/components/DetpPresident';
import Footer from '~/components/footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedLecturers />
      <MeetTheHOD />
      <PresidentPortfolio />
      <Footer />
    </>
  );
}
