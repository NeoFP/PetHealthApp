"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "@/components/ui/notification";
import {
  Pill,
  Clock,
  AlertTriangle,
  Printer,
  Share2,
  ArrowLeft,
} from "lucide-react";

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  description: string;
  warnings: string[];
}

interface MedicationAdvice {
  disease: string;
  description: string;
  generalAdvice: string;
  medications: Medication[];
}

// Mock medication data
const medicationDatabase: Record<string, MedicationAdvice> = {
  "Canine Parvovirus": {
    disease: "Canine Parvovirus",
    description:
      "A highly contagious viral disease affecting dogs, especially puppies, characterized by severe vomiting and bloody diarrhea.",
    generalAdvice:
      "Parvovirus requires immediate veterinary attention. Treatment typically involves hospitalization for intensive supportive care including IV fluids, anti-nausea medications, and antibiotics to prevent secondary infections.",
    medications: [
      {
        name: "Intravenous Fluids",
        dosage: "As directed by veterinarian",
        frequency: "Continuous during hospitalization",
        description: "To combat dehydration caused by vomiting and diarrhea.",
        warnings: ["Must be administered by a veterinary professional"],
      },
      {
        name: "Cerenia (Maropitant)",
        dosage: "1mg per kg of body weight",
        frequency: "Once daily",
        description: "Anti-nausea medication to control vomiting.",
        warnings: ["May cause drowsiness", "Not for use in very young puppies"],
      },
      {
        name: "Broad-spectrum Antibiotics",
        dosage: "As prescribed by veterinarian",
        frequency: "2-3 times daily",
        description: "To prevent or treat secondary bacterial infections.",
        warnings: [
          "Complete full course as prescribed",
          "May cause digestive upset",
        ],
      },
    ],
  },
  "Kennel Cough": {
    disease: "Kennel Cough",
    description:
      "A respiratory infection that causes a persistent, forceful cough in dogs, similar to whooping cough in humans.",
    generalAdvice:
      "Most cases of kennel cough resolve on their own with rest and supportive care. Keep your dog in a humid environment and avoid using collars that may irritate the throat.",
    medications: [
      {
        name: "Doxycycline",
        dosage: "5mg per kg of body weight",
        frequency: "Twice daily",
        description:
          "Antibiotic to treat or prevent secondary bacterial infections.",
        warnings: [
          "Give with food to prevent stomach upset",
          "May cause sun sensitivity",
        ],
      },
      {
        name: "Robitussin DM",
        dosage: "0.5-1mg per kg of body weight",
        frequency: "2-3 times daily",
        description:
          "Cough suppressant to provide relief from persistent coughing.",
        warnings: [
          "Use only formulations without additional medications",
          "Consult vet for exact dosing",
        ],
      },
      {
        name: "Honey",
        dosage: "1/2 to 1 teaspoon",
        frequency: "2-3 times daily",
        description: "Natural remedy to soothe throat irritation.",
        warnings: [
          "Not suitable for puppies under one year",
          "Use pure, raw honey",
        ],
      },
    ],
  },
  "Canine Diabetes": {
    disease: "Canine Diabetes",
    description:
      "A condition in which the dog's body cannot properly regulate blood sugar levels due to issues with insulin production or function.",
    generalAdvice:
      "Managing diabetes requires a consistent routine of insulin injections, diet, and exercise. Regular monitoring of blood glucose levels is essential.",
    medications: [
      {
        name: "Insulin (Vetsulin/Caninsulin)",
        dosage: "As prescribed by veterinarian",
        frequency: "Usually twice daily with meals",
        description: "Hormone injection to control blood sugar levels.",
        warnings: [
          "Must be stored properly in refrigerator",
          "Requires careful dosing based on regular glucose testing",
        ],
      },
      {
        name: "Prescription Diabetic Diet",
        dosage: "Based on dog's weight and caloric needs",
        frequency: "Consistent meal times, usually twice daily",
        description:
          "Special diet formulated to help regulate blood glucose levels.",
        warnings: [
          "Change diets gradually",
          "Avoid treats that aren't part of the prescribed diet",
        ],
      },
    ],
  },
  "Skin Allergy": {
    disease: "Skin Allergy",
    description:
      "An allergic reaction causing skin irritation, often due to food, environmental factors, or parasites.",
    generalAdvice:
      "Identifying and avoiding the allergen is the best treatment. Regular bathing with hypoallergenic shampoo can help soothe skin.",
    medications: [
      {
        name: "Apoquel",
        dosage: "0.4-0.6mg per kg of body weight",
        frequency: "Once or twice daily",
        description:
          "Reduces itching and inflammation associated with allergic dermatitis.",
        warnings: [
          "Not for use in dogs less than 12 months old",
          "May increase susceptibility to infection",
        ],
      },
      {
        name: "Diphenhydramine (Benadryl)",
        dosage: "2-4mg per kg of body weight",
        frequency: "2-3 times daily",
        description: "Antihistamine to reduce allergic reactions.",
        warnings: [
          "May cause drowsiness",
          "Use only plain Benadryl without added ingredients",
        ],
      },
      {
        name: "Medicated Shampoo",
        dosage: "As directed on product",
        frequency: "Weekly or as directed",
        description: "Soothes irritated skin and reduces allergens on coat.",
        warnings: ["Avoid getting in eyes", "Rinse thoroughly"],
      },
    ],
  },
  Arthritis: {
    disease: "Arthritis",
    description:
      "Inflammation of the joints causing pain and stiffness, more common in older dogs or larger breeds.",
    generalAdvice:
      "Weight management is crucial for dogs with arthritis. Provide soft bedding, avoid excessive exercise, and consider ramps for stairs or getting into vehicles.",
    medications: [
      {
        name: "Carprofen (Rimadyl)",
        dosage: "2mg per kg of body weight",
        frequency: "Twice daily",
        description:
          "Non-steroidal anti-inflammatory drug (NSAID) to reduce pain and inflammation.",
        warnings: [
          "May cause liver or kidney issues",
          "Regular blood tests recommended",
          "Give with food",
        ],
      },
      {
        name: "Glucosamine/Chondroitin Supplement",
        dosage: "Based on product and dog's weight",
        frequency: "Daily",
        description:
          "Joint supplement to support cartilage health and reduce inflammation.",
        warnings: [
          "May take several weeks to show effects",
          "Quality varies between products",
        ],
      },
      {
        name: "CBD Oil",
        dosage: "0.1-0.2mg per kg of body weight to start",
        frequency: "1-2 times daily",
        description: "May help reduce pain and inflammation.",
        warnings: [
          "Quality and concentration vary widely between products",
          "Consult veterinarian before use",
        ],
      },
    ],
  },
  "Unknown condition": {
    disease: "Unknown condition",
    description:
      "Based on the symptoms provided, we couldn't identify a specific condition with high confidence.",
    generalAdvice:
      "When symptoms persist but the cause is unclear, it's especially important to consult with a veterinarian for proper diagnosis and treatment.",
    medications: [
      {
        name: "Veterinary Examination",
        dosage: "N/A",
        frequency: "As soon as possible",
        description:
          "A thorough examination by a veterinarian is recommended to properly diagnose the condition.",
        warnings: [
          "Do not delay seeking professional help if symptoms are severe or persistent",
        ],
      },
    ],
  },
};

