import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "Perlu login untuk pakai SarpinContent?",
    answer: "Tidak perlu. Kamu bisa langsung upload foto dan generate konten secara instan. Kami menggunakan penyimpanan lokal browser untuk melacak penggunaan gratis harianmu."
  },
  {
    question: "Apakah tools ini gratis?",
    answer: "Kami memberikan 3x percobaan gratis setiap hari untuk setiap pengguna. Jika ingin tanpa batas, kamu bisa upgrade ke paket Pro."
  },
  {
    question: "Siapa target pengguna SarpinContent?",
    answer: "Sangat cocok untuk Affiliate Marketer (TikTok/Shopee), Online Seller, UMKM, dan Content Creator yang butuh efisiensi waktu."
  },
  {
    question: "Bisa dibuka di Handphone?",
    answer: "Tentu saja! SarpinContent didesain mobile-responsive sehingga kamu bisa bikin konten langsung dari HP sambil santai."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="font-display text-4xl font-bold mb-12 text-center">Sering Ditanyakan</h2>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string, key?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 bg-card-bg rounded-3xl overflow-hidden hover:border-white/10 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between"
      >
        <span className="font-bold">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-neon-green" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
