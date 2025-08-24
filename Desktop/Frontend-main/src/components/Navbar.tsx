import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  onOpenAuth: (type: "login" | "signup") => void;
  onOpenDonateForm: () => void;
  onOpenReceiveForm: () => void;
}

const Navbar = ({ onOpenAuth, onOpenDonateForm, onOpenReceiveForm }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({ mobile = false, onClose = () => {} }) => (
    <div className={`${mobile ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-8"}`}>
      <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium" onClick={onClose}>
        Home
      </a>
      <Button
        variant="ghost"
        onClick={() => {
          onOpenDonateForm();
          onClose();
        }}
        className="text-foreground hover:text-primary hover:bg-primary/10"
      >
        <Heart className="w-4 h-4 mr-2" />
        Donate Food
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          onOpenReceiveForm();
          onClose();
        }}
        className="text-foreground hover:text-secondary hover:bg-secondary/10"
      >
        <MapPin className="w-4 h-4 mr-2" />
        Receive Food
      </Button>
      <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium" onClick={onClose}>
        Contact
      </a>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Mealink
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => onOpenAuth("login")}>
              Login
            </Button>
            <Button onClick={() => onOpenAuth("signup")} className="bg-gradient-primary hover:shadow-food">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Mealink
                  </span>
                </div>
                
                <NavLinks mobile onClose={() => setIsOpen(false)} />
                
                <div className="flex flex-col space-y-3 pt-6 border-t border-border">
                  <Button variant="ghost" onClick={() => { onOpenAuth("login"); setIsOpen(false); }}>
                    Login
                  </Button>
                  <Button onClick={() => { onOpenAuth("signup"); setIsOpen(false); }} className="bg-gradient-primary hover:shadow-food">
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;