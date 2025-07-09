
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import UserButton from "./UserButton";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/hooks/useI18n";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/efe2ceef-7788-4a2e-b05e-99ffc2602b4c.png" 
              alt="Bigg's Media Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-xl">Bigg's Media</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/podcasts" className="text-foreground hover:text-primary transition-colors">
            {t('nav.podcasts')}
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageToggle />
          <UserButton />
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
            <Link 
              to="/podcasts" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.podcasts')}
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <div className="pt-4 border-t flex flex-col space-y-4">
              <LanguageToggle />
              <UserButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
