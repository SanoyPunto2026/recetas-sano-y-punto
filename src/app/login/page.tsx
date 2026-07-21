"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "../actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const result = await loginAction(password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrorMsg(result.error || "Credenciales inválidas.");
      }
    } catch (err) {
      setErrorMsg("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#fbfaf8]">
      {/* Elementos decorativos de fondo orgánicos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#e3ebe3] rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#dfccb3] rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-md p-6">
        <div className="glass rounded-[2rem] p-10 md:p-12 shadow-2xl backdrop-blur-xl border border-white/40">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-[#253725] tracking-tight mb-3">
              Sano y Punto
            </h1>
            <p className="text-[#518451] font-medium text-lg tracking-wide opacity-90">
              Bóveda de Recetas
            </p>
          </div>
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-[#ef4444]/10 text-[#ef4444] rounded-xl text-sm text-center font-medium border border-[#ef4444]/20 animate-fade-in">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#345334] tracking-wide uppercase text-xs">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/50 border border-[#74a074]/30 rounded-xl focus:ring-2 focus:ring-[#74a074] focus:border-[#74a074] focus:bg-white outline-none text-[#121e12] transition-all duration-300 placeholder:text-[#9ebf9e]"
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#345334] tracking-wide uppercase text-xs">
                Contraseña de Acceso
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/50 border border-[#74a074]/30 rounded-xl focus:ring-2 focus:ring-[#74a074] focus:border-[#74a074] focus:bg-white outline-none text-[#121e12] transition-all duration-300 placeholder:text-[#9ebf9e]"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 bg-[#345334] hover:bg-[#253725] text-[#fbfaf8] font-bold text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#345334]/20 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : (
                "Entrar al Recetario"
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
