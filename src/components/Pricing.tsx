import { Check, X } from "lucide-react";
import { motion } from "motion/react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Pricing Ringan</h2>
          <p className="text-white/60">Pilih paket yang sesuai dengan kebutuhan konten harianmu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="glass p-10 rounded-3xl flex flex-col">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-muted text-sm mb-6">Cocok untuk pemula yang ingin coba-coba.</p>
            <div className="text-3xl font-bold mb-8">Rp 0 <span className="text-sm font-normal text-muted">/selamanya</span></div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-neon-green" /> 3x Generate / hari
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <X className="w-4 h-4" /> Tanpa watermark
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <X className="w-4 h-4" /> Template Premium
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <X className="w-4 h-4" /> Export HD
              </li>
            </ul>

            <button className="w-full py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all border border-white/10">
              Pakai Gratis
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative p-10 rounded-3xl glass text-white flex flex-col border-2 border-neon-green/30 shadow-[0_0_40px_rgba(0,255,65,0.1)]">
            <div className="absolute -top-4 right-8 bg-neon-green text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Paling Populer</div>
            
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-muted text-sm mb-6">Untuk kreator affiliate serius yang ingin cuan maksimal.</p>
            <div className="text-3xl font-bold mb-8">Rp 49.000 <span className="text-sm font-normal text-muted">/bulan</span></div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm font-semibold">
                <Check className="w-4 h-4 text-neon-green" /> Unlimited Generate
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold">
                <Check className="w-4 h-4 text-neon-green" /> Template Viral Premium
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold">
                <Check className="w-4 h-4 text-neon-green" /> Prompt Video AI High Quality
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold">
                <Check className="w-4 h-4 text-neon-green" /> Export HD Tanpa Watermark
              </li>
            </ul>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 65, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-neon-green text-black font-bold"
            >
              Upgrade Pro
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
