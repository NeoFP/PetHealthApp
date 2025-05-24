"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/notification";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Upload, Camera, Info } from "lucide-react";

export default function SkinDiseasePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "camera">(
    "upload"
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, or WebP)");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !imagePreview) {
      toast.error("Please upload an image of the skin condition");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare FormData with image and hardcoded parameters
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Hardcoded parameters based on the image you showed
      formData.append("ears", "flaky");
      formData.append("paws_and_pads", "red");
      formData.append("eyes", "normal");
      formData.append("underbelly", "normal");
      formData.append("tail", "irritated");
      formData.append("armpits", "flaky");
      formData.append("nails", "irritated");
      formData.append("skin_folds", "normal");
      formData.append("overall_coat_condition", "flaky");
      formData.append("dermatitis", "flaky");
      formData.append("flea_allergy", "1");
      formData.append("ringworm", "0");
      formData.append("scabies", "0");

      // Make API call
      const response = await fetch("http://localhost:5001/predict/disease", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze skin condition");
      }

      const result = await response.json();

      // Store result and image preview for the results page
      sessionStorage.setItem(
        "skinDiseaseResult",
        JSON.stringify({
          result,
          imagePreview,
        })
      );

      router.push("/skin-disease/results");
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        "Failed to analyze skin condition. Please check if the API server is running."
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
              Skin Disease Detection
            </h1>
            <p className="text-lg text-gray-600">
              Upload an image of your pet's skin condition for AI-powered
              analysis
            </p>
          </div>

          <Card className="mb-8 bg-white border-2">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">Upload Image</CardTitle>
              <CardDescription className="text-base">
                Please upload a clear, well-lit image of the affected area
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-8">
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Choose how to provide the image
                  </Label>
                  <RadioGroup
                    value={uploadMethod}
                    onValueChange={(value) =>
                      setUploadMethod(value as "upload" | "camera")
                    }
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="upload"
                        id="method-upload"
                        className="h-5 w-5"
                      />
                      <Label
                        htmlFor="method-upload"
                        className="font-normal text-base cursor-pointer"
                      >
                        Upload from device
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="camera"
                        id="method-camera"
                        className="h-5 w-5"
                      />
                      <Label
                        htmlFor="method-camera"
                        className="font-normal text-base cursor-pointer"
                      >
                        Take photo now (mobile only)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-6">
                  {uploadMethod === "upload" ? (
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="image" className="text-base font-medium">
                        Upload Image
                      </Label>
                      <div className="mt-2">
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-10 w-10 text-gray-400 mb-3" />
                            <p className="text-base text-gray-500 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">
                              PNG, JPG or WebP (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="camera" className="text-base font-medium">
                        Take Photo
                      </Label>
                      <div className="mt-2">
                        <label
                          htmlFor="camera-capture"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Camera className="h-10 w-10 text-gray-400 mb-3" />
                            <p className="text-base text-gray-500 mb-1">
                              Click to open camera
                            </p>
                            <p className="text-sm text-gray-500">
                              Take a clear photo of the affected area
                            </p>
                          </div>
                          <input
                            id="camera-capture"
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {imagePreview && (
                    <div className="mt-6">
                      <Label className="mb-3 block text-base font-medium">
                        Image Preview
                      </Label>
                      <div className="relative h-80 w-full overflow-hidden rounded-lg border-2">
                        <Image
                          src={imagePreview}
                          alt="Skin condition preview"
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Information about automatic analysis */}
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Automated Analysis
                  </h3>
                  <p className="text-green-700 text-base">
                    Our AI will automatically analyze your pet's skin condition
                    using advanced image recognition. Simply upload the image
                    and we'll provide a detailed diagnosis with treatment
                    recommendations.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-6 pt-8">
                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 h-14 text-lg font-medium"
                  disabled={isLoading || !imagePreview}
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : null}
                  {isLoading ? "Analyzing Image..." : "Analyze Skin Condition"}
                </Button>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                  <Info className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-base text-blue-800">
                    <p className="font-medium">Image Privacy Notice</p>
                    <p className="mt-1">
                      Your uploaded images are used solely for disease detection
                      and are not stored permanently. All processing is done
                      securely and images are automatically deleted after
                      analysis.
                    </p>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Card>

          <div className="text-center">
            <h3 className="text-xl font-medium mb-4 text-green-800">
              Image Tips for Better Results
            </h3>
            <ul className="text-base text-gray-600 space-y-2 max-w-2xl mx-auto">
              <li>• Take photos in good lighting without shadows</li>
              <li>
                • Get close to the affected area but keep the image in focus
              </li>
              <li>• Include some surrounding normal skin for comparison</li>
              <li>
                • Remove hair/fur from the area if possible (and safe to do so)
              </li>
              <li>• Take multiple photos from different angles if uncertain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
