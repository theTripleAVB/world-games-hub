import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Shield, Sparkles, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLANS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { motion } from "framer-motion";

export const Route = createFileRoute("/plans")({
  component: Plans,
  head: () => ({ meta: [{ title: "Planos — World Games RA" }, { name: "description", content: "Escolha seu plano. A partir de R$24,99/mês." }] }),
});

function Plans() {
  const navigate = useNavigate();
  const { setPlan } = useApp();

  const choose = (id: string) => {
    setPlan(id);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-5">
            <Sparkles className="size-3 text-primary" /> 7 dias grátis · cancele quando quiser
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">Escolha o plano <span className="text-gradient">perfeito</span>.</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Todos os planos incluem catálogo completo. Quanto maior o ciclo, maior a economia.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`relative rounded-2xl p-6 border transition-all ${
                p.highlighted
                  ? "border-primary/60 shadow-glow gradient-card scale-[1.02]"
                  : "border-border/50 bg-card hover:border-primary/40"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-glow">
                  {p.badge}
                </div>
              )}
              <div className="text-sm text-muted-foreground mb-1">Plano</div>
              <h3 className="text-2xl font-bold mb-4">{p.name}</h3>
              <div className="mb-1">
                <span className="text-4xl font-bold">R${p.price.toFixed(2).replace(".", ",")}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <div className="text-xs text-muted-foreground mb-4">
                Equivale a <span className="text-primary font-semibold">R${p.monthly.toFixed(2).replace(".", ",")}/mês</span>
                {p.savings && <span className="ml-2 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-semibold">{p.savings}</span>}
              </div>
              <button
                onClick={() => choose(p.id)}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                  p.highlighted ? "gradient-primary text-white shadow-glow hover:scale-[1.02]" : "glass hover:bg-secondary/60"
                }`}
              >
                Assinar {p.name}
              </button>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 glass rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Compare os planos</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 pr-4 font-semibold">Recurso</th>
                  {PLANS.map((p) => <th key={p.id} className="py-3 px-2 font-semibold">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Catálogo completo", [true, true, true, true]],
                  ["Multiplayer online", [true, true, true, true]],
                  ["Cloud saves", [true, true, true, true]],
                  ["Lançamentos day-one", [false, true, true, true]],
                  ["Beta antecipado", [false, false, true, true]],
                  ["Dispositivos", ["1","2","3","∞"]],
                  ["Eventos VIP", [false, false, false, true]],
                ].map(([label, vals]) => (
                  <tr key={String(label)} className="border-b border-border/20">
                    <td className="py-3 pr-4 text-muted-foreground">{label as string}</td>
                    {(vals as (boolean|string)[]).map((v, i) => (
                      <td key={i} className="py-3 px-2 text-center">
                        {typeof v === "boolean"
                          ? (v ? <Check className="size-4 text-emerald-400 mx-auto" /> : <X className="size-4 text-muted-foreground/40 mx-auto" />)
                          : <span className="font-semibold">{v}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><Shield className="size-4 text-emerald-400" /> Garantia 7 dias</div>
          <div className="flex items-center gap-1.5"><Shield className="size-4 text-emerald-400" /> Pagamento SSL</div>
          <div className="flex items-center gap-1.5"><Shield className="size-4 text-emerald-400" /> Cancele quando quiser</div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
