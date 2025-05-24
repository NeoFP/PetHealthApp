"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Heart,
  Shield,
  Users,
  Star,
  CheckCircle,
  Camera,
  MessageSquare,
  Utensils,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
  Menu,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to prevent hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (mounted && !loading && isLoggedIn) {
      router.push("/dashboard");
    }
  }, [mounted, loading, isLoggedIn, router]);

  // Show loading or nothing during SSR and initial hydration
  if (!mounted || loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Don't render content if user is logged in (they'll be redirected)
  if (isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                Pet Health
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                asChild
                variant="ghost"
                className="text-gray-600 hover:text-green-600"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium">
                  <Activity className="h-4 w-4 mr-2" />
                  Trusted by 20,000+ Pet Owners
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Pet's <span className="text-green-600">Health</span> is
                  Our Priority
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Advanced AI-powered health monitoring, personalized nutrition
                  plans, and expert veterinary guidance - all in one
                  comprehensive platform designed to keep your beloved pets
                  healthy, happy, and thriving.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 h-14 px-8 text-lg font-semibold"
                >
                  <Link href="/signup">
                    Start Your Free Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg border-2 hover:bg-green-50"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Free to get started
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  No credit card required
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src="/dashboard-dog.png"
                  alt="Happy healthy dog"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {/* Floating cards */}
              <div className="absolute top-8 -left-4 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Health Score</p>
                    <p className="text-green-600 font-bold">98% Excellent</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 -right-4 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Daily Activity</p>
                    <p className="text-blue-600 font-bold">2.5 hrs completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">20,000+</div>
              <div className="text-green-100">Happy Pet Owners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-green-100">Health Analyses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,500+</div>
              <div className="text-green-100">Veterinarians</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-green-100">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything Your Pet Needs in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered tools and expert resources
              helps you provide the best possible care for your furry family
              members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="text-xl">AI Disease Detection</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Advanced symptom analysis powered by machine learning to
                  identify potential health issues early and accurately.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Symptom-based analysis</li>
                  <li>• Early detection alerts</li>
                  <li>• Vet-approved recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-xl">Smart Nutrition Plans</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Personalized nutrition recommendations tailored to your pet's
                  age, breed, weight, and health conditions.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Breed-specific diets</li>
                  <li>• Health condition support</li>
                  <li>• Portion control guidance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-xl">Skin Analysis Tool</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Upload photos for instant skin condition analysis and receive
                  detailed treatment recommendations.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Photo-based diagnosis</li>
                  <li>• Instant results</li>
                  <li>• Treatment suggestions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle className="text-xl">Activity Planning</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Customized exercise routines and activity plans to keep your
                  pet physically fit and mentally stimulated.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Breed-appropriate exercises</li>
                  <li>• Age-adjusted activities</li>
                  <li>• Weather considerations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-xl">24/7 AI Vet Chat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Get instant answers to your pet health questions from our AI
                  veterinary assistant, available anytime.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Instant responses</li>
                  <li>• Expert knowledge base</li>
                  <li>• Emergency guidance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-indigo-500" />
                </div>
                <CardTitle className="text-xl">Health Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Track your pet's health metrics, medications, and vet visits
                  all in one secure, organized platform.
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Health record management</li>
                  <li>• Medication reminders</li>
                  <li>• Appointment scheduling</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Pet Health Companion Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to better pet health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Create Your Pet Profile
              </h3>
              <p className="text-gray-600">
                Sign up and add your pet's basic information including breed,
                age, weight, and any existing health conditions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Use AI-Powered Tools
              </h3>
              <p className="text-gray-600">
                Access our comprehensive suite of health analysis tools,
                nutrition planners, and expert guidance systems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Get Personalized Care
              </h3>
              <p className="text-gray-600">
                Receive tailored recommendations, health insights, and
                actionable advice to keep your pet healthy and happy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Pet Owners Everywhere
            </h2>
            <p className="text-xl text-gray-600">
              See what pet parents are saying about Pet Health Companion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "The AI disease detection caught my dog's early symptoms
                  before I even noticed. The vet confirmed it was the right
                  call. This app literally saved my pet's life!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-green-600">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Martinez</p>
                    <p className="text-sm text-gray-500">
                      Golden Retriever Owner
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "The nutrition planner transformed my cat's health. She's more
                  energetic and her coat is shinier than ever. The personalized
                  meal plans are incredible!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-600">DJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">David Johnson</p>
                    <p className="text-sm text-gray-500">Persian Cat Parent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "As a busy professional, having 24/7 access to veterinary
                  guidance gives me peace of mind. The chatbot is incredibly
                  knowledgeable and helpful."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-purple-600">EL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Emily Chen</p>
                    <p className="text-sm text-gray-500">Border Collie Mom</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Pet's Health Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Join thousands of pet owners who trust Pet Health Companion for
            their furry family members. Start your free journey today and give
            your pet the care they deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 h-14 px-12 text-lg font-semibold"
            >
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 h-14 px-8 text-lg"
            >
              <Link href="/login">I Already Have an Account</Link>
            </Button>
          </div>
          <p className="text-green-100 text-sm mt-6">
            No credit card required • Free forever plan available • Cancel
            anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">Pet Health</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering pet owners with AI-driven health insights and expert
                veterinary guidance to ensure every pet lives their healthiest,
                happiest life.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Disease Detection
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Nutrition Planning
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Skin Analysis
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Activity Planner
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    AI Vet Chat
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Health Monitoring
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Emergency Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Vet Directory
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-PETS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" />
                  <span>support@pethealth.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Emergency Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 Pet Health Companion. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
