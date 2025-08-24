import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DailyDonorList from "@/components/DailyDonorList";
import MapSection from "@/components/MapSection";
import ContactSection from "@/components/ContactSection";
import ChatBot from "@/components/ChatBot";
import AuthModal from "@/components/AuthModal";
import DonationForm from "@/components/DonationForm";
import ReceiveForm from "@/components/ReceiveForm";

const Index = () => {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: "login" | "signup" }>({
    isOpen: false,
    type: "login"
  });
  const [donationFormOpen, setDonationFormOpen] = useState(false);
  const [receiveFormOpen, setReceiveFormOpen] = useState(false);

  const handleOpenAuth = (type: "login" | "signup") => {
    setAuthModal({ isOpen: true, type });
  };

  const handleCloseAuth = () => {
    setAuthModal({ isOpen: false, type: "login" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenDonateForm={() => setDonationFormOpen(true)}
        onOpenReceiveForm={() => setReceiveFormOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onOpenDonateForm={() => setDonationFormOpen(true)}
          onOpenReceiveForm={() => setReceiveFormOpen(true)}
        />

        {/* Daily Donor List */}
        <DailyDonorList />

        {/* Map Section */}
        <MapSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Mealink
            </span>
          </div>
          <p className="text-muted-foreground mb-4">
            Connecting surplus food with those in need. Building a hunger-free community together.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © 2024 Mealink. All rights reserved. | Contributing to UN SDG Goal 2: Zero Hunger
            </p>
          </div>
        </div>
      </footer>

      {/* Modals and Forms */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={handleCloseAuth}
        defaultTab={authModal.type}
      />

      <DonationForm
        isOpen={donationFormOpen}
        onClose={() => setDonationFormOpen(false)}
      />

      <ReceiveForm
        isOpen={receiveFormOpen}
        onClose={() => setReceiveFormOpen(false)}
      />

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
