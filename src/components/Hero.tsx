import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center text-center">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-green/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-elegant-purple/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-white/60 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-neon-green" />
          <span>AI Konten Affiliate No. 1 Indonesia</span>
        </div>
        
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
          Bikin Konten Affiliate <br />
          <span className="neon-text italic">
            Dalam Hitungan Detik
          </span>
        </h1>
        
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload foto produk lalu dapatkan gambar estetik, hook viral, caption jualan, dan prompt video otomatis secara instan.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 65, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={scrollToUpload}
          className="group relative inline-flex items-center gap-3 bg-neon-green text-black px-8 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all"
        >
          <span>Mulai Gratis Sekarang</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
}
