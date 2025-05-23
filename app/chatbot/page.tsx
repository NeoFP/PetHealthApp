"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, RefreshCw, Bot, User } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hello! I'm your Pet Health assistant. How can I help you with your pet today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let response = "";

      // Simple rule-based responses
      const lowerInput = input.toLowerCase();

      if (
        lowerInput.includes("food") ||
        lowerInput.includes("diet") ||
        lowerInput.includes("eat")
      ) {
        response =
          "A balanced diet is crucial for your pet's health. For dogs, look for high-quality food with real meat as the first ingredient. The amount depends on your dog's age, size, and activity level. Always ensure fresh water is available.";
      } else if (
        lowerInput.includes("vaccination") ||
        lowerInput.includes("vaccine") ||
        lowerInput.includes("shot")
      ) {
        response =
          "Regular vaccinations are essential to protect your pet from serious diseases. Core vaccines for dogs include rabies, distemper, parvovirus, and adenovirus. Speak with your veterinarian about a vaccination schedule appropriate for your pet's age and lifestyle.";
      } else if (
        lowerInput.includes("flea") ||
        lowerInput.includes("tick") ||
        lowerInput.includes("parasite")
      ) {
        response =
          "Fleas and ticks can cause discomfort and transmit diseases. Year-round prevention is recommended for most areas. Options include topical treatments, oral medications, and collars. Consult your vet for the best option for your pet.";
      } else if (
        lowerInput.includes("training") ||
        lowerInput.includes("behavior")
      ) {
        response =
          "Positive reinforcement training is the most effective and humane approach. Reward good behavior with treats, praise, or play. Consistency is key - ensure all family members use the same commands and rules. For serious behavioral issues, consider working with a professional trainer.";
      } else {
        response =
          "Thank you for your question. To provide the most accurate information, I recommend consulting with a veterinarian. They can offer personalized advice based on your pet's specific health needs and history.";
      }

      // Add bot response
      const botMessage: Message = {
        role: "bot",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        role: "bot",
        content:
          "Hello! I'm your Pet Health assistant. How can I help you with your pet today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col h-[80vh]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Chat with Vet Assistant</h1>
          <p className="text-lg text-muted-foreground">
            Ask questions about your pet's health and wellness
          </p>
        </div>

        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <CardTitle>Pet Health Assistant</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={resetConversation}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Chat
              </Button>
            </div>
            <CardDescription>
              Ask about nutrition, care tips, symptoms, or general pet health
              questions
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-lg p-3 
                    ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === "bot" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.role === "bot" ? "Assistant" : "You"}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="text-right">
                    <span className="text-xs opacity-50">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted max-w-[80%] rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span className="text-xs opacity-70">Assistant</span>
                  </div>
                  <div className="py-2">
                    <LoadingSpinner size="sm" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="border-t pt-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
