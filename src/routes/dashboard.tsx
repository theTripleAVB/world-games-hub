import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CreditCard, Library, Settings as SettingsIcon, Shield, User } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { GAMES, PLANS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const TABS = [
  { id: "library", label: "Biblioteca", icon: Library },
  { id: "plan", label: "Meu Plano", icon: CreditCard },
  { id: "profile", label: "Perfil", icon: User },
  { id: "settings", label: "Configurações", icon: SettingsIcon },
];

function Dashboard() {
  const [tab, setTab] = useState("library");
  const { user, selectedPlanId, theme, toggleTheme } = useApp();
  const plan = PLANS.find((p) => p.id === selectedPlanId) ?? PLANS[1];
  const name = user?.name ?? "Player One";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs text-muted-foreground">Bem-vindo de volta,</div>
            <h1 className="text-3xl md:text-4xl font-bold">{name} 👋</h1>
          </div>
          <Link to="/games" className="px-5 py-2.5 rounded-lg gradient-primary text-white font-semibold text-sm shadow-glow">Explorar games</Link>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <aside className="glass rounded-2xl p-3 h-fit">
            <nav className="space-y-1">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    tab === t.id ? "gradient-primary text-white shadow-glow" : "hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
                  }`}>
                  <t.icon className="size-4" /> {t.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="space-y-6">
            {tab === "library" && (
              <>
                <SectionTitle title="Sua biblioteca" sub="Continue jogando ou descubra algo novo" />
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {GAMES.slice(0, 8).map((g) => <GameCard key={g.id} game={g} />)}
                </div>
              </>
            )}

            {tab === "plan" && (
              <>
                <SectionTitle title="Meu plano" sub="Detalhes da sua assinatura" />
                <div className="glass-strong rounded-2xl p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div>
                      <div className="text-xs text-muted-foreground">Plano atual</div>
                      <div className="text-2xl font-bold">{plan.name}</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ativo
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Stat label="Próxima cobrança" value="15/06/2026" />
                    <Stat label="Valor" value={`R$${plan.price.toFixed(2).replace(".", ",")}`} />
                    <Stat label="Ciclo" value={plan.period.replace("/", "")} />
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link to="/plans" className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-semibold">Alterar plano</Link>
                    <button className="px-4 py-2 rounded-lg glass text-sm font-medium">Cancelar assinatura</button>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Histórico de pagamentos</h3>
                  <div className="space-y-2">
                    {[
                      ["15/05/2026", "Cartão •••• 4242", plan.price],
                      ["15/04/2026", "PIX", plan.price],
                      ["15/03/2026", "Cartão •••• 4242", plan.price],
                    ].map(([date, m, v], i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                        <div>
                          <div className="text-sm font-medium">{date}</div>
                          <div className="text-xs text-muted-foreground">{m}</div>
                        </div>
                        <div className="text-sm font-semibold">R${(v as number).toFixed(2).replace(".", ",")}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "profile" && (
              <>
                <SectionTitle title="Perfil" sub="Seus dados pessoais" />
                <div className="glass-strong rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="size-20 rounded-2xl gradient-primary grid place-items-center text-3xl shadow-glow">🎮</div>
                    <div>
                      <div className="text-lg font-bold">{name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email ?? "player@worldgames.ra"}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ProfileField label="Nome" value={name} />
                    <ProfileField label="E-mail" value={user?.email ?? "player@worldgames.ra"} />
                    <button className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-semibold">Alterar senha</button>
                  </div>
                </div>
              </>
            )}

            {tab === "settings" && (
              <>
                <SectionTitle title="Configurações" sub="Personalize sua experiência" />
                <div className="glass-strong rounded-2xl divide-y divide-border/40">
                  <SettingRow icon={theme === "dark" ? "🌙" : "☀️"} title="Tema" desc="Alternar entre claro e escuro">
                    <button onClick={toggleTheme} className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-semibold">
                      {theme === "dark" ? "Escuro" : "Claro"}
                    </button>
                  </SettingRow>
                  <SettingRow icon={<Bell className="size-5" />} title="Notificações" desc="Receba alertas de novos jogos">
                    <Toggle defaultOn />
                  </SettingRow>
                  <SettingRow icon={<Shield className="size-5" />} title="Autenticação em 2 fatores" desc="Adicione uma camada extra de segurança">
                    <Toggle />
                  </SettingRow>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-bold mt-1">{value}</div>
    </div>
  );
}
function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="px-3 py-2.5 rounded-lg bg-input/50 border border-border text-sm">{value}</div>
    </div>
  );
}
function SettingRow({ icon, title, desc, children }: { icon: React.ReactNode; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-5 gap-4">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-secondary grid place-items-center">{icon}</div>
        <div>
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition ${on ? "gradient-primary" : "bg-secondary"}`}>
      <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}
