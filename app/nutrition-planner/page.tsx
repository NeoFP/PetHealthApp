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
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/notification";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const formSchema = z.object({
  petName: z.string().min(1, "Pet name is required"),
  petType: z.enum(["dog", "cat"]),
  age: z.string().min(1, "Age is required"),
  weight: z.string().min(1, "Weight is required"),
  breed: z.string().min(1, "Breed is required"),
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
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petType: "dog",
      activityLevel: "moderate",
      healthConditions: [],
      includeActivity: true,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      // In a real app, you would send this data to an API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to the plan page with query params
      const queryParams = new URLSearchParams({
        name: data.petName,
        activity: data.includeActivity ? "true" : "false",
      });

      router.push(`/nutrition-planner/plan?${queryParams.toString()}`);
    } catch (error) {
      toast.error("Failed to generate nutrition plan. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Personalized Nutrition Planner
          </h1>
          <p className="text-gray-600">
            Create a customized nutrition plan tailored to your pet's specific
            needs
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pet Information</CardTitle>
            <CardDescription>
              Fill out your pet's details to generate a personalized nutrition
              plan
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="petName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pet Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Buddy" {...field} />
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
                        <FormLabel>Pet Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (years)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="3"
                            {...field}
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
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="15"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Breed</FormLabel>
                        <FormControl>
                          <Input placeholder="Golden Retriever" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Activity Level</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="activity-low" />
                            <FormLabel
                              htmlFor="activity-low"
                              className="font-normal"
                            >
                              Low (Less than 30 minutes of activity per day)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="moderate"
                              id="activity-moderate"
                            />
                            <FormLabel
                              htmlFor="activity-moderate"
                              className="font-normal"
                            >
                              Moderate (30-60 minutes of activity per day)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="activity-high" />
                            <FormLabel
                              htmlFor="activity-high"
                              className="font-normal"
                            >
                              High (More than 60 minutes of activity per day)
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
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Health Conditions (if any)</FormLabel>
                        <FormDescription>
                          Select any health conditions your pet has
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                        const currentValue = field.value || [];
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
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
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
                    <FormItem>
                      <FormLabel>Current Diet (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describe what your pet currently eats"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        This helps us understand your pet's current nutrition
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
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include Activity Recommendations</FormLabel>
                        <FormDescription>
                          Receive activity suggestions alongside the nutrition
                          plan
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : null}
                  {isLoading ? "Generating Plan..." : "Generate Nutrition Plan"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
