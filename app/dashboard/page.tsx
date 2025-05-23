"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Shield, Clock, Flame } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl font-bold text-green-800 leading-tight">
                    Safe & wholesome nutrition, in your hands
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    From recipe development to at-home preparation, we're
                    providing you with the trusted resources you need to create
                    quality, balanced meals for your dog or cat.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-green-700 hover:bg-green-800 h-14 px-8 text-lg font-medium"
                    >
                      <Link href="/nutrition-planner">GET STARTED</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-14 px-8 text-lg border-2 bg-white hover:bg-gray-50"
                    >
                      <Link href="/disease-detection">CHECK HEALTH</Link>
                    </Button>
                  </div>
                  <div className="flex items-center text-base text-green-800 font-medium">
                    <Heart
                      className="h-5 w-5 mr-3 text-green-700"
                      fill="currentColor"
                    />
                    Highly trusted by 20,000+ veterinarians
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-sm h-80 lg:h-96">
                    <Image
                      src="/dashboard-dog.png"
                      alt="Happy dog with nutritious food"
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                      className="drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">
              Build a balanced recipe
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A powerful recipe generator for veterinarians and dog & cat lovers
              to find the perfect proportions of meat, veggies and more —
              tailored to your companion's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  Instant custom recipes
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Generate tailored nutrition plans based on your pet's specific
                  needs
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  All essential nutrients
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Complete and balanced meals with all the vitamins and minerals
                  your pet needs
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  Food-grade ingredients
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Human-quality ingredients that are safe and wholesome for your
                  pet
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  Vet Nutritionist approved
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All plans are reviewed and approved by certified veterinary
                  nutritionists
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-green-700 hover:bg-green-800 h-14 px-10 text-lg font-medium"
            >
              <Link href="/nutrition-planner">
                FIND YOUR RECIPE
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">
                Latest Health Articles
              </CardTitle>
              <CardDescription className="text-base">
                Stay informed about pet health and nutrition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">
                    The Benefits of Fresh Food Diets for Dogs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Learn why fresh, homemade meals can improve your dog's
                    health and vitality
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">
                    Common Food Allergies in Cats
                  </h3>
                  <p className="text-sm text-gray-600">
                    Identifying and managing food sensitivities in your feline
                    friend
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">
                    Essential Nutrients Every Dog Diet Needs
                  </h3>
                  <p className="text-sm text-gray-600">
                    A comprehensive guide to canine nutrition requirements
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full h-12">
                Read All Articles
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white border-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">
                Your Pet's Health Dashboard
              </CardTitle>
              <CardDescription className="text-base">
                Monitor and manage your pet's wellbeing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-medium mb-1">Next Vet Checkup</h3>
                    <p className="text-sm text-gray-600">
                      Reminder for Buddy's annual vaccination
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                    In 2 weeks
                  </span>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-medium mb-1">Weight Tracking</h3>
                    <p className="text-sm text-gray-600">Current: 28.5 kg</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Healthy
                  </span>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-medium mb-1">Medication Reminders</h3>
                    <p className="text-sm text-gray-600">
                      Heartworm prevention due tomorrow
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full h-12">
                <Link href="/profile">Manage Health Records</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
