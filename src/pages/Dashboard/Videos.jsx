// src/pages/Dashboard/Videos.jsx
import React, { useState } from 'react';
import { FolderOpen, FileText, Settings, LogOut, Sparkles, PlaySquare, PlayCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Videos() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState('Todos');

  // Base de dados de exemplo dos vídeos
  const todosVideos = [
    { id: 1, titulo: 'Como aprovar projetos na Lei Rouanet', duracao: '15 min', categoria: 'Leis de Incentivo', youtubeId: '3f-X2f0N9P8' },
    { id: 2, titulo: 'Montando orçamentos para editais culturais', duracao: '22 min', categoria: 'Orçamento', youtubeId: 'L_LUpnjgPso' },
    { id: 3, titulo: 'Marketing para Produtores Culturais', duracao: '18 min', categoria: 'Marketing', youtubeId: 'dQw4w9WgXcQ' },
    { id: 4, titulo: 'Prestação de Contas: O Guia Definitivo', duracao: '30 min', categoria: 'Gestão', youtubeId: 'jNQXAC9IVRw' },
    { id: 5, titulo: 'Como escrever justificativas matadoras', duracao: '12 min', categoria: 'Escrita', youtubeId: 'M7lc1UVf-VE' },
    { id: 6, titulo: 'Captando recursos com empresas privadas', duracao: '25 min', categoria: 'Leis de Incentivo', youtubeId: 'C0DPdy98e4c' },
  ];

  const categorias = ['Todos', 'Leis de Incentivo', 'Orçamento', 'Marketing', 'Gestão', 'Escrita'];

  const videosFiltrados = filtro === 'Todos' 
    ? todosVideos 
    : todosVideos.filter(v => v.categoria === filtro);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-gray-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10 shadow-sm">
        
        {/* CORREÇÃO: navigate('/dashboard') na LOGO */}
        <div className="p-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition" onClick={() => navigate('/dashboard')}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center shadow-sm">
                <Sparkles className="text-emerald-400 w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-blue-900">IDeIA<span className="text-emerald-500">.</span></span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          
          {/* CORREÇÃO: navigate('/dashboard') no BOTÃO INÍCIO */}
          <a onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition cursor-pointer">
            <FolderOpen size={20} /> Início
          </a>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition">
            <FileText size={20} /> Meus Projetos
          </a>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-lg font-medium border-l-4 border-blue-900 cursor-pointer">
            <PlaySquare size={20} /> Capacitação
          </a>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition">
            <Settings size={20} /> Configurações
          </a>
        </nav>

        {/* Esse continua mandando pra fora, pois é o botão de sair */}
        <div className="p-4 border-t border-gray-200">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium w-full px-4 py-2 hover:bg-red-50 rounded-lg transition">
            <LogOut size={18} /> Sair do sistema
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 md:ml-64 p-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Capacitação e Mentorias</h1>
            <p className="text-gray-500 text-sm mt-1">Aprenda com especialistas e impulsione os seus projetos.</p>
          </div>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Pesquisar aula..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 w-64 bg-white" />
          </div>
        </header>

        {/* FILTROS DE CATEGORIA */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                filtro === cat 
                  ? 'bg-blue-900 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRELHA DE VÍDEOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videosFiltrados.map(video => (
            <a 
              key={video.id} 
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition group block"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                  onError={(e) => { e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg` }}
                  alt={video.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition flex items-center justify-center">
                  <PlayCircle size={48} className="text-white opacity-0 group-hover:opacity-100 drop-shadow-lg transform scale-90 group-hover:scale-100 transition duration-300" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                  {video.duracao}
                </span>
              </div>
              
              {/* Info do Vídeo */}
              <div className="p-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">
                  {video.categoria}
                </span>
                <h3 className="font-bold text-gray-800 mt-2 line-clamp-2 leading-snug group-hover:text-blue-700 transition">
                  {video.titulo}
                </h3>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  Mentorias IDeIA
                </p>
              </div>
            </a>
          ))}
        </div>

        {videosFiltrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">Nenhum vídeo encontrado nesta categoria.</p>
          </div>
        )}

      </main>
    </div>
  );
}