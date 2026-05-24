import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Gamepad2, PlayCircle, Shield, Sparkles, Star, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { GAMES, TESTIMONIALS, FAQ } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "World Games RA — O maior universo de games por assinatura" },
      { name: "description", content: "5.000+ jogos online por uma única assinatura. Multiplayer, cloud, day-one. Comece grátis 7 dias." },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Featured />
      <Advantages />
      <Testimonials />
      <Faq />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-20 -left-20 size-96 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-40 -right-20 size-96 rounded-full bg-accent/20 blur-[120px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Oferta por tempo limitado · 7 dias grátis
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl">
            O maior universo de <span className="text-gradient">games</span> por assinatura.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Tenha acesso a centenas de jogos online pagando apenas uma assinatura. Multiplayer, cloud, lançamentos no day-one.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/plans" className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:scale-[1.03] transition-transform">
              Começar Agora
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/plans" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl glass font-semibold hover:bg-secondary/60 transition">
              <PlayCircle className="size-4" /> Ver Planos
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-1">4.9/5 · 240k+ avaliações</span>
            </div>
          </div>
        </motion.div>

        {/* Floating game cards */}
        <div className="mt-16 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
            {GAMES.slice(0, 6).map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className={i % 2 === 0 ? "md:translate-y-4" : "md:-translate-y-4"}
              >
                <GameCard game={g} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "5.000+", l: "Jogos no catálogo", icon: Gamepad2 },
    { v: "2M+", l: "Jogadores ativos", icon: Users },
    { v: "99.9%", l: "Uptime garantido", icon: Zap },
    { v: "4.9★", l: "Avaliação média", icon: Star },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.l} className="glass rounded-2xl p-6 text-center">
            <s.icon className="size-6 mx-auto mb-3 text-primary" />
            <div className="text-3xl md:text-4xl font-bold text-gradient">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Em destaque</div>
          <h2 className="text-3xl md:text-5xl font-bold">Jogos mais quentes da semana</h2>
        </div>
        <Link to="/games" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:text-primary transition">
          Ver tudo <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {GAMES.slice(0, 8).map((g) => <GameCard key={g.id} game={g} />)}
      </div>
    </section>
  );
}

function Advantages() {
  const items = [
    { icon: Zap, t: "Streaming em ultra", d: "Jogue em 4K HDR com latência mínima a partir de qualquer dispositivo." },
    { icon: Shield, t: "Garantia de 7 dias", d: "Devolução incondicional. Sem perguntas, sem letras miúdas." },
    { icon: Sparkles, t: "Lançamentos day-one", d: "Os maiores títulos disponíveis no dia do lançamento, sem custo extra." },
    { icon: Users, t: "Multiplayer global", d: "Servidores em 30+ países com matchmaking justo e anti-cheat." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-24">
      <div className="text-center mb-12">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Por que World Games RA</div>
        <h2 className="text-3xl md:text-5xl font-bold">Tudo o que um gamer precisa.</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div key={i.t} className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors">
            <div className="size-11 rounded-xl gradient-primary grid place-items-center mb-4 shadow-glow">
              <i.icon className="size-5 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{i.t}</h3>
            <p className="text-sm text-muted-foreground">{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">Amado por jogadores.</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-sm leading-relaxed mb-4">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full gradient-primary grid place-items-center text-lg">{t.avatar}</div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">Perguntas frequentes</h2>
      </div>
      <div className="space-y-3">
        {FAQ.map((f, i) => (
          <div key={i} className="glass rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between text-left"
            >
              <span className="font-medium text-sm md:text-base">{f.q}</span>
              <ChevronDown className={`size-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-5 pb-4 text-sm text-muted-foreground">
                {f.a}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-20">
      <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center gradient-primary shadow-elevate">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl mx-auto">Pronto para entrar no jogo?</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">Junte-se a 2 milhões de gamers. Cancele quando quiser.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/plans" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-primary font-semibold hover:scale-[1.03] transition-transform">
              Assinar agora <ArrowRight className="size-4" />
            </Link>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Check className="size-4" /> 7 dias grátis · sem cartão
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
