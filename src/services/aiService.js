// src/services/aiService.js
import OpenAI from 'openai';

// CONFIGURAÇÃO DA CHAVE (Substitua a string abaixo pela sua chave se necessário)
const openai = new OpenAI({
apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
});

export const analyzeEdital = async (pdfText, projectTitle) => {
  try {
    // Limitamos o texto para economizar tokens e ser mais rápido
    const textToAnalyze = pdfText.substring(0, 20000); 

    const prompt = `
      Você é um especialista em Editais de Cultura (Lei Rouanet, Paulo Gustavo, Aldir Blanc).
      Analise o texto deste edital para o projeto cultural: "${projectTitle}".
      
      Extraia os dados e retorne APENAS um objeto JSON (sem markdown, sem \`\`\`json) com a seguinte estrutura exata:

      {
        "summary": {
          "requirements": (número inteiro: qtd de documentos obrigatórios),
          "risks": (número inteiro: qtd de itens que podem desclassificar),
          "documents": (número inteiro: total de anexos solicitados),
          "deadlines": (número inteiro: qtd de datas/prazos citados)
        },
        "details": {
           "score": (número inteiro de 0 a 100: chance de aprovação baseada na clareza),
           "status": "Aberto"
        },
        "checklist": [
          { "item": "Adequação ao Objeto do Edital", "status": "ok" },
          { "item": "Documentação Jurídica Completa", "status": "pending" },
          { "item": "Orçamento dentro do Teto", "status": "pending" },
          { "item": "Contrapartida Social definida", "status": "pending" },
          { "item": "Cronograma de Execução", "status": "pending" }
        ]
      }

      Texto do Edital (Parcial):
      ${textToAnalyze}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);

  } catch (error) {
    console.error("Erro na IA:", error);
    // Fallback para não quebrar a tela se a IA falhar
    return {
        summary: { requirements: 0, risks: 0, documents: 0, deadlines: 0 },
        details: { score: 0, status: "Erro" },
        checklist: []
    };
  }
};