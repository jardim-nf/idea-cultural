// src/pages/Dashboard/Home.jsx
import React, { useEffect, useState } from 'react';
import { Plus, FolderOpen, FileText, Settings, LogOut, Bell, Search, Sparkles, Trash2, PlayCircle, Radio, PlaySquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  // Carrega os projetos salvos ao abrir o Dashboard
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projectsList') || '[]');
    setProjects(savedProjects);
  }, []);

  // Função para abrir um projeto antigo (carrega na tela de análise)
  const openProject = (project) => {
    localStorage.setItem('projectData', JSON.stringify({ analysis: project.analysis, title: project.title }));
    navigate('/project/analysis');
  };

  // Função para deletar
  const deleteProject = (id, e) => {
    e.stopPropagation();
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('projectsList', JSON.stringify(updated));
  };

  // CONFIGURAÇÃO DOS VÍDEOS DO YOUTUBE
  const videosMentorias = [
    { 
      id: 1, 
      titulo: 'Como aprovar projetos na Lei Rouanet', 
      duracao: '15 min',
      youtubeId: '3f-X2f0N9P8' 
    },
    { 
      id: 2, 
      titulo: 'Montando orçamentos para editais culturais', 
      duracao: '22 min',
      youtubeId: 'L_LUpnjgPso' 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-gray-800">
      
      {/* SIDEBAR PADRÃO COM CORES DA MARCA */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10 shadow-sm">
        
        {/* LOGO - Clicar nela mantém no Dashboard */}
        <div className="p-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition" onClick={() => navigate('/dashboard')}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center shadow-sm">
                <Sparkles className="text-emerald-400 w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-blue-900">IDeIA<span className="text-emerald-500">.</span></span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* BOTÃO INÍCIO - Ativo (Azul) e apontando para /dashboard */}
          <a onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-lg font-medium border-l-4 border-blue-900 cursor-pointer">
            <FolderOpen size={20} /> Início
          </a>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition">
            <FileText size={20} /> Meus Projetos
          </a>
          
          <a onClick={() => navigate('/videos')} className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition cursor-pointer">
            <PlaySquare size={20} /> Capacitação
          </a>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition">
            <Settings size={20} /> Configurações
          </a>
        </nav>

        {/* BOTÃO SAIR - Único que joga para fora do sistema */}
        <div className="p-4 border-t border-gray-200">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium w-full px-4 py-2 hover:bg-red-50 rounded-lg transition">
            <LogOut size={18} /> Sair do sistema
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 md:ml-64 p-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 text-sm">Visão geral e novas oportunidades.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Buscar projeto..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 w-64 bg-white shadow-sm" />
            </div>
            <button className="p-2 relative hover:bg-gray-200 rounded-full transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-emerald-500 rounded-full border border-white"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:bg-blue-800 transition">
              MA
            </div>
          </div>
        </header>

        {/* 1. ÁREA DE BEM-VINDO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo(a) de volta! 🚀</h2>
            <p className="text-gray-500 mt-1">O que vamos criar hoje?</p>
          </div>
          <button 
            onClick={() => navigate('/new-project')}
            className="mt-4 md:mt-0 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus size={20} /> Novo Projeto com IA
          </button>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA ESQUERDA (Maior) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 2. MEUS EDITAIS / PROJETOS RECENTES */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">Meus Projetos Recentes</h3>
                <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">Ver todos</span>
              </div>
              
              <div className="overflow-hidden min-h-[200px]">
                {projects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-10 text-center bg-slate-50 rounded-xl border border-dashed border-gray-300">
                    <FolderOpen size={32} className="text-gray-400 mb-3" />
                    <h3 className="text-gray-700 font-bold mb-1">Nenhum projeto</h3>
                    <p className="text-gray-500 text-sm">Crie seu primeiro projeto para aparecer aqui.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 border-y border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Projeto</th>
                          <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {projects.slice(0, 4).map((project) => (
                          <tr key={project.id} onClick={() => openProject(project)} className="hover:bg-blue-50/50 transition cursor-pointer group">
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-800">{project.title}</div>
                              <div className="text-xs text-gray-400 truncate w-48">{project.law || 'Sem edital vinculado'}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs px-2 py-1 rounded-full font-medium">
                                {project.status || 'Rascunho'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right flex justify-end gap-3 items-center h-full mt-2">
                              <button onClick={(e) => deleteProject(project.id, e)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* 3. RADAR DE EDITAIS */}
            <section className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-2xl shadow-md text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Radio className="text-emerald-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Radar de Editais</h2>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-1.5 rounded-lg text-sm font-medium transition backdrop-blur-sm">
                  Configurar Radar
                </button>
              </div>
              <p className="text-blue-100 mb-6 relative z-10 text-sm">O IDeIA vasculha oportunidades compatíveis com seu perfil em tempo real.</p>
              
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/10 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <p className="font-medium text-sm text-emerald-50">Buscando novos editais no Diário Oficial...</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded font-medium">Ao vivo</span>
                </div>
              </div>
            </section>

          </div>

          {/* COLUNA DIREITA (Menor) */}
          <div className="space-y-8">
            
            {/* 4. VÍDEOS DO YOUTUBE */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <PlayCircle size={20} className="text-blue-900" />
                Capacitação
              </h3>
              
              <div className="space-y-5">
                {videosMentorias.map(video => (
                  <a 
                    key={video.id} 
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group cursor-pointer flex gap-3 block"
                  >
                    <div className="w-28 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition">
                      <img 
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} 
                        alt={video.titulo} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
                        <PlayCircle size={28} className="text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <h4 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-blue-600 transition line-clamp-2">
                        {video.titulo}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{video.duracao} • YouTube</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/videos')}
                className="w-full mt-6 py-2 border border-gray-200 text-blue-900 rounded-lg font-medium text-sm hover:bg-blue-50 transition"
              >
                Ver todos os vídeos
              </button>
            </section>

            {/* CARD DE STATUS */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-md text-white relative overflow-hidden">
              <Sparkles className="absolute -bottom-2 -right-2 w-24 h-24 text-white opacity-10" />
              <h3 className="font-medium text-emerald-50 mb-1 relative z-10">Projetos Aprovados</h3>
              <div className="text-4xl font-bold relative z-10">0</div>
              <p className="text-sm text-emerald-100 mt-2 relative z-10">Continue submetendo as suas ideias!</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}