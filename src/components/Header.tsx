import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Headphones } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Podcasts", href: "/podcasts" },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <img 
          src="/lovable-uploads/b1b81787-d5f8-4d2d-9baa-329f8fc03004.png" 
          alt="Bigg's Media" 
          className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Bigg's Media
        </h1>
        <p className="text-xs text-muted-foreground">Cultures de la diaspora</p>
      </div>
    </Link>
  );

  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => (
    <Link
      to={href}
      onClick={() => mobile && setIsOpen(false)}
      className={`
        relative px-3 py-2 rounded-lg font-medium transition-all duration-300
        ${isActive(href) 
          ? "text-primary bg-primary/10" 
          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
        }
        ${mobile ? "block w-full text-left" : ""}
      `}
    >
      {label}
      {isActive(href) && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-accent rounded-full" />
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" size="sm" className="group">
            <Headphones className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
            Écouter
          </Button>
          <Button size="sm" className="bg-gradient-podcast text-white hover:shadow-glow transition-all duration-300">
            Newsletter
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <Logo />
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} mobile />
                ))}
              </nav>
              <div className="flex flex-col space-y-3 pt-6">
                <Button variant="outline" className="w-full">
                  <Headphones className="h-4 w-4 mr-2" />
                  Écouter
                </Button>
                <Button className="w-full bg-gradient-podcast text-white">
                  Newsletter
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;