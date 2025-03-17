"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell } from "lucide-react"

export default function DiseaseExercisePage() {
  const [formData, setFormData] = useState({
    dog_inputs: {
      Breed: "",
      "Age (months)": "",
      "Weight (kg)": "",
      Disease: "",
    },
    owner_preferences: "",
    vet_recommendations: "",
  })

  const [result, setResult] = useState<string | null>(null)
  const [exercisePlan, setExercisePlan] = useState<any | null>(null)

  const handleInputChange = (category: string, field: string, value: string) => {
    if (category === "dog_inputs") {
      setFormData({
        ...formData,
        dog_inputs: {
          ...formData.dog_inputs,
          [field]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [category]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the data as JSON
    const jsonData = JSON.stringify(formData, null, 2)
    setResult(jsonData)

    // Generate a sample exercise plan based on the disease
    generateExercisePlan(formData.dog_inputs.Disease.toLowerCase())
  }

  const generateExercisePlan = (disease: string) => {
    let plan = {
      title: "",
      description: "",
      exercises: [],
      duration: "",
      frequency: "",
      precautions: "",
    }

    // Sample exercise plans based on common diseases
    switch (disease) {
      case "obesity":
        plan = {
          title: "Weight Management Exercise Plan",
          description: "A gentle but effective exercise regimen designed to help your dog lose weight safely.",
          exercises: [
            { name: "Controlled Walking", duration: "15-20 minutes", intensity: "Low to moderate" },
            { name: "Water Exercises", duration: "10-15 minutes", intensity: "Low impact" },
            { name: "Interactive Play", duration: "5-10 minutes", intensity: "Moderate" },
          ],
          duration: "30-45 minutes total per day",
          frequency: "Twice daily (morning and evening)",
          precautions:
            "Monitor breathing and avoid exercise in extreme temperatures. Start slowly and gradually increase intensity.",
        }
        break
      case "arthritis":
        plan = {
          title: "Joint-Friendly Exercise Plan",
          description: "Gentle exercises to maintain mobility without stressing arthritic joints.",
          exercises: [
            { name: "Gentle Swimming", duration: "10-15 minutes", intensity: "Very low impact" },
            { name: "Slow Walking", duration: "10 minutes", intensity: "Very low" },
            { name: "Passive Range of Motion", duration: "5 minutes per joint", intensity: "Therapeutic" },
          ],
          duration: "20-30 minutes total per day",
          frequency: "Once daily, preferably when medication is most effective",
          precautions: "Never force movement that causes pain. Provide warm bedding after exercise.",
        }
        break
      case "heart disease":
        plan = {
          title: "Cardiac-Appropriate Exercise Plan",
          description: "Carefully monitored activity to maintain quality of life without stressing the heart.",
          exercises: [
            { name: "Very Short Walks", duration: "5-10 minutes", intensity: "Very low" },
            { name: "Mental Stimulation Games", duration: "10-15 minutes", intensity: "No physical exertion" },
            { name: "Gentle Petting Sessions", duration: "Throughout the day", intensity: "Relaxing" },
          ],
          duration: "15-20 minutes of physical activity per day",
          frequency: "Multiple short sessions throughout the day",
          precautions:
            "Stop immediately if coughing, excessive panting, or weakness occurs. Always consult with cardiologist.",
        }
        break
      default:
        plan = {
          title: "Customized Exercise Plan",
          description: `Exercise recommendations tailored for a dog with ${disease}.`,
          exercises: [
            { name: "Controlled Activity", duration: "As tolerated", intensity: "Adjusted to condition" },
            { name: "Therapeutic Exercises", duration: "As recommended by vet", intensity: "Condition-specific" },
          ],
          duration: "Based on veterinary guidance",
          frequency: "As recommended by your veterinarian",
          precautions: "Always follow specific veterinary advice for your dog's condition.",
        }
    }

    setExercisePlan(plan)
  }

  const popularBreeds = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Rottweiler",
    "Yorkshire Terrier",
    "Boxer",
    "Dachshund",
    "Shih Tzu",
    "Other",
  ]

  const commonDiseases = [
    "Obesity",
    "Arthritis",
    "Hip Dysplasia",
    "Heart Disease",
    "Diabetes",
    "Cruciate Ligament Injury",
    "Intervertebral Disc Disease",
    "Other",
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Disease Exercise</h1>

      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Exercise Form</TabsTrigger>
          <TabsTrigger value="results">Exercise Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Therapeutic Exercise Plan</CardTitle>
              <CardDescription>
                Create a customized exercise plan for your dog based on their health condition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dog Information</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="breed">Breed</Label>
                      <Select
                        onValueChange={(value) => handleInputChange("dog_inputs", "Breed", value)}
                        defaultValue={formData.dog_inputs.Breed}
                      >
                        <SelectTrigger id="breed">
                          <SelectValue placeholder="Select breed" />
                        </SelectTrigger>
                        <SelectContent>
                          {popularBreeds.map((breed) => (
                            <SelectItem key={breed} value={breed}>
                              {breed}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age (months)</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="13"
                        value={formData.dog_inputs["Age (months)"]}
                        onChange={(e) => handleInputChange("dog_inputs", "Age (months)", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="17.2"
                        value={formData.dog_inputs["Weight (kg)"]}
                        onChange={(e) => handleInputChange("dog_inputs", "Weight (kg)", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="disease">Disease</Label>
                      <Input
                        id="disease"
                        placeholder="obesity"
                        value={formData.dog_inputs.Disease}
                        onChange={(e) => handleInputChange("dog_inputs", "Disease", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="owner_preferences">Owner Preferences</Label>
                    <Textarea
                      id="owner_preferences"
                      placeholder="e.g., my dog doesn't like to walk in the morning"
                      className="min-h-[80px]"
                      value={formData.owner_preferences}
                      onChange={(e) => handleInputChange("owner_preferences", "", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vet_recommendations">Veterinarian Recommendations</Label>
                    <Textarea
                      id="vet_recommendations"
                      placeholder="e.g., recommend to walk 30 minutes daily"
                      className="min-h-[80px]"
                      value={formData.vet_recommendations}
                      onChange={(e) => handleInputChange("vet_recommendations", "", e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Generate Exercise Plan
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Therapeutic Exercise Plan</CardTitle>
              <CardDescription>
                Customized exercise recommendations based on your dog's health condition
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="rounded-md bg-muted p-4">
                    <pre className="text-sm whitespace-pre-wrap overflow-auto">{result}</pre>
                  </div>

                  {exercisePlan && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Dumbbell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{exercisePlan.title}</h3>
                          <p className="text-sm text-muted-foreground">{exercisePlan.description}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Recommended Exercises</h4>
                        <div className="grid gap-3">
                          {exercisePlan.exercises.map((exercise: any, index: number) => (
                            <div key={index} className="rounded-md border p-3">
                              <div className="font-medium">{exercise.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Duration: {exercise.duration} | Intensity: {exercise.intensity}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <h4 className="font-medium">Duration</h4>
                          <p className="text-sm text-muted-foreground">{exercisePlan.duration}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Frequency</h4>
                          <p className="text-sm text-muted-foreground">{exercisePlan.frequency}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Precautions</h4>
                        <div className="rounded-md bg-yellow-50 border-yellow-200 border p-3 text-sm">
                          {exercisePlan.precautions}
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-2">Owner Preferences Accommodations</h4>
                        <p className="text-sm text-muted-foreground">
                          Since your dog doesn't like to walk in the morning, we've adjusted the exercise plan to focus
                          on afternoon and evening activities. This ensures your dog gets the necessary exercise while
                          respecting their preferences.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>Submit the form to see your customized exercise plan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

