import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Mail, Lock, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Entrar — World Games RA" }] }),
});

function Login() {
  const navigate = useNavigate();
  const { setLoggedIn, setUser } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ name: email.split("@")[0] || "Player One", email: email || "player@worldgames.ra" });
    setLoggedIn(true);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero lg:hidden" />
      <div className="hidden lg:block relative gradient-hero overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-32 -left-20 size-96 rounded-full bg-primary/30 blur-[120px] animate-pulse-glow" />
        <div className="relative p-12 h-full flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="size-9 rounded-lg gradient-primary grid place-items-center"><Gamepad2 className="size-5 text-white" /></div>
            <span className="font-bold">World Games RA</span>
          </Link>
          <div>
            <h2 className="text-4xl font-bold leading-tight">Entre no maior <span className="text-gradient">universo de games</span> do Brasil.</h2>
            <p className="mt-4 text-muted-foreground max-w-md">2 milhões de jogadores. 5.000+ jogos. Uma única assinatura.</p>
            <div className="mt-8 flex items-center gap-3">
              {["🎮","⚔️","🚀","🏎️","🐉"].map((e, i) => (
                <div key={i} className="size-12 rounded-xl glass grid place-items-center text-xl">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid place-items-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-strong rounded-2xl p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{mode === "login" ? "Bem-vindo de volta" : "Criar conta"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? "Entre para acessar sua biblioteca." : "Cadastre-se em 30 segundos."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {[["Google","🌐"],["Discord","💬"],["Xbox","🎮"],["Steam","🕹️"]].map(([n, e]) => (
              <button key={n} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg glass hover:bg-secondary/60 text-sm font-medium transition">
                <span>{e}</span> {n}
              </button>
            ))}
          </div>

          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40" /></div>
            <span className="relative bg-card px-3 text-xs text-muted-foreground">ou com e-mail</span>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com"
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-input/50 border border-border focus:outline-none focus:border-primary text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-input/50 border border-border focus:outline-none focus:border-primary text-sm" />
              </div>
            </div>
            {mode === "login" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" /> Lembrar de mim
                </label>
                <button type="button" className="text-primary hover:underline">Esqueci minha senha</button>
              </div>
            )}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg gradient-primary text-white font-semibold shadow-glow hover:scale-[1.02] transition">
              {mode === "login" ? "Entrar" : "Criar conta"} <ArrowRight className="size-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary font-semibold hover:underline">
              {mode === "login" ? "Criar conta" : "Entrar"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
