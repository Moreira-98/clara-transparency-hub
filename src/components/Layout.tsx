import { Link, useLocation } from "react-router-dom";
import { Home, Search, Wallet, FileText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import claraLogo from "@/assets/clara-logo.png";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/explorar", icon: Search, label: "Explorar Blocos" },
    { path: "/blocos", icon: Wallet, label: "Blocos de Liquidez" },
    { path: "/relatorios", icon: FileText, label: "Relatórios" },
    { path: "/gestora", icon: BarChart3, label: "Painel da Gestora" },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={claraLogo} alt="Clara" className="h-8" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden md:block">
              <p className="font-semibold">Investidor Qualificado</p>
              <p className="text-xs text-muted-foreground">ID: INV-2024-001</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
