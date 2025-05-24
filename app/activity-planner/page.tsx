"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/notification";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const formSchema = z.object({
  petName: z.string().min(1, "Pet name is required"),
  petType: z.enum(["dog", "cat"]),
  breed: z.string().min(1, "Breed is required"),
  ageMonths: z.string().min(1, "Age in months is required"),
  weight: z.string().min(1, "Weight is required"),
  disease: z.string().optional(),
  ownerPreferences: z.string().optional(),
  vetRecommendations: z.string().optional(),
  // Additional activity-specific fields
  currentActivityLevel: z.enum(["low", "moderate", "high"]),
  availableSpace: z.enum([
    "apartment",
    "house_small_yard",
    "house_large_yard",
    "farm",
  ]),
  timeAvailable: z.string().optional(),
  weatherPreferences: z.array(z.string()).optional(),
  healthLimitations: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const weatherOptions = [
  { id: "sunny", label: "Sunny weather" },
  { id: "rainy", label: "Rainy weather" },
  { id: "cold", label: "Cold weather" },
  { id: "hot", label: "Hot weather" },
];

export default function ActivityPlannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petType: "dog",
      currentActivityLevel: "moderate",
      availableSpace: "house_small_yard",
      ownerPreferences: "",
      vetRecommendations: "",
      disease: "",
      weatherPreferences: [],
      timeAvailable: "",
      healthLimitations: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      // Prepare API payload
      const apiPayload = {
        dog_inputs: {
          Breed: data.breed,
          "Age (months)": parseInt(data.ageMonths),
          "Weight (kg)": parseFloat(data.weight),
          Disease: data.disease || "",
        },
        owner_preferences: data.ownerPreferences || "",
        vet_recommendations: data.vetRecommendations || "",
      };

      // Make API call
      const response = await fetch("http://localhost:5001/predict/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to get exercise plan from API");
      }

      const result = await response.json();

      // Store all data including form data and API result
      sessionStorage.setItem(
        "activityPlanResult",
        JSON.stringify({
          result,
          formData: data,
          apiPayload,
        })
      );

      router.push("/activity-planner/plan");
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        "Failed to generate activity plan. Please check if the API server is running."
      );
      setIsLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-white">
        <div className="flex justify-center items-center min-h-screen p-8 w-full">
          <div className="w-full max-w-5xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-green-800 mb-4">
                Personalized Activity Planner
              </h1>
              <p className="text-lg text-gray-600">
                Create a customized exercise and activity plan tailored to your
                pet's specific needs
              </p>
            </div>

            <Card className="bg-white border-2">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">
                  Pet Activity Information
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out your pet's details to generate a personalized activity
                  plan
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="petName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Pet Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Buddy"
                                {...field}
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="petType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Pet Type
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select pet type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="dog">Dog</SelectItem>
                                <SelectItem value="cat">Cat</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* API Required Fields */}
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        Required for Activity Plan
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="breed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Breed *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="German Shepherd"
                                  {...field}
                                  className="h-12 text-base"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ageMonths"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Age (months) *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder="24"
                                  {...field}
                                  className="h-12 text-base"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Weight (kg) *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0.1"
                                  step="0.1"
                                  placeholder="17.2"
                                  {...field}
                                  className="h-12 text-base"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="disease"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Disease/Health Condition
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="obesity, arthritis, etc."
                                  {...field}
                                  value={field.value || ""}
                                  className="h-12 text-base"
                                />
                              </FormControl>
                              <FormDescription>
                                Optional: Specify any health conditions affecting
                                activity
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-6 mt-6">
                        <FormField
                          control={form.control}
                          name="ownerPreferences"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Owner Preferences
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="e.g., my dog doesn't like to walk in the morning"
                                  {...field}
                                  value={field.value || ""}
                                  className="min-h-[80px] text-base"
                                />
                              </FormControl>
                              <FormDescription>
                                Share any preferences about timing, activities, or
                                constraints
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="vetRecommendations"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Veterinarian Recommendations
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="e.g., recommend to walk 30 minutes daily"
                                  {...field}
                                  value={field.value || ""}
                                  className="min-h-[80px] text-base"
                                />
                              </FormControl>
                              <FormDescription>
                                Include any specific exercise recommendations from
                                your vet
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Additional Activity Information */}
                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Activity Preferences (Optional)
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormField
                          control={form.control}
                          name="currentActivityLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Current Activity Level
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select activity level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="low">
                                    Low - Mostly inactive
                                  </SelectItem>
                                  <SelectItem value="moderate">
                                    Moderate - Some regular activity
                                  </SelectItem>
                                  <SelectItem value="high">
                                    High - Very active daily
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="availableSpace"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Available Space
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select available space" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="apartment">
                                    Apartment
                                  </SelectItem>
                                  <SelectItem value="house_small_yard">
                                    House with small yard
                                  </SelectItem>
                                  <SelectItem value="house_large_yard">
                                    House with large yard
                                  </SelectItem>
                                  <SelectItem value="farm">
                                    Farm/Rural area
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormField
                          control={form.control}
                          name="timeAvailable"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Time Available Daily
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 1 hour, 30 minutes"
                                  {...field}
                                  value={field.value || ""}
                                  className="h-12 text-base"
                                />
                              </FormControl>
                              <FormDescription>
                                How much time can you dedicate to pet activities
                                daily?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="healthLimitations"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Health Limitations
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., joint issues, heart condition"
                                  {...field}
                                  value={field.value || ""}
                                  className="h-12 text-base"
                                />
                              </FormControl>
                              <FormDescription>
                                Any physical limitations affecting exercise
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="weatherPreferences"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base font-medium">
                                Weather Preferences
                              </FormLabel>
                              <FormDescription className="text-base">
                                Select weather conditions where your pet is most
                                active
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg border">
                              {weatherOptions.map((option) => (
                                <FormField
                                  key={option.id}
                                  control={form.control}
                                  name="weatherPreferences"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={option.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              option.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              const currentValue =
                                                field.value || [];
                                              return checked
                                                ? field.onChange([
                                                    ...currentValue,
                                                    option.id,
                                                  ])
                                                : field.onChange(
                                                    currentValue.filter(
                                                      (value) =>
                                                        value !== option.id
                                                    )
                                                  );
                                            }}
                                            className="h-5 w-5"
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal text-base cursor-pointer">
                                          {option.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-8">
                    <Button
                      type="submit"
                      className="w-full bg-green-700 hover:bg-green-800 h-14 text-lg font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : null}
                      {isLoading
                        ? "Generating Plan..."
                        : "Generate Activity Plan"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
