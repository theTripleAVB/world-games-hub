import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Lock, Shield, Sparkles, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PLANS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout — World Games RA" }] }),
});

const STEPS = ["Plano", "Dados", "Pagamento"];

function Checkout() {
  const { selectedPlanId, setPlan, setLoggedIn, setUser } = useApp();
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [method, setMethod] = useState("card");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const plan = PLANS.find((p) => p.id === selectedPlanId) ?? PLANS[1];
  const total = Math.max(0, plan.price - discount);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "GAMER10") {
      setDiscount(plan.price * 0.1);
      toast.success("Cupom aplicado! 10% de desconto.");
    } else if (coupon) {
      toast.error("Cupom inválido");
    }
  };

  const finalize = () => {
    setUser({ name: form.name || "Player One", email: form.email || "player@worldgames.ra" });
    setLoggedIn(true);
    setSuccess(true);
  };

  if (success) return <SuccessScreen />;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        {/* Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div className={`size-9 rounded-full grid place-items-center text-sm font-bold transition ${
                    i <= step ? "gradient-primary text-white shadow-glow" : "bg-secondary text-muted-foreground"
                  }`}>{i < step ? <Check className="size-4" /> : i + 1}</div>
                  <span className={`mt-2 text-xs font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 -mt-6 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="glass-strong rounded-2xl p-6 md:p-8"
              >
                {step === 0 && (
                  <>
                    <h2 className="text-2xl font-bold mb-1">Escolha seu plano</h2>
                    <p className="text-sm text-muted-foreground mb-6">Você pode alterar quando quiser.</p>
                    <div className="space-y-3">
                      {PLANS.map((p) => (
                        <button key={p.id} onClick={() => setPlan(p.id)}
                          className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between ${
                            selectedPlanId === p.id ? "border-primary/60 bg-primary/5 shadow-glow" : "border-border/50 hover:border-primary/40"
                          }`}>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{p.name}</span>
                              {p.badge && <span className="text-[10px] px-2 py-0.5 rounded-full gradient-primary text-white font-bold">{p.badge}</span>}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">Equivale a R${p.monthly.toFixed(2).replace(".",",")} /mês</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">R${p.price.toFixed(2).replace(".",",")}</div>
                            <div className="text-xs text-muted-foreground">{p.period}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h2 className="text-2xl font-bold mb-1">Seus dados</h2>
                    <p className="text-sm text-muted-foreground mb-6">Usaremos para criar sua conta.</p>
                    <div className="space-y-4">
                      <Field label="Nome completo" value={form.name} onChange={(v) => setForm({...form, name: v})} placeholder="João Silva" />
                      <Field label="E-mail" type="email" value={form.email} onChange={(v) => setForm({...form, email: v})} placeholder="voce@email.com" />
                      <Field label="Telefone" value={form.phone} onChange={(v) => setForm({...form, phone: v})} placeholder="(11) 99999-9999" />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-2xl font-bold mb-1">Pagamento</h2>
                    <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5"><Lock className="size-3.5" /> Conexão criptografada SSL</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                      {[
                        ["card", "Cartão"], ["pix", "PIX"], ["gpay", "Google Pay"], ["apay", "Apple Pay"], ["paypal", "PayPal"],
                      ].map(([id, label]) => (
                        <button key={id} onClick={() => setMethod(id)}
                          className={`p-3 rounded-xl border text-xs font-semibold transition ${
                            method === id ? "border-primary bg-primary/10 text-foreground" : "border-border/50 hover:border-primary/40"
                          }`}>{label}</button>
                      ))}
                    </div>
                    {method === "card" && (
                      <div className="space-y-4">
                        <Field label="Número do cartão" placeholder="1234 5678 9012 3456" value="" onChange={() => {}} icon={<CreditCard className="size-4" />} />
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Validade" placeholder="MM/AA" value="" onChange={() => {}} />
                          <Field label="CVV" placeholder="123" value="" onChange={() => {}} />
                        </div>
                        <Field label="Nome no cartão" placeholder="Como impresso" value="" onChange={() => {}} />
                      </div>
                    )}
                    {method === "pix" && (
                      <div className="text-center p-6 rounded-xl border border-dashed border-border">
                        <div className="size-40 mx-auto rounded-xl bg-foreground grid place-items-center text-background text-xs">QR CODE PIX</div>
                        <p className="mt-3 text-sm text-muted-foreground">Escaneie com o app do seu banco. Aprovação imediata.</p>
                      </div>
                    )}
                    {(method === "gpay" || method === "apay" || method === "paypal") && (
                      <div className="text-center p-6 rounded-xl border border-dashed border-border">
                        <p className="text-sm text-muted-foreground">Você será redirecionado para concluir o pagamento.</p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 rounded-lg glass text-sm font-medium hover:bg-secondary/60">Voltar</button>
              ) : <div />}
              {step < 2 ? (
                <button onClick={() => setStep(step + 1)} className="px-6 py-3 rounded-lg gradient-primary text-white font-semibold shadow-glow hover:scale-[1.02] transition">
                  Continuar
                </button>
              ) : (
                <button onClick={finalize} className="px-6 py-3 rounded-lg gradient-primary text-white font-semibold shadow-glow hover:scale-[1.02] transition">
                  Finalizar Assinatura
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Resumo da compra</h3>
              <div className="flex items-center justify-between py-2 text-sm">
                <span className="text-muted-foreground">Plano {plan.name}</span>
                <span className="font-medium">R${plan.price.toFixed(2).replace(".",",")}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between py-2 text-sm text-emerald-400">
                  <span>Desconto</span>
                  <span>- R${discount.toFixed(2).replace(".",",")}</span>
                </div>
              )}
              <div className="border-t border-border/40 mt-2 pt-3 flex items-center justify-between">
                <span className="font-semibold">Total hoje</span>
                <span className="text-2xl font-bold text-gradient">R${total.toFixed(2).replace(".",",")}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Cupom (tente GAMER10)"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-input/50 border border-border focus:outline-none focus:border-primary" />
                </div>
                <button onClick={applyCoupon} className="px-3 py-2 rounded-lg glass text-xs font-semibold">Aplicar</button>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 space-y-2.5 text-xs">
              <div className="flex items-center gap-2"><Shield className="size-4 text-emerald-400" /> Garantia de 7 dias</div>
              <div className="flex items-center gap-2"><Lock className="size-4 text-emerald-400" /> Pagamento 100% seguro (SSL)</div>
              <div className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> Acesso imediato ao catálogo</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", icon }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</span>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-3 rounded-lg bg-input/50 border border-border focus:outline-none focus:border-primary transition text-sm`} />
      </div>
    </label>
  );
}

function SuccessScreen() {
  return (
    <div className="min-h-screen grid place-items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }}
          className="size-20 rounded-full gradient-primary grid place-items-center mx-auto shadow-glow mb-6">
          <Check className="size-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-3">Bem-vindo ao <span className="text-gradient">World Games RA</span>!</h1>
        <p className="text-muted-foreground mb-8">Sua assinatura está ativa. Hora de jogar.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/dashboard" className="px-6 py-3 rounded-lg gradient-primary text-white font-semibold shadow-glow">Ir para Dashboard</Link>
          <Link to="/games" className="px-6 py-3 rounded-lg glass font-semibold">Explorar Games</Link>
        </div>
      </motion.div>
    </div>
  );
}
