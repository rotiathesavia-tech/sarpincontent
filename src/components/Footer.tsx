import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="space-y-4 max-w-sm text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="bg-gradient-to-br from-neon-green to-elegant-purple w-8 h-8 rounded-lg" />
            <span className="font-display font-bold text-xl tracking-tighter">Sarpin<span className="neon-text">Content</span></span>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Partner AI andalan kreator affiliate Indonesia. Konten Jadi, Cuan Datang. Tanpa ribet, kualitas premium.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h4 className="font-bold text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#tools" className="hover:neon-text transition-colors">Tools</a></li>
              <li><a href="#pricing" className="hover:neon-text transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:neon-text transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm">Status</h4>
            <div className="flex items-center text-xs text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green mr-2 animate-pulse"></span>
              Sistem Aktif
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-[0.2em] text-muted">
        © {new Date().getFullYear()} SarpinContent. Crafted for the Affiliate Revolution. Indonesia.
      </div>
    </footer>
  );
}
