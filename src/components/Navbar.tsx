import { motion } from "motion/react";
import { Zap } from "lucide-react";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-8 md:gap-12 max-w-4xl w-full justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-neon-green p-1.5 rounded-lg shadow-[0_0_10px_rgba(57,255,20,0.5)]">
            <Zap className="w-5 h-5 text-black fill-current" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Sarpin<span className="text-neon-green">Content</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button onClick={() => scrollTo('home')} className="neon-text transition-colors">Home</button>
          <button onClick={() => scrollTo('tools')} className="text-white/70 hover:text-white transition-colors">Tools</button>
          <button onClick={() => scrollTo('pricing')} className="text-white/70 hover:text-white transition-colors">Pricing</button>
          <button onClick={() => scrollTo('faq')} className="text-white/70 hover:text-white transition-colors">FAQ</button>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 65, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo('upload')}
          className="bg-neon-green text-black px-5 py-2 rounded-full text-xs font-bold transition-all"
        >
          Coba Gratis
        </motion.button>
      </div>
    </nav>
  );
}
