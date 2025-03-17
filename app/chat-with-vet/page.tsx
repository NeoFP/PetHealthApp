import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ChatWithVetPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Chat with Vet</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Veterinary Consultation</CardTitle>
          <CardDescription>Connect with qualified veterinarians for expert advice</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Get professional advice from licensed veterinarians without leaving your home. Our chat service connects you
            with experts who can answer your questions, provide guidance, and help you determine if an in-person visit
            is necessary.
          </p>
          <p>
            While online consultations can't replace physical examinations for serious conditions, they're perfect for
            general questions, minor concerns, and follow-up care.
          </p>
        </CardContent>
      </Card>

      {/* Simple chat UI placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Chat Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] mb-4 p-4 border rounded-md bg-muted overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <div className="bg-primary/10 p-3 rounded-lg self-start max-w-[80%]">
                <p className="text-sm font-medium">Vet Assistant</p>
                <p>Hello! How can I help you and your pet today?</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Type your message..." className="flex-1" />
            <Button>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

