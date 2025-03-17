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

export default function DogNutritionPage() {
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

    // Here you would typically send this data to an API
    console.log(jsonData)
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dog Nutrition</h1>

      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Nutrition Form</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Nutrition Plan</CardTitle>
              <CardDescription>Enter your dog's information to receive a customized nutrition plan</CardDescription>
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
                  Generate Nutrition Plan
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Plan Results</CardTitle>
              <CardDescription>Your personalized dog nutrition plan based on the provided information</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="rounded-md bg-muted p-4">
                    <pre className="text-sm whitespace-pre-wrap overflow-auto">{result}</pre>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recommended Diet</h3>
                    <div className="rounded-md border p-4">
                      <p className="text-muted-foreground">
                        Based on your dog's profile, we recommend a balanced diet with controlled portions to manage
                        obesity. Focus on high-quality protein sources and limited treats.
                      </p>

                      <div className="mt-4 grid gap-2">
                        <div className="flex justify-between">
                          <span>Daily Calories:</span>
                          <span className="font-medium">850-950 kcal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protein:</span>
                          <span className="font-medium">25-30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fat:</span>
                          <span className="font-medium">10-15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbohydrates:</span>
                          <span className="font-medium">45-55%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Exercise Recommendations</h3>
                    <div className="rounded-md border p-4">
                      <p className="text-muted-foreground">
                        Since your dog doesn't like morning walks, we recommend splitting exercise into two 15-minute
                        sessions in the afternoon and evening. This will help with weight management while respecting
                        your dog's preferences.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>Submit the form to see your personalized nutrition plan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

