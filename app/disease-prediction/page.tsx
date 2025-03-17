import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function DiseasePredictionPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Disease Prediction</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Predict Pet Diseases</CardTitle>
          <CardDescription>Use our AI-powered tool to predict potential diseases based on symptoms</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Early detection of diseases can significantly improve treatment outcomes for your pet. Our disease
            prediction tool uses advanced algorithms to analyze symptoms and provide potential diagnoses.
          </p>
          <p className="mb-6">
            Please note that this tool is meant to assist and not replace professional veterinary care. Always consult
            with a veterinarian for proper diagnosis and treatment.
          </p>

          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" className="w-full h-10">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <span className="text-sm text-muted-foreground">No file selected</span>
                </div>
              </div>

              {/* Text Inputs */}
              <div className="space-y-2">
                <Label htmlFor="ears">Ears</Label>
                <Input id="ears" placeholder="flaky" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paws_and_pads">Paws and Pads</Label>
                <Input id="paws_and_pads" placeholder="red" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eyes">Eyes</Label>
                <Input id="eyes" placeholder="normal" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="underbelly">Underbelly</Label>
                <Input id="underbelly" placeholder="normal" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tail">Tail</Label>
                <Input id="tail" placeholder="irritated" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="armpits">Armpits</Label>
                <Input id="armpits" placeholder="flaky" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nails">Nails</Label>
                <Input id="nails" placeholder="irritated" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skin_folds">Skin Folds</Label>
                <Input id="skin_folds" placeholder="normal" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overall_coat_condition">Overall Coat Condition</Label>
                <Input id="overall_coat_condition" placeholder="flaky" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dermatitis">Dermatitis</Label>
                <Input id="dermatitis" placeholder="flaky" />
              </div>

              {/* Checkboxes for binary fields */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="flea_allergy" defaultChecked />
                  <Label htmlFor="flea_allergy">Flea Allergy</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="ringworm" />
                  <Label htmlFor="ringworm">Ringworm</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="scabies" />
                  <Label htmlFor="scabies">Scabies</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="other_condition" defaultChecked />
                  <Label htmlFor="other_condition">Other Condition</Label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Predict Disease
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results section */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
          <CardDescription>Based on the symptoms provided, here are the potential diagnoses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 text-center text-muted-foreground">Submit the form to see prediction results</div>
        </CardContent>
      </Card>
    </div>
  )
}

