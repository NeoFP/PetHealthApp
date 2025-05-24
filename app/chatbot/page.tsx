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
import { Send, RefreshCw, Bot, User, AlertTriangle } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "@/components/ui/notification";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  id: string;
}

const STORAGE_KEY = "petHealthChatMessages";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      } else {
        // Initialize with welcome message if no stored messages
        const welcomeMessage: Message = {
          id: `bot-${Date.now()}`,
          role: "bot",
          content:
            "Hello! I'm your Pet Health assistant. How can I help you with your pet today?",
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeMessage]));
      }
    } catch (error) {
      console.error("Error loading messages from localStorage:", error);
      // Fallback to welcome message
      const welcomeMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content:
          "Hello! I'm your Pet Health assistant. How can I help you with your pet today?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Error saving messages to localStorage:", error);
      }
    }
  }, [messages]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const question = input.trim();

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Make API call
      const response = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();

      // Add bot response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content:
          result.answer ||
          "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat API Error:", error);

      // Add error message
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        role: "bot",
        content:
          "I apologize, but I'm having trouble connecting to the server right now. Please make sure the API server is running and try again. If the problem persists, you can still use other features of the Pet Health app.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      toast.error(
        "Failed to get response from chat API. Please check if the server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetConversation = () => {
    const welcomeMessage: Message = {
      id: `bot-${Date.now()}`,
      role: "bot",
      content:
        "Hello! I'm your Pet Health assistant. How can I help you with your pet today?",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeMessage]));
    toast.success("Chat conversation has been reset.");
  };

  const clearAllMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("All chat history has been cleared.");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex justify-center items-center min-h-screen p-8 w-full">
        <div className="w-full max-w-5xl h-[85vh] flex flex-col">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Chat with Vet Assistant
            </h1>
            <p className="text-lg text-gray-600">
              Ask questions about your pet's health, nutrition, symptoms, and
              wellness
            </p>
          </div>

          <Card className="flex-1 flex flex-col bg-white border-2">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Bot className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-green-800">
                      Pet Health Assistant
                    </CardTitle>
                    <CardDescription className="text-base">
                      AI-powered veterinary guidance for your pet
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetConversation}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllMessages}
                  >
                    Clear History
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      No messages yet. Start a conversation!
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[80%] rounded-2xl p-4 shadow-sm
                        ${
                          message.role === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-800 border"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.role === "bot" ? (
                          <Bot className="h-5 w-5 text-green-600" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                        <span className="text-sm font-medium">
                          {message.role === "bot"
                            ? "Pet Health Assistant"
                            : "You"}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed text-base">
                        {message.content}
                      </p>
                      <div className="text-right mt-2">
                        <span
                          className={`text-xs ${
                            message.role === "user"
                              ? "text-green-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 border max-w-[80%] rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">
                        Pet Health Assistant
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span className="text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            <CardFooter className="border-t pt-4 pb-4">
              <div className="flex w-full items-end space-x-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about your pet's health, symptoms, nutrition, or care tips..."
                  disabled={isLoading}
                  className="flex-1 h-12 text-base rounded-xl"
                  maxLength={500}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="h-12 px-6 bg-green-700 hover:bg-green-800 rounded-xl"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  <span className="sr-only">Send message</span>
                </Button>
              </div>

              {/* Character count and status */}
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <span>{input.length}/500 characters</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isLoading ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  />
                  <span>{isLoading ? "Processing..." : "Ready"}</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Disclaimer */}
          <div className="mt-6 p-4 border-2 rounded-lg bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-1 text-base">
                  Important Notice
                </h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  This AI assistant provides general pet health information and
                  should not replace professional veterinary advice. For
                  emergencies or serious health concerns, please contact your
                  veterinarian immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
