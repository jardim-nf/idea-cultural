// src/pages/Dashboard/Home.jsx
import React, { useEffect, useState } from 'react';
import { Plus, FolderOpen, FileText, Settings, LogOut, Bell, Search, Sparkles, Trash2 } from 'lucide-react';
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

  // Função para deletar (opcional, para limpar a lista)
  const deleteProject = (id, e) => {
    e.stopPropagation();
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('projectsList', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <Sparkles className="text-emerald-400 w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-blue-900">IDeIA<span className="text-emerald-500">.</span></span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-lg font-medium border-l-4 border-blue-900">
            <FolderOpen size={20} /> Meus Projetos
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition">
            <FileText size={20} /> Modelos Prontos
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition">
            <Settings size={20} /> Configurações
          </a>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium w-full px-4 py-2 hover:bg-red-50 rounded-lg transition">
            <LogOut size={18} /> Sair do sistema
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 md:ml-64 p-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Meus Projetos</h1>
            <p className="text-gray-500 text-sm">Gerencie suas propostas para Leis de Incentivo.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Buscar projeto..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 w-64 bg-white" />
            </div>
            <button className="p-2 relative hover:bg-gray-200 rounded-full transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
              MA
            </div>
          </div>
        </header>

        {/* Stats & Ação */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <button 
                onClick={() => navigate('/new-project')}
                className="md:col-span-1 bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-xl p-6 flex flex-col items-start justify-between shadow-lg hover:shadow-xl hover:scale-[1.02] transition group"
            >
                <div className="bg-white/20 p-2 rounded-lg mb-4">
                    <Plus size={24} className="text-white" />
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-lg">Novo Projeto</h3>
                    <p className="text-blue-200 text-sm mt-1">Criar com IA</p>
                </div>
            </button>

            {/* Cards Dinâmicos */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-gray-500 text-sm font-medium">Projetos Salvos</span>
                <span className="text-3xl font-bold text-gray-800 mt-1 block">{projects.length}</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-gray-500 text-sm font-medium">Em Análise</span>
                <span className="text-3xl font-bold text-orange-500 mt-1 block">0</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-gray-500 text-sm font-medium">Aprovados</span>
                <span className="text-3xl font-bold text-emerald-500 mt-1 block">0</span>
            </div>
        </div>

        {/* Lista de Projetos (Tabela Dinâmica) */}
        <h3 className="font-bold text-gray-700 mb-4">Recentes</h3>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm min-h-[300px]">
            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <FolderOpen size={32} />
                    </div>
                    <h3 className="text-gray-800 font-bold mb-1">Nenhum projeto ainda</h3>
                    <p className="text-gray-500 text-sm mb-4">Crie seu primeiro projeto usando a IA.</p>
                    <button onClick={() => navigate('/new-project')} className="text-blue-600 font-medium hover:underline">Criar agora</button>
                </div>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nome do Projeto</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Lei / Edital</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Data</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.map((project) => (
                            <tr key={project.id} onClick={() => openProject(project)} className="hover:bg-blue-50/30 transition cursor-pointer group">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-800">{project.title}</div>
                                    <div className="text-xs text-gray-400">{project.proponent || 'Sem proponente'}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{project.law}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">{project.status}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{project.date}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-3">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Ver</button>
                                    <button onClick={(e) => deleteProject(project.id, e)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
      </main>
    </div>
  );
}