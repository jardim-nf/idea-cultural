// src/pages/Dashboard/ProjectAnalysis.jsx
import React, { useEffect, useState } from 'react';
import { 
  FileText, CheckSquare, DollarSign, Briefcase, 
  Files, MessageSquare, AlertTriangle, Calendar, CheckCircle, 
  AlertCircle, RefreshCw, Eye, BarChart2, AlertOctagon, Grid, Sparkles, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectAnalysis() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  // Busca dados salvos pela IA
  useEffect(() => {
    const savedData = localStorage.getItem('projectData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setData(parsed.analysis); 
    } else {
      navigate('/new-project'); // Segurança
    }
  }, [navigate]);

  if (!data) return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400">Carregando análise...</p>
        </div>
    </div>
  );

  // --- CORES DARK MODE ---
  // Adaptamos as cores para brilharem no fundo escuro (bg-opacity-10 e textos claros)
  const cards = [
    { 
        label: "Requisitos Críticos", 
        value: data.summary.requirements, 
        color: "bg-red-500/10", 
        textColor: "text-red-400", 
        border: "border-red-500/20",
        glow: "shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]"
    },
    { 
        label: "Riscos Alto/Crítico", 
        value: data.summary.risks, 
        color: "bg-orange-500/10", 
        textColor: "text-orange-400", 
        border: "border-orange-500/20",
        glow: "shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]"
    },
    { 
        label: "Documentos", 
        value: data.summary.documents, 
        color: "bg-emerald-500/10", 
        textColor: "text-emerald-400", 
        border: "border-emerald-500/20",
        glow: "shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
    },
    { 
        label: "Prazos", 
        value: data.summary.deadlines, 
        color: "bg-blue-500/10", 
        textColor: "text-blue-400", 
        border: "border-blue-500/20",
        glow: "shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]"
    },
  ];

  const secondaryCards = [
    { label: "Score IA", value: data.details.score, icon: CheckCircle, color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10" },
    { label: "Status", value: data.details.status, icon: BarChart2, color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10" },
    { label: "Alertas", value: data.summary.risks, icon: AlertTriangle, color: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/10" },
    { label: "Anexos", value: data.summary.documents, icon: Grid, color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] font-sans text-white pb-20 overflow-x-hidden relative">
      
      {/* Efeitos de Fundo (Glow) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Menu Superior Sticky */}
      <div className="border-b border-white/10 sticky top-0 z-20 bg-[#0B1120]/80 backdrop-blur-md px-4 pt-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto pb-4 hide-scrollbar">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-500/20 whitespace-nowrap border border-white/10">
            <Sparkles size={18} className="text-purple-200" /> Análise IA
          </button>
          {[
            { id: 'texto', label: 'Texto Base', icon: FileText },
            { id: 'revisao', label: 'Revisão', icon: CheckSquare },
            { id: 'orcamento', label: 'Orçamento', icon: DollarSign },
          ].map((tab) => (
            <button key={tab.id} className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition whitespace-nowrap font-medium">
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-1 cursor-pointer hover:text-emerald-400 transition" onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={16} className="text-slate-500"/> <span className="text-xs text-slate-500 font-medium">Voltar ao painel</span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              Resumo Executivo <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30 flex items-center gap-1"><Sparkles size={12}/> Gerado por IA</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2">
                Análise estratégica baseada no edital enviado.
            </p>
          </div>
          <button onClick={() => navigate('/new-project')} className="text-sm text-slate-300 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 font-medium flex items-center gap-2 hover:bg-white/10 hover:border-emerald-500/50 hover:text-emerald-400 transition">
             <RefreshCw size={16} /> Novo Upload
          </button>
        </div>

        {/* Linha 1: Cards Grandes (Glassmorphism + Neon) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className={`${card.color} ${card.border} ${card.glow} backdrop-blur-sm border p-6 rounded-2xl flex flex-col justify-between h-36 transition hover:-translate-y-1`}>
              <p className={`${card.textColor} font-bold text-sm uppercase tracking-wide opacity-90`}>{card.label}</p>
              <p className={`text-5xl font-bold ${card.textColor} drop-shadow-sm`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Linha 2: Cards Secundários */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {secondaryCards.map((card, idx) => (
             <div key={idx} className={`bg-white/5 border border-white/10 backdrop-blur-sm p-5 rounded-2xl flex items-center justify-between hover:border-white/20 transition`}>
                <div>
                   <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{card.label}</p>
                   <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
                </div>
                <div className={`p-3 rounded-xl border ${card.border} ${card.bg}`}>
                    <card.icon className={card.color} size={20} />
                </div>
             </div>
           ))}
        </div>

        {/* Checklist da IA (Dark Style) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                 <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                     <CheckCircle size={20} className="text-emerald-500" /> Checklist de Elegibilidade
                 </h3>
                 <span className="text-xs text-slate-500 font-mono">AUTO-VERIFICAÇÃO</span>
             </div>
             
             <div className="divide-y divide-white/5">
                {data.checklist.map((item, idx) => (
                    <div key={idx} className="p-5 flex justify-between items-center hover:bg-white/[0.02] transition group cursor-default">
                        <div className="flex items-center gap-4">
                          <div className={`p-1.5 rounded-full ${item.status === 'ok' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                              {item.status === 'ok' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
                          </div>
                          <span className={`${item.status === 'ok' ? 'text-slate-200' : 'text-slate-400'} text-sm font-medium group-hover:text-white transition`}>
                              {item.item}
                          </span>
                        </div>
                        {item.status === 'pending' && (
                             <span className="text-xs border border-orange-500/30 text-orange-400 px-2 py-1 rounded bg-orange-500/10">Pendente</span>
                        )}
                        {item.status === 'ok' && (
                             <span className="text-xs border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded bg-emerald-500/10">OK</span>
                        )}
                    </div>
                ))}
             </div>
        </div>

      </main>
    </div>
  );
}