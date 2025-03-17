"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle } from "lucide-react"

export default function SymptomPredictionPage() {
  const [symptoms, setSymptoms] = useState({
    "past disease": false,
    fever: false,
    "shortness of breathe": false,
    fatigue: false,
    "joint pain": false,
    cough: false,
    "abdominal pain": false,
    dizziness: false,
    nausea: false,
    vomiting: false,
    diarrhea: false,
    seizures: false,
    incordination: false,
    headtilt: false,
    "difficulty in urination": false,
    "blood in uri": false,
    "urinarry dribbling": false,
    limping: false,
    "hemoglobin uria": false,
    "pale gums": false,
    "reduced appetite": false,
    "cyanosed gums": false,
    "hyperemic gums": false,
    ascities: false,
    jaundice: false,
  })

  const [result, setResult] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<any | null>(null)

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setSymptoms({
      ...symptoms,
      [symptom]: checked,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert boolean values to 0/1 for the JSON output
    const formattedSymptoms: Record<string, number> = {}
    Object.entries(symptoms).forEach(([symptom, value]) => {
      formattedSymptoms[symptom] = value ? 1 : 0
    })

    // Format the data as JSON
    const jsonData = JSON.stringify(formattedSymptoms, null, 2)
    setResult(jsonData)

    // Generate a sample prediction based on the symptoms
    generatePrediction(symptoms)
  }

  const generatePrediction = (symptoms: Record<string, boolean>) => {
    // Count the number of active symptoms
    const activeSymptoms = Object.values(symptoms).filter(Boolean).length

    // Sample predictions based on symptom patterns
    const possibleConditions = []
    let urgencyLevel = "Low"

    if (symptoms["seizures"] && symptoms["incordination"]) {
      possibleConditions.push("Neurological Disorder")
      urgencyLevel = "High"
    }

    if (symptoms["vomiting"] && symptoms["diarrhea"] && symptoms["abdominal pain"]) {
      possibleConditions.push("Gastrointestinal Infection")
      urgencyLevel = "Medium"
    }

    if (symptoms["cyanosed gums"] && symptoms["shortness of breathe"]) {
      possibleConditions.push("Respiratory Distress")
      urgencyLevel = "High"
    }

    if (symptoms["jaundice"] && symptoms["ascities"]) {
      possibleConditions.push("Liver Disease")
      urgencyLevel = "High"
    }

    if (symptoms["blood in uri"] && symptoms["urinarry dribbling"]) {
      possibleConditions.push("Urinary Tract Infection")
      urgencyLevel = "Medium"
    }

    if (symptoms["limping"] && symptoms["joint pain"]) {
      possibleConditions.push("Musculoskeletal Issue")
      urgencyLevel = "Medium"
    }

    // If no specific patterns match but there are several symptoms
    if (possibleConditions.length === 0) {
      if (activeSymptoms > 5) {
        possibleConditions.push("Complex Condition")
        urgencyLevel = "Medium"
      } else if (activeSymptoms > 0) {
        possibleConditions.push("Minor Illness")
        urgencyLevel = "Low"
      } else {
        possibleConditions.push("No significant issues detected")
        urgencyLevel = "None"
      }
    }

    setPrediction({
      conditions: possibleConditions,
      urgency: urgencyLevel,
      recommendation: getRecommendation(urgencyLevel),
    })
  }

  const getRecommendation = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "Seek immediate veterinary attention. These symptoms suggest a potentially serious condition that requires prompt medical intervention."
      case "Medium":
        return "Schedule a veterinary appointment within 24-48 hours. Monitor your pet closely for any worsening symptoms."
      case "Low":
        return "Monitor your pet and consider a routine veterinary check-up if symptoms persist for more than 2-3 days."
      default:
        return "Continue routine care and monitoring."
    }
  }

  // Group symptoms by category for better organization
  const symptomCategories = {
    General: ["past disease", "fever", "fatigue", "reduced appetite"],
    Respiratory: ["shortness of breathe", "cough"],
    Digestive: ["abdominal pain", "nausea", "vomiting", "diarrhea", "ascities", "jaundice"],
    Neurological: ["dizziness", "seizures", "incordination", "headtilt"],
    Urinary: ["difficulty in urination", "blood in uri", "urinarry dribbling", "hemoglobin uria"],
    Musculoskeletal: ["joint pain", "limping"],
    Oral: ["pale gums", "cyanosed gums", "hyperemic gums"],
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Symptom Prediction</h1>

      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Symptom Checker</TabsTrigger>
          <TabsTrigger value="results">Prediction Results</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Pet Symptom Checker</CardTitle>
              <CardDescription>
                Check the symptoms your pet is experiencing to get a preliminary assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {Object.entries(symptomCategories).map(([category, categorySymptoms]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-medium">{category} Symptoms</h3>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      {categorySymptoms.map((symptom) => (
                        <div key={symptom} className="flex items-center space-x-2">
                          <Checkbox
                            id={symptom}
                            checked={symptoms[symptom]}
                            onCheckedChange={(checked) => handleSymptomChange(symptom, checked === true)}
                          />
                          <Label htmlFor={symptom} className="text-sm">
                            {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <Button type="submit" className="w-full">
                  Analyze Symptoms
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Symptom Analysis Results</CardTitle>
              <CardDescription>Based on the symptoms you've selected, here's a preliminary assessment</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="rounded-md bg-muted p-4">
                    <pre className="text-sm whitespace-pre-wrap overflow-auto">{result}</pre>
                  </div>

                  {prediction && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Possible Conditions</h3>
                        <div className="grid gap-3">
                          {prediction.conditions.map((condition: string, index: number) => (
                            <div key={index} className="rounded-md border p-3">
                              <div className="font-medium">{condition}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Urgency Level</h3>
                        <div
                          className={`rounded-md p-3 ${
                            prediction.urgency === "High"
                              ? "bg-red-50 border-red-200 border"
                              : prediction.urgency === "Medium"
                                ? "bg-yellow-50 border-yellow-200 border"
                                : "bg-green-50 border-green-200 border"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {prediction.urgency === "High" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                            <span className="font-medium">{prediction.urgency}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Recommendation</h3>
                        <div className="rounded-md border p-3">
                          <p>{prediction.recommendation}</p>
                        </div>
                      </div>

                      <div className="rounded-md bg-blue-50 border-blue-200 border p-4">
                        <h4 className="font-medium mb-2">Important Disclaimer</h4>
                        <p className="text-sm">
                          This symptom checker provides a preliminary assessment only and is not a substitute for
                          professional veterinary care. Always consult with a qualified veterinarian for proper
                          diagnosis and treatment of your pet's health conditions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>Select symptoms and submit the form to see prediction results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

