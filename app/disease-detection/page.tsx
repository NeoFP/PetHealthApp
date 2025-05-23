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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Common symptoms for pets
const commonSymptoms = [
  { id: "vomiting", label: "Vomiting" },
  { id: "diarrhea", label: "Diarrhea" },
  { id: "lethargy", label: "Lethargy/Weakness" },
  { id: "appetite_loss", label: "Loss of Appetite" },
  { id: "coughing", label: "Coughing" },
  { id: "sneezing", label: "Sneezing" },
  { id: "itching", label: "Itching/Scratching" },
  { id: "hair_loss", label: "Hair Loss" },
  { id: "increased_thirst", label: "Increased Thirst" },
  { id: "increased_urination", label: "Increased Urination" },
  { id: "limping", label: "Limping/Lameness" },
  { id: "eye_discharge", label: "Eye Discharge" },
  { id: "nose_discharge", label: "Nasal Discharge" },
  { id: "breathing_difficulty", label: "Difficulty Breathing" },
];

export default function DiseaseDetectionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("symptoms");

  // Form state
  const [petType, setPetType] = useState("dog");
  const [age, setAge] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomDuration, setSymptomDuration] = useState("");
  const [symptomSeverity, setSymptomSeverity] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [previousConditions, setPreviousConditions] = useState("");

  // Quick assessment state
  const [quickPetType, setQuickPetType] = useState("dog");
  const [primarySymptom, setPrimarySymptom] = useState("");
  const [urgency, setUrgency] = useState("medium");

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Build query params with the selected symptoms
      const params = new URLSearchParams({
        petType,
        symptoms: selectedSymptoms.join(","),
        duration: symptomDuration,
        severity: symptomSeverity,
      });

      router.push(`/disease-detection/results?${params.toString()}`);
    } catch (error) {
      toast.error("Failed to analyze symptoms. Please try again.");
      setIsLoading(false);
    }
  };

  const handleQuick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!primarySymptom) {
      toast.error("Please describe the main symptom");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const params = new URLSearchParams({
        petType: quickPetType,
        mainSymptom: primarySymptom,
        urgency,
      });

      router.push(`/disease-detection/results?${params.toString()}`);
    } catch (error) {
      toast.error("Failed to analyze symptoms. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Pet Disease Detection
          </h1>
          <p className="text-gray-600">
            Identify potential health issues by analyzing your pet's symptoms
          </p>
        </div>

        <Tabs
          defaultValue="symptoms"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="symptoms">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="quick">Quick Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Analysis</CardTitle>
                <CardDescription>
                  Provide detailed information about your pet's symptoms for a
                  more accurate analysis
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleDetailed}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pet-type">Pet Type</Label>
                      <Select value={petType} onValueChange={setPetType}>
                        <SelectTrigger id="pet-type">
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

                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Select value={age} onValueChange={setAge}>
                        <SelectTrigger id="age">
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="puppy_kitten">
                            Puppy/Kitten (0-1 year)
                          </SelectItem>
                          <SelectItem value="young_adult">
                            Young Adult (1-3 years)
                          </SelectItem>
                          <SelectItem value="adult">
                            Adult (3-7 years)
                          </SelectItem>
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

                  <div className="space-y-3">
                    <Label>Symptoms (select all that apply)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {commonSymptoms.map((symptom) => (
                        <div
                          key={symptom.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={symptom.id}
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={(checked) =>
                              handleSymptomChange(symptom.id, checked === true)
                            }
                          />
                          <Label htmlFor={symptom.id} className="font-normal">
                            {symptom.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="symptom-duration">
                        Duration of Symptoms
                      </Label>
                      <Select
                        value={symptomDuration}
                        onValueChange={setSymptomDuration}
                      >
                        <SelectTrigger id="symptom-duration">
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

                    <div className="space-y-2">
                      <Label>Symptom Severity</Label>
                      <RadioGroup
                        value={symptomSeverity}
                        onValueChange={setSymptomSeverity}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mild" id="severity-mild" />
                          <Label
                            htmlFor="severity-mild"
                            className="font-normal"
                          >
                            Mild - Barely noticeable
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="moderate"
                            id="severity-moderate"
                          />
                          <Label
                            htmlFor="severity-moderate"
                            className="font-normal"
                          >
                            Moderate - Clearly present
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="severe" id="severity-severe" />
                          <Label
                            htmlFor="severity-severe"
                            className="font-normal"
                          >
                            Severe - Significant impact
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previous-conditions">
                      Previous Medical Conditions
                    </Label>
                    <Textarea
                      id="previous-conditions"
                      value={previousConditions}
                      onChange={(e) => setPreviousConditions(e.target.value)}
                      placeholder="List any previous diagnoses or ongoing health issues"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-info">
                      Additional Information
                    </Label>
                    <Textarea
                      id="additional-info"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Any other details that might be relevant (changes in environment, diet, etc.)"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-green-700 hover:bg-green-800"
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
          </TabsContent>

          <TabsContent value="quick">
            <Card>
              <CardHeader>
                <CardTitle>Quick Assessment</CardTitle>
                <CardDescription>
                  Get a rapid assessment of your pet's main symptom
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleQuick}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="quick-pet-type">Pet Type</Label>
                    <Select
                      value={quickPetType}
                      onValueChange={setQuickPetType}
                    >
                      <SelectTrigger id="quick-pet-type">
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

                  <div className="space-y-2">
                    <Label htmlFor="primary-symptom">Main Symptom</Label>
                    <Textarea
                      id="primary-symptom"
                      value={primarySymptom}
                      onChange={(e) => setPrimarySymptom(e.target.value)}
                      placeholder="Describe the most concerning symptom you've noticed"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>How urgent does it seem?</Label>
                    <RadioGroup
                      value={urgency}
                      onValueChange={setUrgency}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="urgency-low" />
                        <Label htmlFor="urgency-low" className="font-normal">
                          Low - Monitoring the situation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="urgency-medium" />
                        <Label htmlFor="urgency-medium" className="font-normal">
                          Medium - Concerned but not emergency
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="urgency-high" />
                        <Label htmlFor="urgency-high" className="font-normal">
                          High - Very concerned, may need immediate attention
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-green-700 hover:bg-green-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" className="mr-2" />
                    ) : null}
                    {isLoading ? "Analyzing..." : "Get Quick Assessment"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 border rounded-lg bg-yellow-50 border-yellow-200">
          <h3 className="font-bold text-amber-800 mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          <p className="text-amber-800">
            This tool is designed to help identify potential health issues, but
            it is not a substitute for professional veterinary care. If your pet
            is experiencing severe symptoms or you're concerned about their
            health, please consult with a veterinarian immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
