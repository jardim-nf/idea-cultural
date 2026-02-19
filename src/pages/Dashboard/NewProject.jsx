// src/pages/Dashboard/NewProject.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, UploadCloud, FileText, CheckCircle, 
  AlertCircle, Sparkles, X, ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { extractTextFromPDF } from '../../utils/pdfHelper';
import { analyzeEdital } from '../../services/aiService';

export default function NewProject() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [proponent, setProponent] = useState('');
  const [editalFile, setEditalFile] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingText, setLoadingText] = useState("Iniciando...");

  const handleEditalUpload = (e) => {
    const file = e.target.files[0];
    if (file) setEditalFile(file);
  };

  const handleAnalyze = async () => {
    if (!title || !editalFile) return;

    setIsAnalyzing(true);
    
    try {
      // 1. LER O ARQUIVO
      setLoadingText("Extraindo texto do PDF...");
      const pdfText = await extractTextFromPDF(editalFile);

      // 2. ENVIAR PARA IA
      setLoadingText("A IA está identificando requisitos e riscos...");
      const aiResult = await analyzeEdital(pdfText, title);

      // 3. PREPARAR DADOS PARA SALVAR
      const newProject = {
        id: Date.now(), // ID único baseado no tempo
        title: title,
        proponent: proponent,
        law: "Lei Paulo Gustavo / Rouanet", // Padrão ou detectado pela IA
        status: "Analisado",
        date: new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        analysis: aiResult
      };

      // 4. SALVAR NO "BANCO DE DADOS" (LocalStorage)
      // Salva o projeto atual para a tela de análise detalhada
      localStorage.setItem('projectData', JSON.stringify({ analysis: aiResult, title: title }));

      // Salva na lista geral para o Dashboard
      const existingProjects = JSON.parse(localStorage.getItem('projectsList') || '[]');
      const updatedList = [newProject, ...existingProjects];
      localStorage.setItem('projectsList', JSON.stringify(updatedList));

      // 5. SUCESSO
      setIsAnalyzing(false);
      setIsSuccess(true);
      
      // Redireciona
      setTimeout(() => {
        navigate('/project/analysis');
      }, 2000);

    } catch (error) {
      console.error("Erro no processo:", error);
      alert("Erro ao ler PDF ou conectar com a IA.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center sticky top-0 z-20 shadow-sm">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-blue-900 transition mr-4">
          <ArrowLeft size={20} /> Voltar
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
          Criar Novo Projeto <span className="text-purple-600 font-normal">Cultural</span>
        </h1>
      </header>

      <main className="max-w-3xl mx-auto p-6 mt-6">
        
        {/* TELA DE LOADING */}
        {isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-purple-100 animate-fade-in flex flex-col items-center">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-purple-500 animate-pulse" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Analisando Edital...</h2>
            <div className="bg-purple-50 text-purple-700 px-6 py-2 rounded-full font-medium animate-pulse">
              {loadingText}
            </div>
          </div>
        )}

        {/* TELA DE SUCESSO */}
        {isSuccess && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-emerald-100 animate-fade-in scale-100">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-emerald-500 w-12 h-12 drop-shadow-lg" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Projeto Salvo!</h2>
            <p className="text-gray-500 mb-6">Seu projeto já está disponível no Dashboard.</p>
          </div>
        )}

        {/* FORMULÁRIO */}
        {!isAnalyzing && !isSuccess && (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="font-bold text-gray-800">Informações Básicas</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Título do Projeto</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-purple-500 transition" placeholder="Ex: Festival de Teatro 2026"/>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Nome do Proponente</label>
                    <input type="text" value={proponent} onChange={(e) => setProponent(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-purple-500 transition" placeholder="Ex: Maria Silva"/>
                  </div>
                </div>
             </div>

             <div className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition ${editalFile ? 'border-emerald-400 bg-emerald-50' : 'border-dashed border-gray-300 hover:border-purple-300'}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
                    <h3 className="font-bold text-gray-800">Edital Principal *</h3>
                  </div>
                  {editalFile && <button onClick={() => setEditalFile(null)}><X size={20} className="text-gray-400 hover:text-red-500"/></button>}
                </div>
                
                {!editalFile ? (
                  <label className="cursor-pointer flex flex-col items-center py-8">
                    <UploadCloud className="w-12 h-12 text-purple-400 mb-2" />
                    <p className="text-sm font-medium text-gray-600">Clique para selecionar o edital (PDF)</p>
                    <input type="file" className="hidden" accept=".pdf" onChange={handleEditalUpload} />
                  </label>
                ) : (
                  <div className="flex items-center gap-3 text-emerald-700 font-medium">
                    <FileText /> {editalFile.name} <CheckCircle size={16} />
                  </div>
                )}
             </div>

             <button 
                onClick={handleAnalyze}
                disabled={!title || !editalFile}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1 ${
                  title && editalFile ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {title && editalFile ? '✨ Analisar e Salvar' : 'Preencha para liberar'}
             </button>
          </div>
        )}
      </main>
    </div>
  );
}