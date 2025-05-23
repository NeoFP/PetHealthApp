"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "@/components/ui/notification";
import {
  ArrowLeft,
  Info,
  Printer,
  Share2,
  Heart,
  Download,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NutrientInfo {
  name: string;
  amount: string;
  percentage: number;
}

interface MealPlan {
  name: string;
  time: string;
  description: string;
  nutrients: NutrientInfo[];
}

interface NutritionPlan {
  dailyCalories: number;
  dailyProtein: string;
  dailyFat: string;
  dailyCarbs: string;
  meals: MealPlan[];
}

interface ActivityInfo {
  type: string;
  duration: string;
  intensity: "Low" | "Medium" | "High";
}

interface ActivityPlan {
  morning?: ActivityInfo;
  afternoon?: ActivityInfo;
  evening?: ActivityInfo;
  healthConsiderations: string[];
  weatherAdaptation: string;
}

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  grams: number;
  description?: string;
  hasInfo?: boolean;
}

export default function NutritionPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [dogName, setDogName] = useState("your dog");
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(
    null
  );
  const [activityPlan, setActivityPlan] = useState<ActivityPlan | null>(null);
  const [showActivity, setShowActivity] = useState(false);

  // New recipe-specific information to match the second image
  const [totalCalories, setTotalCalories] = useState(901);
  const [proteinCalories, setProteinCalories] = useState({
    percentage: 48.6,
    calories: 437.8,
  });
  const [fatCalories, setFatCalories] = useState({
    percentage: 28.2,
    calories: 254.5,
  });
  const [carbCalories, setCarbCalories] = useState({
    percentage: 23.2,
    calories: 208.7,
  });
  const [moisture, setMoisture] = useState(67.2);
  const [deficienciesWithSupplements, setDeficienciesWithSupplements] =
    useState(0);
  const [deficienciesWithoutSupplements, setDeficienciesWithoutSupplements] =
    useState(12);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      name: "Turkey breast",
      amount: "11 5/8",
      unit: "oz",
      grams: 329,
      description: "from whole bird, non-enhanced, meat only, cooked, roasted",
      hasInfo: true,
    },
    {
      name: "Oil, canola",
      amount: "4 1/2",
      unit: "tsp",
      grams: 20,
      hasInfo: true,
    },
    {
      name: "Nordic Naturals Omega-3 Pet Liquid",
      amount: "1 3/10",
      unit: "mL",
      grams: 1.2,
      hasInfo: true,
    },
    {
      name: "Sweet potato",
      amount: "1 1/4",
      unit: "cup",
      grams: 250,
      description: "cooked, baked in skin, flesh, without salt",
      hasInfo: true,
    },
    {
      name: "Morton Iodized Salt",
      amount: "9/16",
      unit: "tsp",
      grams: 3.38,
      hasInfo: true,
    },
    {
      name: "Balance It® Canine",
      amount: "4 3/4",
      unit: "teaspoon",
      grams: 11.88,
      description: "(2.5 g/tsp)",
      hasInfo: true,
    },
  ]);

  useEffect(() => {
    const nameParam = searchParams.get("name");
    const activityParam = searchParams.get("activity");

    if (nameParam) {
      setDogName(nameParam);
    }

    if (activityParam === "true") {
      setShowActivity(true);
    }

    // Simulate API call to get plan data
    const timer = setTimeout(() => {
      // Mock nutrition plan data
      const mockNutritionPlan: NutritionPlan = {
        dailyCalories: 1450,
        dailyProtein: "60g",
        dailyFat: "45g",
        dailyCarbs: "110g",
        meals: [
          {
            name: "Breakfast",
            time: "7:00 AM",
            description:
              "1 cup high-quality kibble mixed with 1/4 cup plain yogurt and 1/4 cup blueberries",
            nutrients: [
              { name: "Protein", amount: "20g", percentage: 33 },
              { name: "Fat", amount: "15g", percentage: 33 },
              { name: "Carbs", amount: "35g", percentage: 32 },
            ],
          },
          {
            name: "Lunch",
            time: "12:00 PM",
            description:
              "1/2 cup kibble with 1/4 cup cooked lean meat (chicken or turkey) and 1/4 cup steamed vegetables",
            nutrients: [
              { name: "Protein", amount: "25g", percentage: 42 },
              { name: "Fat", amount: "10g", percentage: 22 },
              { name: "Carbs", amount: "25g", percentage: 23 },
            ],
          },
          {
            name: "Dinner",
            time: "6:00 PM",
            description:
              "3/4 cup kibble with 1 tablespoon fish oil and 1/4 cup cooked sweet potato",
            nutrients: [
              { name: "Protein", amount: "15g", percentage: 25 },
              { name: "Fat", amount: "20g", percentage: 45 },
              { name: "Carbs", amount: "50g", percentage: 45 },
            ],
          },
        ],
      };

      // Mock activity plan data
      const mockActivityPlan: ActivityPlan = {
        morning: {
          type: "Swimming",
          duration: "30 minutes",
          intensity: "Low",
        },
        afternoon: {
          type: "Walking",
          duration: "40 minutes",
          intensity: "Medium",
        },
        evening: {
          type: "Interactive play",
          duration: "20 minutes",
          intensity: "Low",
        },
        healthConsiderations: [
          "Running has been avoided as per the vet's recommendation",
          "Swimming has been prioritized as per the owner's preference",
          "Activity intensity is adjusted to prevent joint pain",
        ],
        weatherAdaptation:
          "Since the temperature is 20°C (pleasant), outdoor activities are safe. If it gets hotter, sessions can be moved indoors or scheduled earlier.",
      };

      setNutritionPlan(mockNutritionPlan);
      setActivityPlan(mockActivityPlan);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Personalized Plan for ${dogName}`,
          text: `Check out the personalized nutrition and activity plan for ${dogName}`,
          url: window.location.href,
        })
        .catch((err) => {
          toast.error("Couldn't share content");
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg">
            Generating personalized plan for {dogName}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/nutrition-planner")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Planner
        </Button>

        <div className="flex flex-col items-center justify-center text-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/dog-avatar.png" alt={dogName} />
            <AvatarFallback>{dogName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Homemade recipe for {dogName}
          </h1>
          <p className="text-gray-600">
            Enjoy this balanced recipe, courtesy of Pet Health®
          </p>

          <div className="flex gap-3 mt-6">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10"
              onClick={handlePrint}
            >
              <Printer className="h-5 w-5" />
              <span className="sr-only">Print recipe</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10"
              onClick={() => toast.success("Recipe saved to favorites")}
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Save recipe</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-10 w-10"
              onClick={handleShare}
            >
              <Download className="h-5 w-5" />
              <span className="sr-only">Download recipe</span>
            </Button>
          </div>
        </div>

        <Button
          className="mb-8"
          variant="outline"
          onClick={() => router.push("/nutrition-planner")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK TO RESULTS
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-b">
          <div className="border-r p-6 text-center">
            <div className="text-3xl font-bold">{totalCalories}</div>
            <div className="text-sm text-gray-500">Calories</div>
          </div>
          <div className="border-r p-6 text-center">
            <div className="text-3xl font-bold">
              {proteinCalories.percentage}%
            </div>
            <div className="text-sm text-gray-500">
              Protein Calories
              <div className="text-xs">
                ({proteinCalories.calories} Calories)
              </div>
            </div>
          </div>
          <div className="border-r p-6 text-center">
            <div className="text-3xl font-bold">{fatCalories.percentage}%</div>
            <div className="text-sm text-gray-500">
              Fat Calories
              <div className="text-xs">({fatCalories.calories} Calories)</div>
            </div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl font-bold">{carbCalories.percentage}%</div>
            <div className="text-sm text-gray-500">
              Carb. Calories
              <div className="text-xs">({carbCalories.calories} Calories)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b mb-8">
          <div className="border-r p-6 text-center">
            <div className="text-3xl font-bold">{moisture}%</div>
            <div className="text-sm text-gray-500">Moisture</div>
          </div>
          <div className="border-r p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {deficienciesWithSupplements}
            </div>
            <div className="text-sm text-gray-500">
              Deficiencies with supplement(s) added
            </div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-red-500">
              {deficienciesWithoutSupplements}
            </div>
            <div className="text-sm text-gray-500">
              Deficiencies with NO supplement(s) added
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button className="bg-green-700 hover:bg-green-800">
            BUY SUPPLEMENT
          </Button>
          <Button variant="outline">SEE NUTRIENT PROFILE</Button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <div className="space-y-6">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center py-4 border-b"
              >
                <div className="w-full md:w-1/4 font-bold text-xl mb-2 md:mb-0">
                  {ingredient.grams} g
                </div>
                <div className="w-full md:w-1/4 text-gray-500 mb-2 md:mb-0">
                  or {ingredient.amount} {ingredient.unit}
                </div>
                <div className="w-full md:w-2/4">
                  <div className="font-medium flex items-center">
                    {ingredient.name}
                    {ingredient.hasInfo && (
                      <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                        i
                      </span>
                    )}
                  </div>
                  {ingredient.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {ingredient.description}
                    </div>
                  )}
                  {ingredient.name === "Balance It® Canine" && (
                    <Button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white">
                      Buy Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Tabs
          defaultValue={showActivity ? "activity" : "nutrition"}
          className="w-full mt-8"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nutrition">Nutrition Plan</TabsTrigger>
            <TabsTrigger value="activity">Activity Plan</TabsTrigger>
            <TabsTrigger value="instructions">Preparation</TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Nutrition Overview</CardTitle>
                <CardDescription>
                  Recommended daily nutritional intake
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-4 border-none shadow-none bg-primary/5">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-sm text-muted-foreground">
                        Calories
                      </span>
                      <span className="text-2xl font-bold">
                        {nutritionPlan?.dailyCalories} kcal
                      </span>
                    </div>
                  </Card>
                  <Card className="p-4 border-none shadow-none bg-primary/5">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-sm text-muted-foreground">
                        Protein
                      </span>
                      <span className="text-2xl font-bold">
                        {nutritionPlan?.dailyProtein}
                      </span>
                    </div>
                  </Card>
                  <Card className="p-4 border-none shadow-none bg-primary/5">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-sm text-muted-foreground">Fat</span>
                      <span className="text-2xl font-bold">
                        {nutritionPlan?.dailyFat}
                      </span>
                    </div>
                  </Card>
                  <Card className="p-4 border-none shadow-none bg-primary/5">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-sm text-muted-foreground">
                        Carbs
                      </span>
                      <span className="text-2xl font-bold">
                        {nutritionPlan?.dailyCarbs}
                      </span>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Activity Plan</CardTitle>
                <CardDescription>
                  Recommended exercise and activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {activityPlan?.morning && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Morning</h3>
                    <Card className="p-4 bg-muted/30">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">
                          {activityPlan.morning.type}
                        </div>
                        <div className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {activityPlan.morning.intensity} Intensity
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration: {activityPlan.morning.duration}
                      </div>
                    </Card>
                  </div>
                )}

                {activityPlan?.afternoon && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Afternoon</h3>
                    <Card className="p-4 bg-muted/30">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">
                          {activityPlan.afternoon.type}
                        </div>
                        <div className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {activityPlan.afternoon.intensity} Intensity
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration: {activityPlan.afternoon.duration}
                      </div>
                    </Card>
                  </div>
                )}

                {activityPlan?.evening && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Evening</h3>
                    <Card className="p-4 bg-muted/30">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">
                          {activityPlan.evening.type}
                        </div>
                        <div className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {activityPlan.evening.intensity} Intensity
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration: {activityPlan.evening.duration}
                      </div>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preparation Instructions</CardTitle>
                <CardDescription>
                  Step-by-step guide to prepare this meal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <p className="font-medium mb-1">Cook the turkey breast</p>
                    <p className="text-gray-600 text-sm">
                      Roast the turkey breast until fully cooked and internal
                      temperature reaches 165°F (74°C). Let it cool before
                      handling.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium mb-1">Prepare sweet potato</p>
                    <p className="text-gray-600 text-sm">
                      Bake sweet potato with skin on until tender. Remove the
                      skin and measure 1 1/4 cup of cooked flesh.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium mb-1">Combine ingredients</p>
                    <p className="text-gray-600 text-sm">
                      Cut the turkey into small pieces. In a large bowl, combine
                      the turkey, sweet potato, canola oil, and salt.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium mb-1">Add supplements</p>
                    <p className="text-gray-600 text-sm">
                      Add the Nordic Naturals Omega-3 Pet Liquid and Balance It®
                      Canine supplement. Mix thoroughly to distribute evenly.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium mb-1">Portion and store</p>
                    <p className="text-gray-600 text-sm">
                      Divide into daily portions based on your dog's weight.
                      Store in airtight containers in the refrigerator for up to
                      3 days or freeze for up to 3 months.
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feeding Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Daily Feeding Amount</h3>
                  <p className="text-gray-600">
                    Feed approximately{" "}
                    {((totalCalories / 100) * 2.5).toFixed(1)} ounces (
                    {((totalCalories / 100) * 70).toFixed(0)} g) per day for a
                    dog of {dogName}'s size and activity level. Adjust as
                    necessary based on weight changes.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Feeding Schedule</h3>
                  <p className="text-gray-600">
                    Divide the daily amount into two equal meals, served in the
                    morning and evening. Serve at room temperature to enhance
                    aroma and palatability.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Transition Instructions</h3>
                  <p className="text-gray-600">
                    Transition gradually over 7 days by increasing the amount of
                    new food while decreasing the old food. Monitor for any
                    digestive upset during the transition.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
