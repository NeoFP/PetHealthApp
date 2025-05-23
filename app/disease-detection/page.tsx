"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/notification";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Common symptoms for pets
const commonSymptoms = [
  { id: "past disease", label: "Past Disease" },
  { id: "fever", label: "Fever" },
  { id: "shortness of breathe", label: "Shortness of Breath" },
  { id: "fatigue", label: "Fatigue" },
  { id: "joint pain", label: "Joint Pain" },
  { id: "cough", label: "Cough" },
  { id: "abdominal pain", label: "Abdominal Pain" },
  { id: "dizziness", label: "Dizziness" },
  { id: "nausea", label: "Nausea" },
  { id: "vomiting", label: "Vomiting" },
  { id: "diarrhea", label: "Diarrhea" },
  { id: "seizures", label: "Seizures" },
  { id: "incordination", label: "Incoordination" },
  { id: "headtilt", label: "Head Tilt" },
  { id: "difficulty in urination", label: "Difficulty in Urination" },
  { id: "blood in uri", label: "Blood in Urine" },
  { id: "urinarry dribbling", label: "Urinary Dribbling" },
  { id: "limping", label: "Limping" },
  { id: "hemoglobin uria", label: "Hemoglobin in Urine" },
  { id: "pale gums", label: "Pale Gums" },
  { id: "reduced appetite", label: "Reduced Appetite" },
  { id: "cyanosed gums", label: "Cyanosed Gums" },
  { id: "hyperemic gums", label: "Hyperemic Gums" },
  { id: "ascities", label: "Ascites" },
  { id: "jaundice", label: "Jaundice" },
];

