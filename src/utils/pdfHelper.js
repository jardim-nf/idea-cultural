// src/utils/pdfHelper.js
import * as pdfjsLib from 'pdfjs-dist';

// --- CORREÇÃO PARA VITE ---
// Forçamos o Vite a encontrar o arquivo do worker localmente
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Carrega o documento
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';

    // Lê página por página
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += `Página ${i}: ${pageText}\n`;
    }

    return fullText;
  } catch (error) {
    console.error("Erro detalhado no pdfHelper:", error);
    throw error; // Joga o erro para a tela tratar
  }
};