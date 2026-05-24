import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FAQ } from "@/lib/mock-data";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({ meta: [{ title: "FAQ — World Games RA" }, { name: "description", content: "Perguntas frequentes sobre assinatura, planos e jogos." }] }),
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Ajuda</div>
          <h1 className="text-4xl md:text-5xl font-bold">Perguntas frequentes</h1>
          <p className="mt-3 text-muted-foreground">Não achou o que procura? <Link to="/login" className="text-primary hover:underline">Fale com a gente</Link>.</p>
        </div>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={`size-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-4 text-sm text-muted-foreground">
                  {f.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