export default function DiseaseDetectionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form state for detailed analysis
  const [petType, setPetType] = useState("dog");
  const [age, setAge] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomDuration, setSymptomDuration] = useState("");
  const [symptomSeverity, setSymptomSeverity] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [previousConditions, setPreviousConditions] = useState("");

  const handleSymptomChange = (symptomId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((id) => id !== symptomId));
    }
  };

  const handleDetailed = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom");
      return;
    }

    setIsLoading(true);

    try {
      // Create the payload with all symptoms (1 for selected, 0 for not selected)
      const symptomsPayload: { [key: string]: number } = {
        "past disease": 0,
        fever: 0,
        "shortness of breathe": 0,
        fatigue: 0,
        "joint pain": 0,
        cough: 0,
        "abdominal pain": 0,
        dizziness: 0,
        nausea: 0,
        vomiting: 0,
        diarrhea: 0,
        seizures: 0,
        incordination: 0,
        headtilt: 0,
        "difficulty in urination": 0,
        "blood in uri": 0,
        "urinarry dribbling": 0,
        limping: 0,
        "hemoglobin uria": 0,
        "pale gums": 0,
        "reduced appetite": 0,
        "cyanosed gums": 0,
        "hyperemic gums": 0,
        ascities: 0,
        jaundice: 0,
      };

      // Set selected symptoms to 1
      selectedSymptoms.forEach((symptom) => {
        if (symptomsPayload.hasOwnProperty(symptom)) {
          symptomsPayload[symptom] = 1;
        }
      });

      // Make API call
      const response = await fetch("http://localhost:5001/predict/symptom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(symptomsPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction from API");
      }

      const result = await response.json();

      // Store the result and navigate to results
      sessionStorage.setItem(
        "diseaseDetectionResult",
        JSON.stringify({
          result,
          petType,
          selectedSymptoms,
          symptomDuration,
          symptomSeverity,
          additionalInfo,
          previousConditions,
        })
      );

      router.push("/disease-detection/results");
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        "Failed to analyze symptoms. Please check if the API server is running."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex justify-center items-center min-h-screen p-8 w-full">
        <div className="w-full max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Pet Disease Detection
            </h1>
            <p className="text-lg text-gray-600">
              Identify potential health issues by analyzing your pet's symptoms
            </p>
          </div>

          <Card className="bg-white border-2">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">Symptom Analysis</CardTitle>
              <CardDescription className="text-base">
                Provide detailed information about your pet's symptoms for a
                more accurate analysis
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleDetailed}>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="pet-type" className="text-base font-medium">
                      Pet Type
                    </Label>
                    <Select value={petType} onValueChange={setPetType}>
                      <SelectTrigger id="pet-type" className="h-12">
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="small_mammal">
                          Small Mammal
                        </SelectItem>
                        <SelectItem value="reptile">Reptile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="age" className="text-base font-medium">
                      Age
                    </Label>
                    <Select value={age} onValueChange={setAge}>
                      <SelectTrigger id="age" className="h-12">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="puppy_kitten">
                          Puppy/Kitten (0-1 year)
                        </SelectItem>
                        <SelectItem value="young_adult">
                          Young Adult (1-3 years)
                        </SelectItem>
                        <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                        <SelectItem value="mature">
                          Mature Adult (7-10 years)
                        </SelectItem>
                        <SelectItem value="senior">
                          Senior (10+ years)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Symptoms (select all that apply)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    {commonSymptoms.map((symptom) => (
                      <div
                        key={symptom.id}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={symptom.id}
                          checked={selectedSymptoms.includes(symptom.id)}
                          onCheckedChange={(checked) =>
                            handleSymptomChange(symptom.id, checked === true)
                          }
                          className="h-5 w-5"
                        />
                        <Label
                          htmlFor={symptom.id}
                          className="font-normal text-base cursor-pointer"
                        >
                          {symptom.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="symptom-duration"
                      className="text-base font-medium"
                    >
                      Duration of Symptoms
                    </Label>
                    <Select
                      value={symptomDuration}
                      onValueChange={setSymptomDuration}
                    >
                      <SelectTrigger id="symptom-duration" className="h-12">
                        <SelectValue placeholder="How long?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Started today</SelectItem>
                        <SelectItem value="days">Past few days</SelectItem>
                        <SelectItem value="week">About a week</SelectItem>
                        <SelectItem value="weeks">Several weeks</SelectItem>
                        <SelectItem value="month">A month or more</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      Symptom Severity
                    </Label>
                    <RadioGroup
                      value={symptomSeverity}
                      onValueChange={setSymptomSeverity}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="mild"
                          id="severity-mild"
                          className="h-5 w-5"
                        />
                        <Label
                          htmlFor="severity-mild"
                          className="font-normal text-base cursor-pointer"
                        >
                          Mild - Barely noticeable
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="moderate"
                          id="severity-moderate"
                          className="h-5 w-5"
                        />
                        <Label
                          htmlFor="severity-moderate"
                          className="font-normal text-base cursor-pointer"
                        >
                          Moderate - Clearly present
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="severe"
                          id="severity-severe"
                          className="h-5 w-5"
                        />
                        <Label
                          htmlFor="severity-severe"
                          className="font-normal text-base cursor-pointer"
                        >
                          Severe - Significant impact
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="previous-conditions"
                    className="text-base font-medium"
                  >
                    Previous Medical Conditions
                  </Label>
                  <Textarea
                    id="previous-conditions"
                    value={previousConditions}
                    onChange={(e) => setPreviousConditions(e.target.value)}
                    placeholder="List any previous diagnoses or ongoing health issues"
                    className="min-h-[100px] text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="additional-info"
                    className="text-base font-medium"
                  >
                    Additional Information
                  </Label>
                  <Textarea
                    id="additional-info"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Any other details that might be relevant (changes in environment, diet, etc.)"
                    className="min-h-[100px] text-base"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-8">
                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 h-14 text-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : null}
                  {isLoading ? "Analyzing Symptoms..." : "Analyze Symptoms"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-8 p-6 border-2 rounded-lg bg-yellow-50 border-yellow-200">
            <h3 className="font-bold text-amber-800 mb-2 flex items-center text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              Important Notice
            </h3>
            <p className="text-amber-800 text-base">
              This tool is designed to help identify potential health issues,
              but it is not a substitute for professional veterinary care. If
              your pet is experiencing severe symptoms or you're concerned about
              their health, please consult with a veterinarian immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
