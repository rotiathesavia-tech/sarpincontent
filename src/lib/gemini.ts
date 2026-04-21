import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ContentResult {
  hook: string;
  caption: string;
  videoPrompt: string;
  premiumImagePrompt: string;
}

export async function analyzeProduct(base64Image: string, mimeType: string): Promise<ContentResult> {
  const model = "gemini-3-flash-preview";

  const prompt = `Analisis foto produk ini dan buatkan konten affiliate untuk penonton Indonesia:
1. Hook Viral: Buat 3 opsi hook (pancingan) yang sangat menarik untuk video TikTok/Shorts.
2. Caption Jualan: Buat caption jualan yang persuasif, mengajak orang beli, sertakan emoji yang relevan.
3. Prompt Video AI: Buat prompt detail untuk alat video AI (seperti Sora/Veo) untuk membuat video promosi sinematik produk ini.
4. Premium Image Prompt: Buat deskripsi bahasa Inggris detail untuk menghasilkan foto produk "premium" dari produk ini di studio profesional.

Gunakan format JSON yang rapi.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hook: { type: Type.STRING },
          caption: { type: Type.STRING },
          videoPrompt: { type: Type.STRING },
          premiumImagePrompt: { type: Type.STRING }
        },
        required: ["hook", "caption", "videoPrompt", "premiumImagePrompt"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generatePremiumImage(base64Image: string, mimeType: string, prompt: string): Promise<string> {
  // Using gemini-2.5-flash-image for image editing/regeneration
  const model = "gemini-2.5-flash-image";
  
  const editingPrompt = `Transform this product photo into a premium, professional studio shot. 
  Context: ${prompt}. 
  Style: High-end, minimalist, cinematic lighting, sharp focus, clean background, 8k. 
  Keep the original product's key features clearly visible.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: editingPrompt }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Gagal generate gambar premium");
}
