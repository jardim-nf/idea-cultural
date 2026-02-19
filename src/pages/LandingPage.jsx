// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle, Zap, Shield, Sparkles, 
  FileText, Clock, DollarSign, Star, Menu, X, ChevronDown 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-white bg-[#0B1120] selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      
      {/* --- EFEITOS DE FUNDO (GLOW) --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">
                IDeIA<span className="text-emerald-400">.</span>
              </span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" className="text-gray-300 hover:text-white font-medium transition hover:scale-105">Como funciona</a>
              <a href="#recursos" className="text-gray-300 hover:text-white font-medium transition hover:scale-105">Recursos</a>
              <a href="#precos" className="text-gray-300 hover:text-white font-medium transition hover:scale-105">Planos</a>
              
              <div className="h-6 w-px bg-white/10"></div>
              
              <button 
                onClick={() => navigate('/login')}
                className="text-white font-medium hover:text-emerald-400 transition"
              >
                Entrar
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40"
              >
                Começar Grátis
              </button>
            </div>

            {/* Menu Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0B1120] border-b border-white/10 p-4 space-y-4">
            <a href="#como-funciona" className="block text-gray-300 hover:text-emerald-400">Como funciona</a>
            <a href="#recursos" className="block text-gray-300 hover:text-emerald-400">Recursos</a>
            <button onClick={() => navigate('/login')} className="block w-full text-left text-white font-bold py-2">Entrar</button>
            <button onClick={() => navigate('/login')} className="block w-full bg-emerald-500 text-white font-bold py-3 rounded-lg text-center">Começar Agora</button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Badge de Novidade */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-8 backdrop-blur-md animate-fade-in-up hover:bg-blue-500/20 transition cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            IA Atualizada para Lei Paulo Gustavo 2026
          </div>
          
          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
            Escreva Projetos Culturais <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500">
              10x Mais Rápido com IA
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Pare de lutar contra a burocracia. O <strong className="text-white">IDeIA</strong> formata, escreve e estrutura seu projeto nas normas da Lei Rouanet, Paulo Gustavo e Aldir Blanc em segundos.
          </p>
          
          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white text-lg font-bold rounded-xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3 border border-emerald-400/50"
            >
              <Zap size={20} className="fill-current" /> Gerar Projeto Agora
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-lg font-semibold rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 group">
              Ver Exemplo PDF <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Stats / Prova Social */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-white">+1.200</p>
              <p className="text-slate-500 text-sm">Projetos Gerados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">R$ 45mi</p>
              <p className="text-slate-500 text-sm">Captados (Est.)</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-slate-500 text-sm">Aprovação Técnica</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-slate-500 text-sm">Suporte IA</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROBLEMA VS SOLUÇÃO (COMPARATIVO) --- */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">A evolução da Produção Cultural</h2>
            <p className="text-slate-400">Veja por que o método antigo está te fazendo perder dinheiro.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* O Jeito Antigo */}
            <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-2xl relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">JEITO ANTIGO</div>
                <h3 className="text-xl font-bold text-red-200 mb-6 flex items-center gap-2"><X size={20} /> Manualmente</h3>
                <ul className="space-y-4 text-slate-300">
                    <li className="flex gap-3 text-sm opacity-70"><X size={16} className="text-red-500 mt-1 shrink-0" /> Semanas escrevendo justificativas repetitivas.</li>
                    <li className="flex gap-3 text-sm opacity-70"><X size={16} className="text-red-500 mt-1 shrink-0" /> Erros de formatação ABNT que reprovam o projeto.</li>
                    <li className="flex gap-3 text-sm opacity-70"><X size={16} className="text-red-500 mt-1 shrink-0" /> Dúvidas sobre qual rubrica orçamentária usar.</li>
                    <li className="flex gap-3 text-sm opacity-70"><X size={16} className="text-red-500 mt-1 shrink-0" /> Bloqueio criativo na hora de descrever objetivos.</li>
                </ul>
            </div>

            {/* O Jeito IDeIA (Com destaque) */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-2xl relative shadow-2xl shadow-emerald-900/20 scale-105">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">COM IDeIA</div>
                <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2"><CheckCircle size={20} /> Inteligência Artificial</h3>
                <ul className="space-y-4 text-white">
                    <li className="flex gap-3 font-medium"><CheckCircle size={16} className="text-emerald-400 mt-1 shrink-0" /> Projeto completo em menos de 15 minutos.</li>
                    <li className="flex gap-3 font-medium"><CheckCircle size={16} className="text-emerald-400 mt-1 shrink-0" /> Formatação automática perfeita para o Salic/MinC.</li>
                    <li className="flex gap-3 font-medium"><CheckCircle size={16} className="text-emerald-400 mt-1 shrink-0" /> Sugestão inteligente de orçamento e custos.</li>
                    <li className="flex gap-3 font-medium"><CheckCircle size={16} className="text-emerald-400 mt-1 shrink-0" /> Linguagem técnica e persuasiva aprovada por pareceristas.</li>
                </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- FEATURES GRID (DETALHES) --- */}
      <section id="recursos" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition duration-300 group">
                    <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Redação Jurídica</h3>
                    <p className="text-slate-400 leading-relaxed">
                        A IA conhece os termos jurídicos e técnicos que os pareceristas buscam. Ela escreve com autoridade.
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition duration-300 group">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                        <DollarSign size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Orçamentos Inteligentes</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Não sabe quanto cobrar num produtor executivo? Nossa base de dados sugere valores de mercado.
                    </p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition duration-300 group">
                    <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                        <Shield size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Segurança de Dados</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Sua ideia vale ouro. Seus projetos são criptografados e nunca usados para treinar a IA pública.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Efeitos de fundo do card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -mr-16 -mt-16"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Tire sua ideia do papel hoje.</h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto relative z-10">
                Junte-se a centenas de produtores culturais que estão aprovando projetos com agilidade.
            </p>
            <button 
                onClick={() => navigate('/login')}
                className="px-10 py-5 bg-white text-blue-900 text-xl font-bold rounded-xl shadow-xl hover:bg-gray-100 transition-all hover:-translate-y-1 relative z-10"
            >
                Começar Gratuitamente
            </button>
            <p className="mt-4 text-sm text-slate-400 relative z-10">Não requer cartão de crédito para teste.</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-[#0B1120] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                        <Sparkles className="text-emerald-400 w-5 h-5" />
                        <span className="text-xl font-bold text-white">IDeIA.</span>
                    </div>
                    <p className="text-slate-500 text-sm">
                        Tecnologia a favor da cultura brasileira.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Produto</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="#" className="hover:text-emerald-400">Funcionalidades</a></li>
                        <li><a href="#" className="hover:text-emerald-400">Preços</a></li>
                        <li><a href="#" className="hover:text-emerald-400">Atualizações</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Leis</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="#" className="hover:text-emerald-400">Lei Rouanet</a></li>
                        <li><a href="#" className="hover:text-emerald-400">Paulo Gustavo</a></li>
                        <li><a href="#" className="hover:text-emerald-400">Aldir Blanc</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="#" className="hover:text-emerald-400">Privacidade</a></li>
                        <li><a href="#" className="hover:text-emerald-400">Termos de Uso</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-600 text-sm">© 2026 IDeIA System. Todos os direitos reservados.</p>
                <div className="flex gap-4">
                    {/* Redes Sociais icons placeholders */}
                    <div className="w-8 h-8 bg-white/5 rounded-full hover:bg-emerald-500/20 cursor-pointer transition"></div>
                    <div className="w-8 h-8 bg-white/5 rounded-full hover:bg-emerald-500/20 cursor-pointer transition"></div>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
}