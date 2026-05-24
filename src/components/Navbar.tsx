import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/plans", label: "Planos" },
  { to: "/faq", label: "FAQ" },
] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg gradient-primary blur-md opacity-70 group-hover:opacity-100 transition" />
              <div className="relative size-9 rounded-lg gradient-primary grid place-items-center">
                <Gamepad2 className="size-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-tight">World Games</span>
              <span className="text-[10px] font-semibold text-primary -mt-0.5">RA</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {items.map((i) => {
              const active = path === i.to;
              return (
                <Link
                  key={i.to}
                  to={i.to}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    active ? "text-foreground bg-secondary/60" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  {i.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="size-9 grid place-items-center rounded-lg hover:bg-secondary/60 transition"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Link to="/login" className="hidden sm:inline-flex text-sm px-3 py-2 rounded-lg hover:bg-secondary/60 transition">
              Entrar
            </Link>
            <Link
              to="/plans"
              className="hidden sm:inline-flex relative items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-semibold shadow-glow hover:scale-[1.03] transition-transform"
            >
              Assinar Agora
            </Link>
            <button
              className="md:hidden size-9 grid place-items-center rounded-lg hover:bg-secondary/60"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-strong border-b border-border/40 overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {items.map((i) => (
                <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-secondary/60 text-sm">
                  {i.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-secondary/60 text-sm">Entrar</Link>
              <Link to="/plans" onClick={() => setOpen(false)} className="mt-1 px-3 py-2 rounded-lg gradient-primary text-white text-sm font-semibold text-center">Assinar Agora</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
