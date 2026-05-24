import { Gamepad2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="size-8 rounded-lg gradient-primary grid place-items-center">
              <Gamepad2 className="size-4 text-white" />
            </div>
            <span className="font-bold">World Games RA</span>
          </div>
          <p className="text-sm text-muted-foreground">O maior universo de games por assinatura.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Produto</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/games" className="hover:text-foreground">Catálogo</Link></li>
            <li><Link to="/plans" className="hover:text-foreground">Planos</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Empresa</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Sobre</li><li>Carreiras</li><li>Imprensa</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Termos</li><li>Privacidade</li><li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        © 2026 World Games RA. Todos os direitos reservados.
      </div>
    </footer>
  );
}
