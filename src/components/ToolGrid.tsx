import { motion } from "motion/react";
import { Image, MessageSquareQuote, ShoppingBag, Video } from "lucide-react";

const tools = [
  {
    id: 1,
    title: "Generate Image",
    description: "Ubah foto biasa jadi foto produk premium kelas studio.",
    icon: Image,
    accent: "border-[#00FF41]"
  },
  {
    id: 2,
    title: "Hook Generator",
    description: "Buat hook yang bikin orang berhenti scroll di TikTok/Reels.",
    icon: MessageSquareQuote,
    accent: "border-[#8B5CF6]"
  },
  {
    id: 3,
    title: "Caption Jualan",
    description: "Caption persuasif yang mendorong klik & beli sekarang juga.",
    icon: ShoppingBag,
    accent: "border-[#8B5CF6]"
  },
  {
    id: 4,
    title: "Prompt Video AI",
    description: "Prompt siap pakai untuk tools Veo, Sora, atau Runway.",
    icon: Video,
    accent: "border-[#00FF41]"
  }
];

export default function ToolGrid() {
  return (
    <section id="tools" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-bold mb-4">Dashboard Ajaib</h2>
        <p className="text-muted">Semua yang kamu butuhkan untuk viral di TikTok & Shopee Video</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, idx) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 0 30px rgba(0, 255, 65, 0.05)" }}
            className={`group relative p-8 rounded-3xl glass border-l-4 ${tool.accent} transition-all overflow-hidden`}
          >
            <div className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-neon-green/10 transition-all">
              <tool.icon className="w-6 h-6 text-white group-hover:text-neon-green transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold mb-3 tracking-tight">{tool.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{tool.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
