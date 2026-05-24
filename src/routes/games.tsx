import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { CATEGORIES, GAMES } from "@/lib/mock-data";

export const Route = createFileRoute("/games")({
  component: Games,
});

function Games() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");

  const filtered = useMemo(() => {
    return GAMES.filter((g) => {
      const matchCat = cat === "Todos" || g.tags.includes(cat) || g.category === cat;
      const matchQ = q === "" || g.title.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-20">
        <div className="mb-8">
          <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Catálogo</div>
          <h1 className="text-4xl md:text-5xl font-bold">Descubra seu próximo vício.</h1>
          <p className="text-muted-foreground mt-2">{GAMES.length}+ jogos disponíveis com sua assinatura.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nome..."
              className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-border/50 text-sm focus:outline-none focus:border-primary/60 transition"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                cat === c ? "gradient-primary text-white shadow-glow" : "glass hover:bg-secondary/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="text-5xl mb-3">🎮</div>
            <h3 className="font-semibold mb-1">Nenhum jogo encontrado</h3>
            <p className="text-sm text-muted-foreground">Tente outra busca ou categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
