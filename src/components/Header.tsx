import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import lssLogo from "@/assets/lss-logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Executives", path: "/executives" },
    { name: "Alumni", path: "/alumni" },
    { name: "Merch", path: "/merch" },
    { name: "News", path: "/news" },
    { name: "Admin", path: "/admin" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/70 backdrop-blur-hero supports-[backdrop-filter]:bg-card/60">
      <div className="absolute inset-x-0 top-0 mx-auto h-1 w-10/12 max-w-4xl animate-gradient rounded-full bg-glow-linear opacity-60 blur-xl" />
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 rounded-full px-2 py-1 transition-bounce hover:bg-primary/5"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-primary/20 blur-md transition-smooth group-hover:opacity-80" />
              <img src={lssLogo} alt="LSS Logo" className="relative h-10 w-10 rounded-full border border-primary/20" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-display text-lg font-semibold leading-tight tracking-tight text-primary">LSS</div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Bowen University</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium tracking-wide transition-bounce hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <span
                  className={`absolute inset-0 -z-10 rounded-full transition-smooth ${
                    isActive(link.path)
                      ? "bg-primary/12 shadow-inner-glow"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                {link.name}
                <span className="absolute left-3 right-3 top-[90%] h-px origin-center scale-x-0 bg-primary/40 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
            <Button variant="gold" size="sm" asChild className="ml-2 shadow-gold">
              <Link to="/feedback">Share Feedback</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-muted-foreground transition-bounce hover:border-primary/60 hover:text-primary md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-smooth ${
            mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="mt-2 rounded-2xl border border-border/50 bg-card/90 p-4 shadow-floating-card">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-bounce ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary shadow-inner-glow"
                      : "text-muted-foreground hover:bg-primary/8 hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button variant="gold" size="sm" className="mt-4 w-full shadow-gold" asChild>
              <Link to="/feedback" onClick={() => setMobileMenuOpen(false)}>
                Share Feedback
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
;

export default Header;
