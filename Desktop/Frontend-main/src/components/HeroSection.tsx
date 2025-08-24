import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Utensils } from "lucide-react";

interface HeroSectionProps {
  onOpenDonateForm: () => void;
  onOpenReceiveForm: () => void;
}

const HeroSection = ({ onOpenDonateForm, onOpenReceiveForm }: HeroSectionProps) => {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-warm rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-fresh rounded-full blur-3xl opacity-20" />
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Zero Hunger
            </span>
            <br />
            <span className="text-foreground">
              One Meal at a Time
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect surplus food from restaurants, hotels, and caterers with those in need. 
            Building a hunger-free community together.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={onOpenDonateForm}
              size="lg"
              className="bg-gradient-primary hover:shadow-food text-lg px-8 py-6 h-auto"
            >
              <Utensils className="w-5 h-5 mr-2" />
              Donate Food
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              onClick={onOpenReceiveForm}
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-white text-lg px-8 py-6 h-auto"
            >
              <Users className="w-5 h-5 mr-2" />
              Receive Food
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Meals Donated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-muted-foreground">Partner Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-muted-foreground">Communities Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;