"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  ArrowLeft,
  AlertTriangle,
  Info,
  ExternalLink,
  Pill,
  Phone,
  Calendar,
} from "lucide-react";

interface DiseaseResult {
  name: string;
  confidence: number;
  description: string;
  symptoms: string[];
  severity: "Low" | "Moderate" | "High";
  urgency: "Schedule Checkup" | "See Vet Soon" | "Emergency";
  treatments: string[];
  medications?: string[];
  homeRemedies?: string[];
}

export default function DiseaseDetectionResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<DiseaseResult[]>([]);
  const [petType, setPetType] = useState<string>("dog");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // In a real app, you would fetch the results from an API
        // For this demo, we'll simulate the API call and generate mock results
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const symptoms = searchParams.get("symptoms") || "";
        const mainSymptom = searchParams.get("mainSymptom") || "";
        const petTypeParam = searchParams.get("petType");

        if (petTypeParam) {
          setPetType(petTypeParam);
        }

        // Generate mock results based on the symptoms
        const mockResults: DiseaseResult[] = [];

        // If coughing and sneezing are selected, suggest respiratory infection
        if (symptoms.includes("coughing") && symptoms.includes("sneezing")) {
          mockResults.push({
            name: "Upper Respiratory Infection",
            confidence: 85,
            description:
              "An infection affecting the upper respiratory tract, including the nose, throat, and sinuses.",
            symptoms: ["Coughing", "Sneezing", "Nasal Discharge", "Lethargy"],
            severity: "Moderate",
            urgency: "See Vet Soon",
            treatments: [
              "Antibiotics may be prescribed if bacterial",
              "Supportive care and rest",
              "Humidifier to ease breathing",
            ],
            medications: [
              "Antibiotics (if bacterial)",
              "Decongestants",
              "Cough suppressants",
            ],
          });
        }

        // If vomiting and diarrhea are selected, suggest gastrointestinal issues
        if (symptoms.includes("vomiting") && symptoms.includes("diarrhea")) {
          mockResults.push({
            name: "Gastroenteritis",
            confidence: 78,
            description:
              "Inflammation of the stomach and intestines, often due to infection, dietary indiscretion, or toxin exposure.",
            symptoms: [
              "Vomiting",
              "Diarrhea",
              "Loss of Appetite",
              "Lethargy",
              "Dehydration",
            ],
            severity: "Moderate",
            urgency: "See Vet Soon",
            treatments: [
              "Withhold food for 12-24 hours (under vet guidance)",
              "Gradual reintroduction of bland diet",
              "Probiotics",
            ],
            medications: [
              "Anti-nausea medication",
              "Anti-diarrheal medication",
              "Probiotics",
            ],
            homeRemedies: [
              "Ensure access to fresh water to prevent dehydration",
              "Bland diet (e.g., boiled chicken and rice) when reintroducing food",
              "Small, frequent meals",
            ],
          });
        }

        // If increased thirst and urination are selected, suggest diabetes or kidney issues
        if (
          symptoms.includes("increased_thirst") &&
          symptoms.includes("increased_urination")
        ) {
          mockResults.push({
            name: "Diabetes Mellitus",
            confidence: 65,
            description:
              "A condition characterized by high blood sugar levels due to insufficient insulin production or insulin resistance.",
            symptoms: [
              "Increased Thirst",
              "Increased Urination",
              "Weight Loss",
              "Increased Appetite",
            ],
            severity: "High",
            urgency: "See Vet Soon",
            treatments: [
              "Insulin therapy",
              "Dietary management",
              "Regular blood glucose monitoring",
            ],
          });

          mockResults.push({
            name: "Kidney Disease",
            confidence: 55,
            description:
              "A condition in which the kidneys are damaged and cannot filter blood properly.",
            symptoms: [
              "Increased Thirst",
              "Increased Urination",
              "Lethargy",
              "Loss of Appetite",
            ],
            severity: "High",
            urgency: "See Vet Soon",
            treatments: [
              "Kidney supportive diet",
              "Medication to manage symptoms",
              "Fluid therapy if dehydrated",
            ],
          });
        }

        // If itching and hair loss are selected, suggest skin issues
        if (symptoms.includes("itching") && symptoms.includes("hair_loss")) {
          mockResults.push({
            name: "Allergic Dermatitis",
            confidence: 72,
            description:
              "Skin inflammation caused by allergic reactions to environmental allergens, food, or parasites.",
            symptoms: [
              "Itching/Scratching",
              "Hair Loss",
              "Redness",
              "Skin Lesions",
            ],
            severity: "Moderate",
            urgency: "Schedule Checkup",
            treatments: [
              "Identify and remove allergen if possible",
              "Medicated shampoos",
              "Anti-itch medication",
            ],
            medications: ["Antihistamines", "Corticosteroids", "Immunotherapy"],
            homeRemedies: [
              "Regular bathing with hypoallergenic shampoo",
              "Omega-3 fatty acid supplements",
              "Keep environment clean to reduce allergen exposure",
            ],
          });
        }

        // Add generic result based on main symptom for quick assessment
        if (mainSymptom && mockResults.length === 0) {
          const urgencyLevel = searchParams.get("urgency") || "medium";
          let urgencyText: "Schedule Checkup" | "See Vet Soon" | "Emergency" =
            "Schedule Checkup";

          if (urgencyLevel === "high") {
            urgencyText = "Emergency";
          } else if (urgencyLevel === "medium") {
            urgencyText = "See Vet Soon";
          }

          mockResults.push({
            name: "Unspecified Condition",
            confidence: 40,
            description: `Based on the limited information provided, we cannot determine a specific condition related to "${mainSymptom}". A veterinary examination is recommended.`,
            symptoms: [
              mainSymptom.charAt(0).toUpperCase() + mainSymptom.slice(1),
            ],
            severity:
              urgencyLevel === "high"
                ? "High"
                : urgencyLevel === "medium"
                ? "Moderate"
                : "Low",
            urgency: urgencyText,
            treatments: [
              "Veterinary examination required for proper diagnosis",
              "Monitor for additional symptoms",
              "Keep your pet comfortable",
            ],
          });
        }

        // If no specific conditions match, provide a generic result
        if (mockResults.length === 0) {
          mockResults.push({
            name: "Inconclusive",
            confidence: 30,
            description:
              "Based on the symptoms provided, we cannot determine a specific condition. The symptoms may be related to various health issues.",
            symptoms: symptoms
              .split(",")
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
            severity: "Low",
            urgency: "Schedule Checkup",
            treatments: [
              "Veterinary examination required for proper diagnosis",
              "Monitor for additional symptoms",
              "Keep your pet comfortable",
            ],
          });
        }

        setResults(mockResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        setLoading(false);
        // In a real app, you would handle the error appropriately
      }
    };

    fetchResults();
  }, [searchParams]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Moderate":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Emergency":
        return "bg-red-100 text-red-800 border-red-200";
      case "See Vet Soon":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Schedule Checkup":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) {
      return "bg-green-600";
    } else if (confidence >= 50) {
      return "bg-amber-500";
    } else {
      return "bg-red-500";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/disease-detection")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Symptom Checker
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Analysis Results
          </h1>
          <p className="text-gray-600">
            Based on the symptoms provided, here are the potential health
            conditions.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-lg">
              Analyzing symptoms and generating results...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {results.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{result.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {petType === "dog"
                          ? "Canine"
                          : petType === "cat"
                          ? "Feline"
                          : "Pet"}{" "}
                        Health Condition
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        <Badge className={getSeverityColor(result.severity)}>
                          {result.severity} Severity
                        </Badge>
                      </div>
                      <Badge className={getUrgencyColor(result.urgency)}>
                        {result.urgency}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Match Confidence</span>
                      <span className="font-medium">{result.confidence}%</span>
                    </div>
                    <Progress
                      value={result.confidence}
                      className={`h-2 ${getConfidenceColor(result.confidence)}`}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {result.confidence < 50
                        ? "Low confidence. Consider consulting a veterinarian for proper diagnosis."
                        : result.confidence < 75
                        ? "Moderate confidence. This condition matches several symptoms."
                        : "High confidence. This condition closely matches the reported symptoms."}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Description</h3>
                    <p className="text-gray-600">{result.description}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Associated Symptoms</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.symptoms.map((symptom, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-50">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Tabs defaultValue="treatments" className="w-full">
                    <TabsList>
                      <TabsTrigger value="treatments">Treatments</TabsTrigger>
                      {result.medications && (
                        <TabsTrigger value="medications">
                          Medications
                        </TabsTrigger>
                      )}
                      {result.homeRemedies && (
                        <TabsTrigger value="homeRemedies">
                          Home Care
                        </TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="treatments" className="mt-4">
                      <ul className="space-y-2 list-disc list-inside text-gray-700">
                        {result.treatments.map((treatment, i) => (
                          <li key={i}>{treatment}</li>
                        ))}
                      </ul>
                    </TabsContent>

                    {result.medications && (
                      <TabsContent value="medications" className="mt-4">
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                          {result.medications.map((medication, i) => (
                            <li key={i}>{medication}</li>
                          ))}
                        </ul>
                        <p className="text-sm text-amber-600 mt-3 flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          Medications should only be given under veterinary
                          supervision.
                        </p>
                      </TabsContent>
                    )}

                    {result.homeRemedies && (
                      <TabsContent value="homeRemedies" className="mt-4">
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                          {result.homeRemedies.map((remedy, i) => (
                            <li key={i}>{remedy}</li>
                          ))}
                        </ul>
                      </TabsContent>
                    )}
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-5">
                  {result.urgency === "Emergency" && (
                    <Button variant="destructive" className="w-full sm:w-auto">
                      <Phone className="mr-2 h-4 w-4" />
                      Find Emergency Vet
                    </Button>
                  )}
                  <Button className="w-full sm:w-auto bg-green-700 hover:bg-green-800">
                    <Pill className="mr-2 h-4 w-4" />
                    More Information
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Vet Appointment
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <div className="rounded-lg border p-6 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-800 mb-2">
                    Important Disclaimer
                  </h3>
                  <p className="text-amber-800 text-sm">
                    The information provided is based on the symptoms you
                    reported and should not be considered a definitive
                    diagnosis. Always consult with a qualified veterinarian for
                    proper diagnosis and treatment of your pet's health
                    conditions.
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="bg-white hover:bg-white text-amber-800 border-amber-300"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Find a Veterinarian Near You
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
