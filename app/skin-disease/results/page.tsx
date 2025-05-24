"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  CheckCircle,
  Pill,
  Home,
  Clock,
  Info,
  Eye,
  Download,
  Printer,
  Share2,
} from "lucide-react";

interface Treatment {
  name: string;
  usage?: string;
  dosage?: string;
  ingredients?: string[];
}

interface ApiResponse {
  disease: string;
  home_treatment: Treatment[];
  when_to_see_vet: string[];
}

interface StoredResult {
  result: ApiResponse;
  imagePreview: string;
}

export default function SkinDiseaseResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<StoredResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("skinDiseaseResult");
      if (!storedData) {
        setError("No analysis results found. Please upload an image first.");
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!resultData) return;

    const content = `Skin Disease Analysis Results
    
Disease Detected: ${resultData.result.disease}

Home Treatment Options:
${resultData.result.home_treatment
  .map(
    (treatment, index) =>
      `${index + 1}. ${treatment.name}
${
  treatment.ingredients
    ? `   Ingredients: ${treatment.ingredients.join(", ")}`
    : ""
}
${treatment.usage ? `   Usage: ${treatment.usage}` : ""}
${treatment.dosage ? `   Dosage: ${treatment.dosage}` : ""}
`
  )
  .join("\n")}

When to See a Veterinarian:
${resultData.result.when_to_see_vet
  .map((item, index) => `${index + 1}. ${item}`)
  .join("\n")}

Important: This is an AI-generated analysis for informational purposes only. Always consult with a qualified veterinarian for proper diagnosis and treatment.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skin_disease_analysis.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share && resultData) {
      navigator.share({
        title: "Pet Skin Disease Analysis",
        text: `Skin disease detected: ${resultData.result.disease}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
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
                  onClick={() => router.push("/skin-disease")}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Skin Disease Tool
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const { result } = resultData;

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex justify-center items-start min-h-screen p-8 w-full">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/skin-disease")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Skin Disease Tool
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="space-y-6">
              <Card className="bg-white border-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Analyzed Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-80 w-full overflow-hidden rounded-lg border-2">
                    <Image
                      src={resultData.imagePreview}
                      alt="Analyzed skin condition"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* Diagnosis */}
              <Card className="bg-green-50 border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800 flex items-center">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Diagnosis Complete
                  </CardTitle>
                  <CardDescription className="text-lg">
                    AI analysis has been completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Detected Condition:
                    </h3>
                    <p className="text-2xl font-bold text-green-800 capitalize">
                      {result.disease}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Home Treatment Options */}
          <Card className="bg-white border-2 mt-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Home className="h-6 w-6 mr-2" />
                Home Treatment Options
              </CardTitle>
              <CardDescription className="text-base">
                Recommended treatments you can try at home
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.home_treatment.map((treatment, index) => (
                  <div
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <h4 className="font-semibold text-lg text-blue-800 mb-3 flex items-center">
                      <Pill className="h-4 w-4 mr-2" />
                      {treatment.name}
                    </h4>

                    {treatment.ingredients && (
                      <div className="mb-3">
                        <p className="font-medium text-blue-700 mb-1">
                          Ingredients:
                        </p>
                        <p className="text-blue-600">
                          {treatment.ingredients.join(", ")}
                        </p>
                      </div>
                    )}

                    {treatment.usage && (
                      <div className="mb-3">
                        <p className="font-medium text-blue-700 mb-1">Usage:</p>
                        <p className="text-blue-600">{treatment.usage}</p>
                      </div>
                    )}

                    {treatment.dosage && (
                      <div className="mb-3">
                        <p className="font-medium text-blue-700 mb-1">
                          Dosage:
                        </p>
                        <p className="text-blue-600">{treatment.dosage}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* When to See Vet */}
          <Card className="bg-amber-50 border-2 border-amber-200 mt-8">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                When to See a Veterinarian
              </CardTitle>
              <CardDescription className="text-base text-amber-700">
                Watch for these warning signs that require professional care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.when_to_see_vet.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-800 text-base">{warning}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="rounded-lg border-2 p-6 bg-red-50 border-red-200 mt-8">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-red-800 mb-2 text-lg">
                  Important Medical Disclaimer
                </h3>
                <p className="text-red-800 text-base leading-relaxed">
                  This AI-generated analysis is for informational purposes only
                  and should not replace professional veterinary diagnosis and
                  treatment. The accuracy of AI analysis may vary, and some
                  conditions may require laboratory tests or physical
                  examination for proper diagnosis. Always consult with a
                  qualified veterinarian for proper medical advice, especially
                  for serious or persistent conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
