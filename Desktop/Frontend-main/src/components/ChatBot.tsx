import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hi! I'm MealBot 🤖 How can I help you today? I can assist with food donations, receiving food, or answer any questions about Mealink!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickReplies = [
    "How to donate food?",
    "How to receive food?",
    "Food safety guidelines",
    "Emergency food support",
    "Contact support"
  ];

  const botResponses: Record<string, string> = {
    "how to donate food": "Great! To donate food: 1) Sign up as a donor 2) Click 'Donate Food' 3) Fill in food details, quantity, and pickup location 4) Your donation will appear on our daily donor list for receivers to see!",
    "how to receive food": "To receive food: 1) Sign up as a receiver 2) Click 'Receive Food' 3) Fill in your requirements and location 4) We'll connect you with nearby donors who have available food!",
    "food safety guidelines": "Food safety is our priority! ✅ Only donate freshly prepared food ✅ Mention preparation time ✅ Use clean containers ✅ Ensure pickup within safe time limits ✅ Follow local health guidelines",
    "emergency food support": "For urgent food needs, call our 24/7 helpline: +91 98765 43210. We'll immediately connect you with available donors in your area.",
    "contact support": "You can reach us at: 📞 +91 98765 43210 📧 support@mealink.org 🕒 24/7 support available"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple bot response logic
    setTimeout(() => {
      const lowerMessage = inputMessage.toLowerCase();
      let botResponse = "I understand you're asking about '" + inputMessage + "'. Let me help you with that! For specific assistance, please use our quick replies below or contact our support team.";

      // Check for keyword matches
      for (const [key, response] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key.toLowerCase())) {
          botResponse = response;
          break;
        }
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-primary hover:shadow-food hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        {!isOpen && (
          <Badge className="absolute -top-2 -left-2 bg-non-veg animate-pulse">
            AI
          </Badge>
        )}
      </div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md w-full h-[600px] p-0 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">MealBot Assistant</h3>
                <p className="text-xs opacity-90">Always here to help!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === "bot" ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="p-4 border-t">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs h-auto py-1 px-2"
                >
                  {reply}
                </Button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-gradient-primary hover:shadow-food"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;