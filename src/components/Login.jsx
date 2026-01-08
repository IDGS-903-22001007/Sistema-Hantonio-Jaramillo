import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginUser(login, password);
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas. Intente nuevamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          {/* Logo simplificado - solo texto */}
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
            Hantonio
            <span className="text-amber-500 block">Jaramillo</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">Sistema de Gestión Profesional</p>
        </div>

        {/* Card Principal */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-10 backdrop-blur-xl shadow-2xl shadow-black/50 relative overflow-hidden">
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Usuario Input */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Usuario
              </label>
              <div className={`relative px-5 py-4 bg-slate-900/50 border-2 rounded-xl transition-all duration-300 group ${
                focusedField === 'login' 
                  ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' 
                  : 'border-slate-600/50 hover:border-slate-500/50'
              }`}>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  onFocus={() => setFocusedField('login')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="admin"
                  className="w-full bg-transparent text-white outline-none text-sm font-medium placeholder-slate-400"
                  required
                />
              </div>
            </div>

            {/* Contraseña Input */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Contraseña
              </label>
              <div className={`relative px-5 py-4 bg-slate-900/50 border-2 rounded-xl transition-all duration-300 flex items-center group ${
                focusedField === 'password' 
                  ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' 
                  : 'border-slate-600/50 hover:border-slate-500/50'
              }`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-white outline-none text-sm font-medium placeholder-slate-400 tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-3 text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M15.171 13.576l1.472-1.473a2.001 2.001 0 00-2.67-2.67l-.302.301m0 0a2 2 0 01-2.828 2.829m-5.54-5.64a9.964 9.964 0 012.531-.068c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-.52 0-1.031-.04-1.538-.118m5.335-13.372C13.194 2.567 11.659 2 10 2a9.958 9.958 0 00-4.512 1.074m0 0a1 1 0 001.414 1.415M6.488 4.488l-1.415-1.415" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/15 border border-red-500/30 rounded-xl animate-slideDown">
                <p className="text-red-300 text-xs font-bold flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-8 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 uppercase tracking-wider text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                'Acceder al Sistema'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Hantonio Jaramillo
          </p>
          <p className="text-slate-600 text-xs mt-1 italic">
            Sastrería • Gestión • Profesionalismo
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
