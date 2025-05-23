"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  ArrowLeft,
  AlertTriangle,
  Info,
  ExternalLink,
  Phone,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface ApiResponse {
  predicted_condition: {
    advice: string[];
    disease: string;
  };
}

interface StoredResult {
  result: ApiResponse;
  petType: string;
  selectedSymptoms?: string[];
  symptomDuration?: string;
  symptomSeverity?: string;
  additionalInfo?: string;
  previousConditions?: string;
}

export default function DiseaseDetectionResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<StoredResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("diseaseDetectionResult");
      if (!storedData) {
        setError("No analysis data found. Please run the analysis again.");
        setLoading(false);
        return;
      }

      const parsedData: StoredResult = JSON.parse(storedData);
      setResultData(parsedData);
      setLoading(false);
    } catch (err) {
      console.error("Error parsing stored data:", err);
      setError("Error loading analysis results. Please try again.");
      setLoading(false);
    }
  }, []);

  const getSeverityColor = (disease: string) => {
    // Basic severity mapping based on disease type
    const severeConditions = [
      "cancer",
      "kidney failure",
      "heart failure",
      "toxicity",
    ];
    const moderateConditions = [
      "infection",
      "allergy",
      "diabetes",
      "arthritis",
    ];

    const lowercaseDisease = disease.toLowerCase();

    if (
      severeConditions.some((condition) => lowercaseDisease.includes(condition))
    ) {
      return "bg-red-100 text-red-800 border-red-200";
    } else if (
      moderateConditions.some((condition) =>
        lowercaseDisease.includes(condition)
      )
    ) {
      return "bg-amber-100 text-amber-800 border-amber-200";
    } else {
      return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getUrgencyColor = (advice: string[]) => {
    const urgentKeywords = ["emergency", "immediate", "urgent", "hospital"];
    const moderateKeywords = ["soon", "vet", "veterinarian", "consult"];

    const adviceText = advice.join(" ").toLowerCase();

    if (urgentKeywords.some((keyword) => adviceText.includes(keyword))) {
      return "bg-red-100 text-red-800 border-red-200";
    } else if (
      moderateKeywords.some((keyword) => adviceText.includes(keyword))
    ) {
      return "bg-amber-100 text-amber-800 border-amber-200";
    } else {
      return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const formatDiseaseName = (disease: string) => {
    return disease
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatSymptomName = (symptom: string) => {
    return symptom
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="flex justify-center items-center min-h-screen p-8 w-full">
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-lg">Loading analysis results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="flex justify-center items-center min-h-screen p-8 w-full">
          <div className="w-full max-w-2xl">
            <Card className="bg-red-50 border-2 border-red-200">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-800 mb-4">
                  Error Loading Results
                </h2>
                <p className="text-red-700 mb-6">{error}</p>
                <Button
                  onClick={() => router.push("/disease-detection")}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Disease Detection
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const { result, petType, selectedSymptoms } = resultData;
  const { predicted_condition } = result;

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex justify-center items-start min-h-screen p-8 w-full">
        <div className="w-full max-w-5xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/disease-detection")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Disease Detection
          </Button>

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Analysis Results
            </h1>
            <p className="text-lg text-gray-600">
              Based on the symptoms analyzed, here is the predicted condition
              for your {petType}.
            </p>
          </div>

          {/* Main Result Card */}
          <Card className="bg-white border-2 mb-8">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl text-green-800 mb-2">
                    {formatDiseaseName(predicted_condition.disease)}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Predicted condition for your{" "}
                    {petType === "dog"
                      ? "canine"
                      : petType === "cat"
                      ? "feline"
                      : petType}
                  </CardDescription>
                </div>
                <div className="text-right space-y-2">
                  <Badge
                    className={getSeverityColor(predicted_condition.disease)}
                  >
                    AI Prediction
                  </Badge>
                  <br />
                  <Badge
                    className={getUrgencyColor(predicted_condition.advice)}
                  >
                    {predicted_condition.advice.some(
                      (advice) =>
                        advice.toLowerCase().includes("emergency") ||
                        advice.toLowerCase().includes("immediate")
                    )
                      ? "Urgent"
                      : "Consult Vet"}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Symptoms Analysis */}
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Symptoms Analyzed
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedSymptoms?.map((symptom, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-blue-50 text-center py-2"
                    >
                      {formatSymptomName(symptom)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Medical Advice */}
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-600" />
                  Recommended Actions
                </h3>
                <div className="space-y-3">
                  {predicted_condition.advice.map((advice, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500"
                    >
                      <p className="text-gray-800 font-medium">{advice}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information if available */}
              {resultData.additionalInfo && (
                <div>
                  <h3 className="font-bold text-xl mb-4">
                    Additional Information Provided
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{resultData.additionalInfo}</p>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-4 border-t pt-6">
              {predicted_condition.advice.some(
                (advice) =>
                  advice.toLowerCase().includes("emergency") ||
                  advice.toLowerCase().includes("immediate")
              ) && (
                <Button variant="destructive" className="w-full sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Find Emergency Vet
                </Button>
              )}
              <Button className="w-full sm:w-auto bg-green-700 hover:bg-green-800">
                <Calendar className="mr-2 h-4 w-4" />
                Book Vet Appointment
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <ExternalLink className="mr-2 h-4 w-4" />
                Learn More About{" "}
                {formatDiseaseName(predicted_condition.disease)}
              </Button>
            </CardFooter>
          </Card>

          {/* Disclaimer */}
          <div className="rounded-lg border-2 p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-2 text-lg">
                  Important Medical Disclaimer
                </h3>
                <p className="text-amber-800 text-base leading-relaxed">
                  This AI-powered analysis is based on the symptoms you reported
                  and should not be considered a definitive diagnosis. It is
                  intended for informational purposes only. Always consult with
                  a qualified veterinarian for proper diagnosis, treatment, and
                  professional medical advice for your pet's health conditions.
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
      </div>
    </div>
  );
}
