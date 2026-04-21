import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, X, Loader2, Copy, RefreshCw, Send, CheckCircle2, Sparkles, AlertCircle, Video, ShoppingBag, Download, Lock, Crown, ShieldCheck } from "lucide-react";
import { analyzeProduct, generatePremiumImage, ContentResult } from "../lib/gemini";

const USAGE_KEY = 'sarpin_usage_v1';
const FREE_LIMIT = 3;

export default function ToolSection() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ContentResult | null>(null);
  const [premiumImg, setPremiumImg] = useState<string | null>(null);
  const [usage, setUsage] = useState({ count: 0, limitReached: false });
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateUsageState();
  }, []);

  const updateUsageState = () => {
    const today = new Date().toDateString();
    const storage = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}');
    if (storage.date !== today) {
      setUsage({ count: 0, limitReached: false });
    } else {
      setUsage({ count: storage.count, limitReached: storage.count >= FREE_LIMIT });
    }
  };

  const incrementUsage = () => {
    const today = new Date().toDateString();
    const storage = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}');
    const newCount = storage.date === today ? storage.count + 1 : 1;
    localStorage.setItem(USAGE_KEY, JSON.stringify({ date: today, count: newCount }));
    updateUsageState();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang didukung.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setMimeType(file.type);
      setError(null);
      setResults(null);
      setPremiumImg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!image) return;
    if (usage.limitReached) {
      setError("Limit harian tercapai. Ups, upgrade ke Pro untuk unlimited!");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const base64Data = image.split(",")[1];
      const res = await analyzeProduct(base64Data, mimeType);
      setResults(res);
      
      // Secondary step: Generate premium image
      const premium = await generatePremiumImage(base64Data, mimeType, res.premiumImagePrompt);
      setPremiumImg(premium);
      
      incrementUsage();
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat memproses gambar. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const copyAll = () => {
    if (!results) return;
    const allText = `HOOK VIRAL:\n${results.hook}\n\nCAPTION JUALAN:\n${results.caption}\n\nPROMPT VIDEO AI:\n${results.videoPrompt}`;
    copyToClipboard(allText, "Semua Konten");
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllFree = () => {
    if (image) downloadImage(image, 'asli-gratis.png');
    if (premiumImg) downloadImage(premiumImg, 'premium-gratis.png');
  };

  return (
    <section id="upload" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 flex flex-col items-end">
          <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Status Gratis</div>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-3 h-1.5 rounded-full ${i <= (FREE_LIMIT - usage.count) ? 'bg-neon-green shadow-[0_0_8px_rgba(0,255,65,0.5)]' : 'bg-white/10'}`} />
            ))}
          </div>
          <div className="text-[10px] text-muted mt-1">{FREE_LIMIT - usage.count} sisa hari ini</div>
        </div>

        {!results && !loading && (
          <div className="text-center max-w-xl mx-auto py-10">
            <h2 className="font-display text-4xl font-bold mb-4">Mulai Sekarang</h2>
            <p className="text-muted mb-10">Pilih foto produk terbaikmu dan biarkan AI kami bekerja menghasilkan pundi-pundi rupiah.</p>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer aspect-video md:aspect-[21/9] rounded-3xl border-2 border-dashed border-white/10 hover:border-neon-green/50 hover:bg-neon-green/5 transition-all flex flex-col items-center justify-center gap-4 bg-white/[0.02]"
            >
              {image ? (
                <div className="relative w-full h-full p-4">
                  <img src={image} className="w-full h-full object-contain rounded-2xl" alt="Preview" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImage(null); }}
                    className="absolute top-6 right-6 bg-black/80 p-2 rounded-full hover:bg-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-neon-green/20 transition-all">
                    <Upload className="w-8 h-8 text-white/40 group-hover:text-neon-green" />
                  </div>
                  <div>
                    <p className="font-bold">Klik untuk upload foto</p>
                    <p className="text-sm text-white/30">atau drag and drop gambar di sini</p>
                  </div>
                </>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

            {error && <div className="mt-6 flex items-center justify-center gap-2 text-red-400 text-sm bg-red-400/10 py-3 rounded-xl border border-red-400/20">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>}

            <motion.button
              disabled={!image || usage.limitReached}
              whileHover={{ scale: !image || usage.limitReached ? 1 : 1.02, boxShadow: usage.limitReached ? "none" : "0 0 20px rgba(0, 255, 65, 0.4)" }}
              whileTap={{ scale: !image || usage.limitReached ? 1 : 0.98 }}
              onClick={handleGenerate}
              className={`mt-10 w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                ${!image || usage.limitReached 
                  ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                  : 'bg-neon-green text-black'}`}
            >
              <Send className="w-5 h-5 fill-current" />
              Generate Konten
            </motion.button>
          </div>
        )}

        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-neon-green animate-spin mb-8" />
              <div className="absolute inset-0 bg-neon-green/20 blur-2xl animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Sedang Meracik Cuan...</h3>
            <p className="text-white/40">AI kami sedang menganalisis foto dan membuat konten terbaik untukmu.</p>
            <div className="mt-8 flex gap-2">
               <div className="h-1 w-8 rounded-full bg-neon-green/20 overflow-hidden relative">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute inset-0 bg-neon-green"
                  />
               </div>
            </div>
          </div>
        )}

        {results && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="bg-neon-green/10 p-3 rounded-2xl border border-neon-green/30">
                  <CheckCircle2 className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Konten Siap Digunakan!</h3>
                  <p className="text-muted text-sm">Semua elemen konten sudah dioptimasi untuk viral.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={copyAll}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all text-xs font-bold"
                >
                  <Copy className="w-4 h-4" />
                  {copyStatus === "Semua Konten" ? "Tersalin!" : "Copy Semua"}
                </button>
                <button 
                  onClick={downloadAllFree}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all text-xs font-bold"
                >
                  <Download className="w-4 h-4" />
                  Download Gratis
                </button>
                <button 
                  onClick={() => { setResults(null); setImage(null); setPremiumImg(null); }}
                  className="px-4 py-2.5 rounded-xl bg-neon-green text-black font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] text-xs"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Lagi
                </button>
              </div>
            </div>

            <div className="space-y-16">
              {/* Product Preview Grid */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                  <Sparkles className="w-4 h-4 text-neon-green" /> Hasil Visual AI Premium
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Asli Gratis */}
                  <div className="group glass rounded-3xl overflow-hidden border border-white/5 hover:neon-border transition-all flex flex-col bg-black/20">
                    <div className="relative aspect-square">
                      <img src={image!} className="w-full h-full object-cover grayscale-[0.5]" alt="Asli" />
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-white/10 tracking-widest">Asli Gratis</div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Gambar Dasar</span>
                      <button 
                        onClick={() => downloadImage(image!, 'asli-gratis.png')}
                        className="flex items-center gap-2 bg-neon-green text-black px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Premium Gratis */}
                  <div className="group glass rounded-3xl overflow-hidden border border-white/5 hover:neon-border transition-all flex flex-col bg-black/20">
                    <div className="relative aspect-square">
                      {premiumImg ? (
                         <img src={premiumImg} className="w-full h-full object-cover" alt="Premium Gratis" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                           <Loader2 className="w-6 h-6 animate-spin text-neon-green" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-neon-green/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-neon-green/30 tracking-widest text-neon-green">Premium Gratis</div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Latar Estetik</span>
                      <button 
                        disabled={!premiumImg}
                        onClick={() => downloadImage(premiumImg!, 'premium-gratis.png')}
                        className="flex items-center gap-2 bg-neon-green text-black px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Premium Eksklusif */}
                  <div 
                    onClick={() => setShowProModal(true)}
                    className="group glass rounded-3xl overflow-hidden border border-white/5 hover:border-elegant-purple transition-all flex flex-col bg-black/20 cursor-pointer relative"
                  >
                    <div className="relative aspect-square">
                      {premiumImg ? (
                         <img src={premiumImg} className="w-full h-full object-cover blur-xl opacity-40 scale-110" alt="Premium Eksklusif" />
                      ) : (
                        <div className="w-full h-full bg-white/5" />
                      )}
                      <div className="absolute top-4 right-4 bg-elegant-purple/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-elegant-purple/50 tracking-widest text-elegant-purple flex items-center gap-1.5">
                        <Lock className="w-3 h-3" /> Eksklusif
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                          <Crown className="w-6 h-6 text-elegant-purple" />
                        </div>
                        <p className="text-sm font-bold leading-tight">Upgrade Pro untuk<br/>Download HD</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white/[0.02]">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Studio Pro</span>
                      <button 
                        className="flex items-center gap-2 bg-elegant-purple text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform"
                      >
                        Upgrade Pro
                      </button>
                    </div>
                  </div>

                  {/* Card 4: Premium Viral */}
                  <div 
                    onClick={() => setShowProModal(true)}
                    className="group glass rounded-3xl overflow-hidden border border-white/5 hover:border-elegant-purple transition-all flex flex-col bg-black/20 cursor-pointer relative"
                  >
                    <div className="relative aspect-square">
                      {premiumImg ? (
                         <img src={premiumImg} className="w-full h-full object-cover blur-xl opacity-40 grayscale scale-110" alt="Premium Viral" />
                      ) : (
                        <div className="w-full h-full bg-white/5" />
                      )}
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-white/20 tracking-widest text-white/40 flex items-center gap-1.5">
                        <Lock className="w-3 h-3" /> Viral
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md text-neon-green">
                          <Crown className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold leading-tight">Khusus Member Pro</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white/[0.02]">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Cinematic Mode</span>
                      <button 
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform"
                      >
                        Buka Pro
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Prompt Video AI */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                      <Video className="w-4 h-4" /> Prompt Video AI (Veo/Sora)
                    </div>
                    <button onClick={() => copyToClipboard(results.videoPrompt, "Video Prompt")} className="text-neon-green hover:opacity-70 transition-opacity">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                    <p className="text-sm text-white/70 italic leading-relaxed">"{results.videoPrompt}"</p>
                    {copyStatus === "Video Prompt" && <div className="text-[10px] text-neon-green text-right">Tersalin!</div>}
                  </div>
                </div>

                {/* Viral Hook */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                      <Sparkles className="w-4 h-4" /> Viral Hook (Headlines)
                    </div>
                    <button onClick={() => copyToClipboard(results.hook, "Hook")} className="text-neon-green hover:opacity-70 transition-opacity">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 rounded-3xl bg-neon-green/5 border border-neon-green/20 text-white leading-relaxed whitespace-pre-wrap">
                    {results.hook}
                  </div>
                  {copyStatus === "Hook" && <div className="text-[10px] text-neon-green text-right">Tersalin!</div>}
                </div>

                {/* Caption */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                      <ShoppingBag className="w-4 h-4" /> Caption Jualan Affiliate
                    </div>
                    <button onClick={() => copyToClipboard(results.caption, "Caption")} className="text-neon-green hover:opacity-70 transition-opacity">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 text-white/80 leading-relaxed whitespace-pre-wrap text-sm">
                    {results.caption}
                  </div>
                  {copyStatus === "Caption" && <div className="text-[10px] text-neon-green text-right text-sm">Tersalin!</div>}
                  {copyStatus === "Semua Konten" && <div className="text-[10px] text-neon-green text-center font-bold">Semua konten sudah tersalin ke clipboard!</div>}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Pro Modal */}
      <AnimatePresence>
        {showProModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass w-full max-w-lg p-10 rounded-[2.5rem] border-elegant-purple/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(139,92,246,0.2)]"
            >
              <button 
                onClick={() => setShowProModal(false)}
                className="absolute top-8 right-8 text-white/20 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-elegant-purple/20 flex items-center justify-center mb-8 border border-elegant-purple/30">
                  <Crown className="w-10 h-10 text-elegant-purple" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Upgrade ke Sarpin Pro</h3>
                <p className="text-muted mb-10 text-lg">Dapatkan 2 gambar premium tambahan + export kualitas HD + unlimited generate harian.</p>
                
                <div className="grid grid-cols-1 gap-4 w-full mb-10">
                  <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 text-left border border-white/5">
                    <ShieldCheck className="w-6 h-6 text-neon-green" />
                    <div>
                      <h4 className="font-bold text-sm">Tanpa Watermark</h4>
                      <p className="text-xs text-white/40">Hasil bersih tanpa logo Sarpin.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 text-left border border-white/5">
                    <Sparkles className="w-6 h-6 text-elegant-purple" />
                    <div>
                      <h4 className="font-bold text-sm">4x Variasi AI</h4>
                      <p className="text-xs text-white/40">Dapatkan pilihan visual lebih banyak.</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const el = document.getElementById('pricing');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                      setShowProModal(false);
                    }
                  }}
                  className="w-full py-5 rounded-2xl bg-elegant-purple text-white font-extrabold text-lg shadow-xl"
                >
                  Upgrade Sekarang
                </motion.button>
                <p className="mt-6 text-[10px] uppercase tracking-widest text-white/20 font-bold">Mulai dari Rp 1.600 / hari</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
