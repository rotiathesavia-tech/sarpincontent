import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ToolGrid from "./components/ToolGrid";
import ToolSection from "./components/ToolSection";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="atmosphere" />
      <Navbar />
      <Hero />
      <ToolGrid />
      <ToolSection />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
