"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  // Don't show anything if user is logged in (they'll be redirected)
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Activity className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-5xl font-bold text-green-800 mb-6">
            Pet Health Companion
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your comprehensive solution for pet wellness and care. Get
            AI-powered health insights, nutrition plans, and expert guidance to
            keep your beloved pets healthy and happy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-700 hover:bg-green-800 h-14 px-8 text-lg"
            >
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg border-2"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-2 hover:border-green-300 transition-colors">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-lg">Disease Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                AI-powered symptom analysis to identify potential health issues
                early
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-300 transition-colors">
            <CardHeader className="text-center">
              <Activity className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-lg">Nutrition Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Personalized nutrition plans tailored to your pet's specific
                needs
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-300 transition-colors">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="text-lg">Skin Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Upload photos for instant skin condition analysis and treatment
                advice
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-300 transition-colors">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className="text-lg">Expert Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                24/7 AI veterinary assistant for instant answers to your
                questions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-green-50 rounded-lg p-12 border-2 border-green-200">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of pet owners who trust Pet Health Companion for
            their pet's wellbeing
          </p>
          <Button
            asChild
            size="lg"
            className="bg-green-700 hover:bg-green-800 h-14 px-12 text-lg"
          >
            <Link href="/signup">Create Your Free Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
