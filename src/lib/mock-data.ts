export type Game = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  rating: number;
  multiplayer: boolean;
  hot?: boolean;
  new?: boolean;
  gradient: string;
  emoji: string;
};

export const GAMES: Game[] = [
  { id: "1", title: "Cyber Nexus", category: "FPS", tags: ["FPS","Multiplayer"], rating: 4.9, multiplayer: true, hot: true, gradient: "from-fuchsia-600 via-purple-700 to-indigo-900", emoji: "🎯" },
  { id: "2", title: "Eldoria Chronicles", category: "RPG", tags: ["RPG","Mundo Aberto"], rating: 4.8, multiplayer: false, gradient: "from-amber-500 via-rose-600 to-purple-900", emoji: "⚔️" },
  { id: "3", title: "Velocity X", category: "Corrida", tags: ["Corrida","Multiplayer"], rating: 4.6, multiplayer: true, new: true, gradient: "from-sky-400 via-blue-600 to-indigo-800", emoji: "🏎️" },
  { id: "4", title: "Hollow Whispers", category: "Terror", tags: ["Terror"], rating: 4.7, multiplayer: false, gradient: "from-zinc-700 via-red-900 to-black", emoji: "👻" },
  { id: "5", title: "Galaxy Outlaws", category: "Mundo Aberto", tags: ["Mundo Aberto","Multiplayer"], rating: 4.9, multiplayer: true, hot: true, gradient: "from-violet-600 via-indigo-700 to-cyan-700", emoji: "🚀" },
  { id: "6", title: "Pixel Forge", category: "Indie", tags: ["Indie"], rating: 4.5, multiplayer: false, gradient: "from-emerald-500 via-teal-600 to-cyan-800", emoji: "🧩" },
  { id: "7", title: "Iron Vanguard", category: "FPS", tags: ["FPS","Multiplayer"], rating: 4.8, multiplayer: true, gradient: "from-orange-500 via-red-600 to-zinc-900", emoji: "🛡️" },
  { id: "8", title: "Mystic Realms", category: "RPG", tags: ["RPG","Multiplayer"], rating: 4.9, multiplayer: true, new: true, gradient: "from-purple-600 via-pink-600 to-rose-800", emoji: "🔮" },
  { id: "9", title: "Asphalt Reign", category: "Corrida", tags: ["Corrida"], rating: 4.4, multiplayer: false, gradient: "from-yellow-400 via-orange-600 to-red-800", emoji: "🏁" },
  { id: "10", title: "Shadow Protocol", category: "FPS", tags: ["FPS"], rating: 4.7, multiplayer: false, gradient: "from-slate-700 via-zinc-800 to-black", emoji: "🕶️" },
  { id: "11", title: "Neon Drift", category: "Indie", tags: ["Indie","Corrida"], rating: 4.6, multiplayer: false, hot: true, gradient: "from-pink-500 via-fuchsia-600 to-violet-800", emoji: "🌆" },
  { id: "12", title: "Beast Hunters", category: "Mundo Aberto", tags: ["Mundo Aberto","RPG","Multiplayer"], rating: 4.8, multiplayer: true, gradient: "from-lime-500 via-green-700 to-emerald-900", emoji: "🐉" },
];

export const CATEGORIES = ["Todos","RPG","FPS","Corrida","Terror","Mundo Aberto","Multiplayer","Indie"];

export type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  monthly: number;
  badge?: string;
  savings?: string;
  highlighted?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  { id: "monthly", name: "Mensal", price: 39.90, period: "/mês", monthly: 39.90, features: ["Acesso a 5.000+ jogos","Multiplayer online","Cloud saves","1 dispositivo"] },
  { id: "quarterly", name: "Trimestral", price: 99.90, period: "/trim", monthly: 33.30, badge: "Mais Popular", savings: "Economize 16%", highlighted: true, features: ["Tudo do Mensal","Lançamentos no day-one","2 dispositivos","Suporte prioritário"] },
  { id: "semester", name: "Semestral", price: 179.90, period: "/6 meses", monthly: 29.98, savings: "Economize 25%", features: ["Tudo do Trimestral","Beta acesso antecipado","3 dispositivos","Conteúdo exclusivo"] },
  { id: "yearly", name: "Anual", price: 299.90, period: "/ano", monthly: 24.99, badge: "Melhor Economia", savings: "Economize 37%", features: ["Tudo do Semestral","Dispositivos ilimitados","Skins exclusivas","Eventos VIP"] },
];

export const TESTIMONIALS = [
  { name: "Lucas R.", role: "Streamer", text: "Melhor custo-benefício do mercado. Catálogo absurdo e zero lag.", avatar: "🎮" },
  { name: "Marina S.", role: "Casual gamer", text: "Saí do Game Pass pelo World Games RA. Vale cada centavo.", avatar: "🕹️" },
  { name: "Felipe K.", role: "Competitivo", text: "Servidores top, matchmaking justo. Recomendo demais.", avatar: "🏆" },
];

export const FAQ = [
  { q: "Como funciona a assinatura?", a: "Você paga um valor único e tem acesso a todo o catálogo durante o período do plano. Sem taxas extras." },
  { q: "Posso cancelar quando quiser?", a: "Sim, o cancelamento é imediato e sem multa. Você mantém o acesso até o fim do ciclo pago." },
  { q: "Os jogos rodam no meu PC?", a: "Sim! Streaming via cloud — qualquer dispositivo com internet roda em ultra." },
  { q: "Quantos dispositivos posso usar?", a: "Depende do plano. O anual libera dispositivos ilimitados." },
  { q: "Tem garantia?", a: "7 dias de garantia incondicional. Devolução total se não amar." },
];
