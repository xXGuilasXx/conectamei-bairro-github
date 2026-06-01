import { Link, useLocation } from "wouter";
import { Home, Search, FileText, MessageSquare, ClipboardList, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/catalogo", label: "Catálogo", icon: Search },
  { href: "/solicitar-orcamento", label: "Orçamento", icon: FileText },
  { href: "/pedidos", label: "Pedidos", icon: ClipboardList },
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-150">
              <span className="text-white font-extrabold text-sm">CM</span>
            </div>
            <span className="font-extrabold text-lg text-foreground tracking-tight hidden sm:block">
              ConectaMEI <span className="text-primary">Bairro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = location === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-white px-4 pb-4 pt-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = location === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            ConectaMEI Bairro &mdash; Conectando moradores a profissionais da sua comunidade.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            MVP acadêmico &bull; Projeto de Inovação e Empreendedorismo &bull; 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