export default function MedicationAdvicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [advice, setAdvice] = useState<MedicationAdvice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const diseaseParam = searchParams.get("disease");

    if (!diseaseParam) {
      toast.error("No disease specified");
      router.push("/disease-detection");
      return;
    }

    // Simulate API call delay
    const timer = setTimeout(() => {
      const medicationAdvice =
        medicationDatabase[diseaseParam] ||
        medicationDatabase["Unknown condition"];
      setAdvice(medicationAdvice);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share && advice) {
      navigator
        .share({
          title: `Medication Advice for ${advice.disease}`,
          text: `Here's some information about medications for ${advice.disease}`,
          url: window.location.href,
        })
        .catch((err) => {
          toast.error("Couldn't share content");
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg">Gathering medication information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Medication Advice</h1>
          <p className="text-lg text-muted-foreground">
            Suggested treatments for {advice?.disease}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>General Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{advice?.generalAdvice}</p>
            </CardContent>
          </Card>

          <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Veterinary Guidance Required</p>
              <p className="text-sm mt-1">
                The medications and dosages listed are for informational
                purposes only. Always consult with a veterinarian before
                administering any medication to your pet.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Recommended Medications</h2>

        <div className="space-y-6 mb-8">
          {advice?.medications.map((med, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">{med.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Dosage
                    </h4>
                    <p>{med.dosage}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Frequency
                      </h4>
                      <p>{med.frequency}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Description
                  </h4>
                  <p>{med.description}</p>
                </div>

                {med.warnings.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Warnings & Precautions
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {med.warnings.map((warning, i) => (
                        <li key={i} className="text-red-600 dark:text-red-400">
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Advice
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
