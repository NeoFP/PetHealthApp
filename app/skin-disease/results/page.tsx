"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "@/components/ui/notification";
import { ArrowLeft, Info, Check, X } from "lucide-react";

interface DetectionResult {
  condition: string;
  confidence: number;
  description: string;
  treatment: string[];
  prevention: string[];
}

// Mock data for skin conditions
const skinConditionData: DetectionResult = {
  condition: "Canine Atopic Dermatitis",
  confidence: 87,
  description:
    "Canine Atopic Dermatitis is an inflammatory, chronic skin disease associated with allergies. It's characterized by itchiness that causes the dog to scratch and lick excessively, especially at the face, paws, ears, folds of the skin, and underarms.",
  treatment: [
    "Anti-itch medications such as Apoquel or Cytopoint",
    "Medicated shampoos containing oatmeal or hydrocortisone",
    "Topical treatments to soothe irritated areas",
    "Oral antibiotics if secondary bacterial infections are present",
    "Fatty acid supplements to improve skin health",
  ],
  prevention: [
    "Regular bathing with hypoallergenic shampoo",
    "Identifying and avoiding allergens when possible",
    "Maintaining flea control year-round",
    "Regular cleaning of bedding and living areas",
    "Dietary management with hypoallergenic food if food allergies are suspected",
  ],
};

export default function SkinDiseaseResultsPage() {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate API call to get detection results
    const timer = setTimeout(() => {
      setResult(skinConditionData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg">
            Finalizing analysis of skin condition...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/skin-disease")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Upload
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Skin Disease Analysis Results
          </h1>
          <p className="text-lg text-muted-foreground">
            Based on the image provided, we've analyzed the skin condition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detected Condition</CardTitle>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {result?.confidence || 0}% Confidence
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative rounded-lg overflow-hidden border">
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <p className="text-sm text-muted-foreground">Image preview</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{result?.condition}</h3>
                <p className="text-muted-foreground">{result?.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Confidence Level</h4>
                <Progress value={result?.confidence || 0} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Treatment Suggestions</CardTitle>
              <CardDescription>
                Recommended approaches for managing this condition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Recommended Treatment
                </h3>
                <ul className="space-y-2">
                  {result?.treatment.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center mr-2 mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <Info className="h-4 w-4 mr-2 text-blue-500" />
                  Prevention Tips
                </h3>
                <ul className="space-y-2">
                  {result?.prevention.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-5 w-5 shrink-0 rounded-full bg-blue-500/20 text-blue-600 flex items-center justify-center mr-2 mt-0.5">
                        <Info className="h-3 w-3" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-800 dark:text-yellow-300 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Important Note
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-800 dark:text-yellow-300">
            <p>
              This analysis is based on image recognition technology and should
              not replace professional veterinary advice. Please consult with a
              veterinarian for a proper diagnosis and treatment plan for your
              pet's skin condition.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button onClick={() => router.push("/skin-disease")}>
            Analyze Another Image
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
