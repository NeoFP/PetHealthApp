import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PawPrint } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center space-y-6 text-center py-10">
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
          <PawPrint className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Pet Health Companion</h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Your all-in-one solution for monitoring and improving your pet's health
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Disease Prediction</CardTitle>
            <CardDescription>Predict potential diseases based on symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Early detection of diseases can lead to better treatment outcomes for your pet.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/disease-prediction">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dog Nutrition</CardTitle>
            <CardDescription>Personalized nutrition plans for your dog</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Proper nutrition is essential for your dog's overall health and wellbeing.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dog-nutrition">Explore Nutrition</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat with Vet</CardTitle>
            <CardDescription>Connect with veterinary professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get expert advice and answers to your pet health questions from qualified vets.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/chat-with-vet">Start Chat</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

