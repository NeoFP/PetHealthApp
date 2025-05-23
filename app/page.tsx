"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  // In a real app, check if user is logged in
  const isLoggedIn = false;

  useEffect(() => {
    // Auto-redirect if logged in
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-green-700" />
            <span className="text-xl font-bold text-green-800">Pet Health</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-green-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-green-800 mb-6">
              Complete Pet Health Management
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Nutrition planning, disease detection, skin analysis, and
              personalized care recommendations for your beloved pets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-green-700 hover:bg-green-800"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Complete Pet Health Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-3">Disease Detection</h3>
                <p className="text-gray-600">
                  Early identification of potential health issues through
                  symptom analysis.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-3">Nutrition Planner</h3>
                <p className="text-gray-600">
                  Customized meal plans based on your pet's specific needs and
                  preferences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-3">Skin Disease Tool</h3>
                <p className="text-gray-600">
                  Analyze skin conditions with our advanced image recognition
                  technology.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-3">Health Chatbot</h3>
                <p className="text-gray-600">
                  Get instant answers to your pet health questions from our AI
                  assistant.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-6 w-6" />
                <span className="text-xl font-bold">Pet Health</span>
              </div>
              <p className="max-w-md text-green-100">
                Your comprehensive solution for pet health management and care.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Features</h3>
                <ul className="space-y-2 text-green-100">
                  <li>Disease Detection</li>
                  <li>Nutrition Planner</li>
                  <li>Skin Disease Tool</li>
                  <li>Health Chatbot</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2 text-green-100">
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="space-y-2 text-green-100">
                  <li>Help Center</li>
                  <li>FAQs</li>
                  <li>Contact Support</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-12 pt-6 text-center text-green-100">
            <p>© 2023 Pet Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
