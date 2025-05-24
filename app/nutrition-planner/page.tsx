"use client";

import { useState, useEffect } from "react";
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
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/notification";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getSharedPetData, saveSharedPetData, clearSharedPetData } from "@/lib/petFormData";

const formSchema = z.object({
  petName: z.string().min(1, "Pet name is required"),
  breed: z.string().min(1, "Breed is required"),
  ageMonths: z.string().min(1, "Age in months is required"),
  weight: z.string().min(1, "Weight is required"),
  disease: z.string().optional(),
  ownerPreferences: z.string().optional(),
  vetRecommendations: z.string().optional(),
  activityLevel: z.enum(["low", "moderate", "high"]),
  healthConditions: z.array(z.string()).optional(),
  currentDiet: z.string().optional(),
  includeActivity: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const healthConditions = [
  { id: "allergies", label: "Allergies" },
  { id: "obesity", label: "Obesity" },
  { id: "diabetes", label: "Diabetes" },
  { id: "kidney", label: "Kidney Disease" },
  { id: "joint", label: "Joint Problems" },
  { id: "dental", label: "Dental Issues" },
];

export default function NutritionPlannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasAutoFilledData, setHasAutoFilledData] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityLevel: "moderate",
      healthConditions: [],
      includeActivity: true,
      ownerPreferences: "",
      vetRecommendations: "",
      disease: "",
    },
  });

  // Load shared data from localStorage on component mount
  useEffect(() => {
    const sharedData = getSharedPetData();
    if (Object.keys(sharedData).length > 0) {
      setHasAutoFilledData(true);
      form.reset({
        petName: sharedData.petName || "",
        breed: sharedData.breed || "",
        ageMonths: sharedData.ageMonths || "",
        weight: sharedData.weight || "",
        disease: sharedData.disease || "",
        ownerPreferences: "",
        vetRecommendations: "",
        activityLevel: "moderate",
        healthConditions: [],
        includeActivity: true,
      });
      toast.success("Basic pet information auto-filled from previous entry!");
    }
  }, [form]);

  // Save data to localStorage whenever form values change
  useEffect(() => {
    const subscription = form.watch((data) => {
      saveSharedPetData({
        petName: data.petName,
        breed: data.breed,
        ageMonths: data.ageMonths,
        weight: data.weight,
        disease: data.disease,
      });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleClearStoredData = () => {
    clearSharedPetData();
    setHasAutoFilledData(false);
    form.reset({
      petName: "",
      breed: "",
      ageMonths: "",
      weight: "",
      disease: "",
      ownerPreferences: "",
      vetRecommendations: "",
      activityLevel: "moderate",
      healthConditions: [],
      includeActivity: true,
    });
    toast.success("Stored pet data cleared. Form reset.");
  };

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
      const response = await fetch("http://localhost:5001/predict/nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to get nutrition plan from API");
      }

      const result = await response.json();

      // Store all data including form data and API result
      sessionStorage.setItem(
        "nutritionPlanResult",
        JSON.stringify({
          result,
          formData: data,
          apiPayload,
        })
      );

      router.push("/nutrition-planner/plan");
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        "Failed to generate nutrition plan. Please check if the API server is running."
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
                Nutrition Planner
              </h1>
              <p className="text-lg text-gray-600">
                Create personalized nutrition plans based on your pet's specific
                needs
              </p>
              {hasAutoFilledData && (
                <div className="mt-4 flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClearStoredData}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Clear Auto-filled Data
                  </Button>
                </div>
              )}
            </div>

            <Card className="bg-white border-2">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">Pet Information</CardTitle>
                <CardDescription className="text-base">
                  Fill out your pet's details to generate a personalized
                  nutrition plan
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 gap-8">
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
                    </div>

                    {/* API Required Fields */}
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        Required for Nutrition Plan
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
                                  placeholder="obesity, diabetes, etc."
                                  {...field}
                                  value={field.value || ""}
                                  className="h-12 text-base"
                                />
                              </FormControl>
                              <FormDescription>
                                Optional: Specify any health conditions
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
                                Share any preferences or constraints about your
                                pet's routine
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
                                Any specific recommendations from your
                                veterinarian
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Additional Information (Optional)
                      </h3>

                      <FormField
                        control={form.control}
                        name="activityLevel"
                        render={({ field }) => (
                          <FormItem className="space-y-4 mb-6">
                            <FormLabel className="text-base font-medium">
                              Activity Level
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                <div className="flex items-center space-x-3">
                                  <RadioGroupItem
                                    value="low"
                                    id="activity-low"
                                    className="h-5 w-5"
                                  />
                                  <FormLabel
                                    htmlFor="activity-low"
                                    className="font-normal text-base cursor-pointer"
                                  >
                                    Low (Less than 30 minutes of activity per
                                    day)
                                  </FormLabel>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <RadioGroupItem
                                    value="moderate"
                                    id="activity-moderate"
                                    className="h-5 w-5"
                                  />
                                  <FormLabel
                                    htmlFor="activity-moderate"
                                    className="font-normal text-base cursor-pointer"
                                  >
                                    Moderate (30-60 minutes of activity per day)
                                  </FormLabel>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <RadioGroupItem
                                    value="high"
                                    id="activity-high"
                                    className="h-5 w-5"
                                  />
                                  <FormLabel
                                    htmlFor="activity-high"
                                    className="font-normal text-base cursor-pointer"
                                  >
                                    High (More than 60 minutes of activity per
                                    day)
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="healthConditions"
                        render={() => (
                          <FormItem className="mb-6">
                            <div className="mb-4">
                              <FormLabel className="text-base font-medium">
                                General Health Conditions
                              </FormLabel>
                              <FormDescription className="text-base">
                                Select any general health conditions (for
                                reference)
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg border">
                              {healthConditions.map((condition) => (
                                <FormField
                                  key={condition.id}
                                  control={form.control}
                                  name="healthConditions"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={condition.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              condition.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              const currentValue =
                                                field.value || [];
                                              return checked
                                                ? field.onChange([
                                                    ...currentValue,
                                                    condition.id,
                                                  ])
                                                : field.onChange(
                                                    currentValue.filter(
                                                      (value) =>
                                                        value !== condition.id
                                                    )
                                                  );
                                            }}
                                            className="h-5 w-5"
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal text-base cursor-pointer">
                                          {condition.label}
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

                      <FormField
                        control={form.control}
                        name="currentDiet"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel className="text-base font-medium">
                              Current Diet
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Describe what your pet currently eats"
                                {...field}
                                value={field.value || ""}
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormDescription className="text-base">
                              This helps understand your pet's current nutrition
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="includeActivity"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-5 w-5"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-base font-medium cursor-pointer">
                                Include Activity Recommendations
                              </FormLabel>
                              <FormDescription className="text-base">
                                Receive activity suggestions alongside the
                                nutrition plan
                              </FormDescription>
                            </div>
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
                        : "Generate Nutrition Plan"}
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
