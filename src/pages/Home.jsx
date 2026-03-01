import ExpandResearchSection from "../components/ExpandResearchSection"
import FeaturesSection from "../components/FeaturesSection"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import NavBar from "../components/NavBar"
import TrustedInstitutions from "../components/TrustedInstitutions"

export default function Home() {
    return (
        <div className="font-sans text-gray-800 pt-16">
            <NavBar />
            <HeroSection />
            <TrustedInstitutions />
            <FeaturesSection />
            <ExpandResearchSection />
            <Footer />
        </div>
    )
}