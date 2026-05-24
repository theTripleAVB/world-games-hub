import { Star, Users, Flame, Sparkles } from "lucide-react";
import type { Game } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export default function GameCard({ game }: { game: Game }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card shadow-card hover:shadow-elevate transition-shadow"
    >
      <div className={`relative aspect-[3/4] bg-gradient-to-br ${game.gradient} overflow-hidden`}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 grid place-items-center text-7xl opacity-90 group-hover:scale-110 transition-transform duration-500">
          {game.emoji}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {game.hot && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/90 text-white text-[10px] font-bold backdrop-blur">
              <Flame className="size-3" /> HOT
            </span>
          )}
          {game.new && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur">
              <Sparkles className="size-3" /> NOVO
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur text-white text-xs font-semibold">
          <Star className="size-3 fill-yellow-400 text-yellow-400" />
          {game.rating}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <div className="text-[10px] uppercase tracking-wider text-white/70 mb-0.5 flex items-center gap-2">
            {game.category}
            {game.multiplayer && (
              <span className="inline-flex items-center gap-0.5 text-white/80">
                <Users className="size-3" /> MP
              </span>
            )}
          </div>
          <h3 className="font-bold text-base leading-tight">{game.title}</h3>
        </div>
      </div>
      <div className="p-3">
        <Link
          to="/plans"
          className="block w-full text-center text-xs font-semibold py-2 rounded-lg gradient-primary text-white opacity-95 hover:opacity-100 transition"
        >
          Assinar para Jogar
        </Link>
      </div>
    </motion.div>
  );
}
