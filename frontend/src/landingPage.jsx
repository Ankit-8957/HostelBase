import Hero from './landingPage/HeroSection'
import Navbar from './Navbar'
import SetupSteps from './landingPage/SetupStepsSection'
import FeaturesSection from './landingPage/FeatureSection'
import TestimonialSection from './landingPage/TestimonialSection'
import Footer from './footer'
export default function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <SetupSteps />
            <FeaturesSection />
            <TestimonialSection />
            <Footer />
        </>
    );
}