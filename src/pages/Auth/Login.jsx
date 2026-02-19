// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles, User, Github, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../services/firebaseConfig'; // Importando a configuração

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(''); // Estado para erros
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Limpa erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // --- LOGIN ---
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/dashboard');
      } else {
        // --- CADASTRO ---
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // Atualizar o nome do usuário no perfil do Firebase
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      // Tradução simples de erros comuns
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError('E-mail ou senha incorretos.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está cadastrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Ocorreu um erro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden font-sans text-white">
      
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo */}
        <div className="text-center mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-3xl font-bold tracking-tighter text-white">
              IDeIA<span className="text-emerald-400">.</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Acesse sua conta para continuar.' : 'Crie sua conta gratuita.'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          
          {/* Tabs */}
          <div className="flex bg-black/20 p-1 rounded-lg mb-6">
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-white/10 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Entrar
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-white/10 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Criar Conta
            </button>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200 text-sm animate-pulse">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 ml-1">Nome Completo</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition" />
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 ml-1">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition" />
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition" />
                <input 
                  type="password" 
                  name="password"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 transform hover:-translate-y-0.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Carregando...' : (isLogin ? 'Acessar Painel' : 'Começar Agora')} 
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}