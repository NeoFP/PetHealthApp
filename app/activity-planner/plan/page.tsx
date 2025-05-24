"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  ArrowLeft,
  AlertTriangle,
  Download,
  Printer,
  Share2,
  CheckCircle,
  Activity,
  Clock,
} from "lucide-react";

interface ApiResponse {
  exercise_plan: string;
}

interface StoredResult {
  result: ApiResponse;
  formData: {
    petName: string;
    breed: string;
    ageMonths: string;
    weight: string;
    disease?: string;
    ownerPreferences?: string;
    vetRecommendations?: string;
    currentActivityLevel: string;
    availableSpace: string;
    timeAvailable?: string;
    weatherPreferences?: string[];
    healthLimitations?: string;
  };
  apiPayload: {
    dog_inputs: {
      Breed: string;
      "Age (months)": number;
      "Weight (kg)": number;
      Disease: string;
    };
    owner_preferences: string;
    vet_recommendations: string;
  };
}

export default function ActivityPlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<StoredResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("activityPlanResult");
      if (!storedData) {
        setError("No activity plan data found. Please generate a plan first.");
        setLoading(false);
        return;
      }

      const parsedData: StoredResult = JSON.parse(storedData);
      setResultData(parsedData);
      setLoading(false);
    } catch (err) {
      console.error("Error parsing stored data:", err);
      setError("Error loading activity plan. Please try again.");
      setLoading(false);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!resultData) return;

    const content = resultData.result.exercise_plan;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resultData.formData.petName}_activity_plan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share && resultData) {
      navigator.share({
        title: `${resultData.formData.petName}'s Activity Plan`,
        text: "Check out this personalized activity plan!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Function to parse and format the markdown-like content
  const formatActivityPlan = (content: string) => {
    const lines = content.split("\n");
    const formatted: React.ReactElement[] = [];
    let currentSection = "";
    let listItems: string[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        // Flush any pending list items
        if (listItems.length > 0) {
          formatted.push(
            <ul
              key={`list-${index}`}
              className="list-disc list-inside space-y-1 mb-4 text-gray-700"
            >
              {listItems.map((item, i) => (
                <li key={i} className="ml-4">
                  {item}
                </li>
              ))}
            </ul>
          );
          listItems = [];
        }

        // This is a heading
        const heading = trimmed.replace(/\*\*/g, "");
        if (
          heading.includes("Recommended Exercises") ||
          heading.includes("Exercise Plan")
        ) {
          formatted.push(
            <h1 key={index} className="text-3xl font-bold text-green-800 mb-6">
              {heading}
            </h1>
          );
        } else if (
          ["Morning Activity", "Afternoon Activity", "Evening Activity"].some(
            (period) => heading.includes(period)
          )
        ) {
          formatted.push(
            <h3
              key={index}
              className="text-xl font-semibold text-green-700 mt-8 mb-4 flex items-center"
            >
              <Clock className="h-5 w-5 mr-2" />
              {heading}
            </h3>
          );
        } else {
          formatted.push(
            <h2
              key={index}
              className="text-2xl font-semibold text-gray-800 mt-8 mb-4 flex items-center"
            >
              <Activity className="h-5 w-5 mr-2" />
              {heading}
            </h2>
          );
        }
      } else if (trimmed.startsWith("-")) {
        // This is a list item
        listItems.push(trimmed.substring(1).trim());
      } else if (trimmed && !trimmed.startsWith("**")) {
        // Flush any pending list items
        if (listItems.length > 0) {
          formatted.push(
            <ul
              key={`list-${index}`}
              className="list-disc list-inside space-y-1 mb-4 text-gray-700"
            >
              {listItems.map((item, i) => (
                <li key={i} className="ml-4">
                  {item}
                </li>
              ))}
            </ul>
          );
          listItems = [];
        }

        // Regular paragraph
        if (trimmed.includes(":")) {
          const [label, value] = trimmed.split(":");
          formatted.push(
            <p key={index} className="mb-2">
              <span className="font-medium text-gray-800">{label}:</span>
              <span className="text-gray-700">{value}</span>
            </p>
          );
        } else {
          formatted.push(
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {trimmed}
            </p>
          );
        }
      }
    });

    // Flush any remaining list items
    if (listItems.length > 0) {
      formatted.push(
        <ul
          key="final-list"
          className="list-disc list-inside space-y-1 mb-4 text-gray-700"
        >
          {listItems.map((item, i) => (
            <li key={i} className="ml-4">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return formatted;
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="flex justify-center items-center min-h-screen p-8 w-full">
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-lg">Loading your activity plan...</p>
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
                  Error Loading Plan
                </h2>
                <p className="text-red-700 mb-6">{error}</p>
                <Button
                  onClick={() => router.push("/activity-planner")}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Activity Planner
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const { result, formData } = resultData;

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex justify-center items-start min-h-screen p-8 w-full">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/activity-planner")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Activity Planner
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          {/* Pet Summary Card */}
          <Card className="bg-green-50 border-2 border-green-200 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Activity Plan Generated for {formData.petName}
              </CardTitle>
              <CardDescription className="text-lg">
                Personalized exercise plan based on AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-medium text-gray-600">Breed</p>
                  <p className="text-lg">{formData.breed}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Age</p>
                  <p className="text-lg">{formData.ageMonths} months</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Weight</p>
                  <p className="text-lg">{formData.weight} kg</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Activity Level</p>
                  <p className="text-lg capitalize">
                    {formData.currentActivityLevel}
                  </p>
                </div>
              </div>
              {formData.disease && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="font-medium text-amber-800">
                    Health Condition:
                  </p>
                  <p className="text-amber-700">{formData.disease}</p>
                </div>
              )}
              {formData.availableSpace && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-800">Available Space:</p>
                  <p className="text-blue-700 capitalize">
                    {formData.availableSpace.replace("_", " ")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Plan Content */}
          <Card className="bg-white border-2 mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {formatActivityPlan(result.exercise_plan)}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {(formData.ownerPreferences || formData.vetRecommendations) && (
            <Card className="bg-blue-50 border-2 border-blue-200 mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">
                  Additional Considerations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.ownerPreferences && (
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Owner Preferences:
                    </h4>
                    <p className="text-blue-700">{formData.ownerPreferences}</p>
                  </div>
                )}
                {formData.vetRecommendations && (
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Veterinarian Recommendations:
                    </h4>
                    <p className="text-blue-700">
                      {formData.vetRecommendations}
                    </p>
                  </div>
                )}
                {formData.timeAvailable && (
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Available Time:
                    </h4>
                    <p className="text-blue-700">{formData.timeAvailable}</p>
                  </div>
                )}
                {formData.healthLimitations && (
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Health Limitations:
                    </h4>
                    <p className="text-blue-700">
                      {formData.healthLimitations}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Disclaimer */}
          <div className="rounded-lg border-2 p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-2 text-lg">
                  Important Exercise Disclaimer
                </h3>
                <p className="text-amber-800 text-base leading-relaxed">
                  This AI-generated activity plan is based on the information
                  you provided and should be used as a general guide only.
                  Always consult with a qualified veterinarian before starting
                  new exercise routines, especially if your pet has health
                  conditions or physical limitations. Monitor your pet during
                  activities and adjust intensity as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
