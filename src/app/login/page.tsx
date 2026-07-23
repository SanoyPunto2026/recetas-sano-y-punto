"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f5f2eb]">
      {/* Elementos decorativos de fondo orgánicos y fluidos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#c7d9c7] to-[#9ebf9e] rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-tl from-[#dfccb3] to-[#ceaf8e] rounded-full blur-[140px] mix-blend-multiply" />
      </div>

      <div className="z-10 w-full max-w-md p-6">
        <div className="rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-2xl bg-white/30 border border-white/60 relative overflow-hidden">
          
          {/* Brillo sutil dentro de la tarjeta */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

          <div className="text-center mb-10 relative z-10 flex flex-col items-center">
            {/* Contenedor del logo minimalista con sombra real */}
            <div className="relative mb-4 rounded-full shadow-[0_10px_25px_rgba(37,55,37,0.3)] bg-white overflow-hidden flex items-center justify-center w-[100px] h-[100px]">
              <Image 
                src="/logo_brand_minimal.png" 
                alt="Sano y Punto" 
                width={100} 
                height={100} 
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <p className="block text-[26px] sm:text-[32px] md:text-[36px] italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#345334] via-[#74a074] to-[#345334] bg-[length:200%_auto] animate-shimmer pb-2 mt-4 text-center">
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
