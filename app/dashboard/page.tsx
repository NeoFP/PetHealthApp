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
    <div className="container max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-8 py-8 md:py-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-green-800">
            Safe & wholesome nutrition, in your hands
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            From recipe development to at-home preparation, we're providing you
            with the trusted resources you need to create quality, balanced
            meals for your dog or cat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-green-700 hover:bg-green-800"
            >
              <Link href="/nutrition-planner">GET STARTED</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/disease-detection">CHECK HEALTH</Link>
            </Button>
          </div>
          <div className="flex items-center text-sm text-green-800 font-medium">
            <Heart
              className="h-4 w-4 mr-2 text-green-700"
              fill="currentColor"
            />
            Highly trusted by 20,000+ veterinarians
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative h-[400px] w-full">
            <Image
              src="/dashboard-dog.png"
              alt="Dog with food bowl"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-12 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Build a balanced recipe
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            A powerful recipe generator for veterinarians and dog & cat lovers
            to find the perfect proportions of meat, veggies and more — tailored
            to your companion's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="bg-green-50 border-0">
            <CardContent className="pt-6">
              <div className="bg-green-800/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-green-700" />
              </div>
              <h3 className="font-bold mb-2">Instant custom recipes</h3>
              <p className="text-gray-600 text-sm">
                Generate tailored nutrition plans based on your pet's specific
                needs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-0">
            <CardContent className="pt-6">
              <div className="bg-green-800/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Flame className="h-7 w-7 text-green-700" />
              </div>
              <h3 className="font-bold mb-2">All essential nutrients</h3>
              <p className="text-gray-600 text-sm">
                Complete and balanced meals with all the vitamins and minerals
                your pet needs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-0">
            <CardContent className="pt-6">
              <div className="bg-green-800/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-green-700" />
              </div>
              <h3 className="font-bold mb-2">Food-grade ingredients</h3>
              <p className="text-gray-600 text-sm">
                Human-quality ingredients that are safe and wholesome for your
                pet
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-0">
            <CardContent className="pt-6">
              <div className="bg-green-800/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-7 w-7 text-green-700" />
              </div>
              <h3 className="font-bold mb-2">Vet Nutritionist approved</h3>
              <p className="text-gray-600 text-sm">
                All plans are reviewed and approved by certified veterinary
                nutritionists
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-green-700 hover:bg-green-800 px-8"
          >
            <Link href="/nutrition-planner">
              FIND YOUR RECIPE
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Latest Health Articles</CardTitle>
            <CardDescription>
              Stay informed about pet health and nutrition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-medium text-green-800 mb-1">
                  The Benefits of Fresh Food Diets for Dogs
                </h3>
                <p className="text-sm text-gray-600">
                  Learn why fresh, homemade meals can improve your dog's health
                </p>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-medium text-green-800 mb-1">
                  Common Food Allergies in Cats
                </h3>
                <p className="text-sm text-gray-600">
                  Identifying and managing food sensitivities in your feline
                  friend
                </p>
              </div>
              <div>
                <h3 className="font-medium text-green-800 mb-1">
                  Essential Nutrients Every Dog Diet Needs
                </h3>
                <p className="text-sm text-gray-600">
                  A comprehensive guide to canine nutrition requirements
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Read All Articles
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Pet's Health Dashboard</CardTitle>
            <CardDescription>
              Monitor and manage your pet's wellbeing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-medium">Next Vet Checkup</h3>
                  <p className="text-sm text-gray-600">
                    Reminder for Buddy's annual vaccination
                  </p>
                </div>
                <div className="text-sm font-medium bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  May 15, 2023
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-medium">Weight Tracker</h3>
                  <p className="text-sm text-gray-600">
                    Buddy's latest weight: 15.5 kg
                  </p>
                </div>
                <div className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Healthy
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Diet Plan</h3>
                  <p className="text-sm text-gray-600">
                    Current meal plan is active
                  </p>
                </div>
                <Button size="sm">View Plan</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link href="/profile">Manage Pet Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
