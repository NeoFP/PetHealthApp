"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/notification";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Edit,
  Plus,
  Trash,
  Camera,
  Save,
  Settings,
  History,
} from "lucide-react";

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  image?: string;
  medicalHistory?: {
    date: string;
    event: string;
    notes?: string;
  }[];
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
  }[];
  appointments?: {
    date: string;
    time: string;
    type: string;
    clinic: string;
    notes?: string;
  }[];
}

export default function ProfilePage() {
  const [pets, setPets] = useState<Pet[]>([
    {
      id: "1",
      name: "Buddy",
      type: "dog",
      breed: "Golden Retriever",
      age: "3",
      weight: "28",
      image: "/dog-avatar.png",
      medicalHistory: [
        {
          date: "2023-02-15",
          event: "Annual Checkup",
          notes: "All vitals normal. Due for vaccines next month.",
        },
        {
          date: "2022-08-10",
          event: "Ear Infection",
          notes:
            "Treated with antibiotics for 7 days. Follow-up showed complete recovery.",
        },
      ],
      medications: [
        {
          name: "Heartworm Prevention",
          dosage: "1 tablet",
          frequency: "Monthly",
          startDate: "2022-01-01",
        },
      ],
      appointments: [
        {
          date: "2023-06-15",
          time: "10:30",
          type: "Vaccination",
          clinic: "Happy Paws Veterinary",
        },
      ],
    },
  ]);

  const [activePet, setActivePet] = useState<string>(pets[0]?.id || "");
  const [activeTab, setActiveTab] = useState("info");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addingNew, setAddingNew] = useState(false);

  // Form state for editing
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editBreed, setEditBreed] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editWeight, setEditWeight] = useState("");

  // Form state for new pet
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("dog");
  const [newBreed, setNewBreed] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newWeight, setNewWeight] = useState("");

  // Get the active pet
  const currentPet = pets.find((pet) => pet.id === activePet);

  const handleEditToggle = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      // Set form values from current pet
      if (currentPet) {
        setEditName(currentPet.name);
        setEditType(currentPet.type);
        setEditBreed(currentPet.breed);
        setEditAge(currentPet.age);
        setEditWeight(currentPet.weight);
      }
      setEditMode(true);
    }
  };

  const handleUpdate = () => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setPets(
        pets.map((pet) =>
          pet.id === activePet
            ? {
                ...pet,
                name: editName,
                type: editType,
                breed: editBreed,
                age: editAge,
                weight: editWeight,
              }
            : pet
        )
      );

      setSaving(false);
      setEditMode(false);
      toast.success("Pet information updated successfully");
    }, 1000);
  };

  const handleAddNewPet = () => {
    if (!newName || !newBreed || !newAge || !newWeight) {
      toast.error("Please fill out all required fields");
      return;
    }

    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      const newId = (pets.length + 1).toString();
      const newPet: Pet = {
        id: newId,
        name: newName,
        type: newType,
        breed: newBreed,
        age: newAge,
        weight: newWeight,
        image: newType === "dog" ? "/dog-avatar.png" : "/dog-avatar.png", // Should use cat image for cats
      };

      setPets([...pets, newPet]);
      setActivePet(newId);

      // Reset form
      setNewName("");
      setNewType("dog");
      setNewBreed("");
      setNewAge("");
      setNewWeight("");

      setSaving(false);
      setAddingNew(false);
      toast.success("New pet added successfully!");
    }, 1000);
  };

  const handleDeletePet = (id: string) => {
    if (pets.length === 1) {
      toast.error("You must have at least one pet profile");
      return;
    }

    if (
      confirm(
        "Are you sure you want to delete this pet profile? This action cannot be undone."
      )
    ) {
      const newPets = pets.filter((pet) => pet.id !== id);
      setPets(newPets);
      setActivePet(newPets[0].id);
      toast.success("Pet profile deleted");
    }
  };

  if (addingNew) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Add New Pet
            </h1>
            <p className="text-gray-600">
              Enter your pet's information to create a new profile
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>New Pet Information</CardTitle>
              <CardDescription>
                Please provide details about your pet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-name">Pet Name *</Label>
                  <Input
                    id="new-name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter pet's name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-type">Pet Type *</Label>
                    <Select value={newType} onValueChange={setNewType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="small_mammal">
                          Small Mammal
                        </SelectItem>
                        <SelectItem value="reptile">Reptile</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-breed">Breed *</Label>
                    <Input
                      id="new-breed"
                      value={newBreed}
                      onChange={(e) => setNewBreed(e.target.value)}
                      placeholder="Enter breed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-age">Age (years) *</Label>
                    <Input
                      id="new-age"
                      value={newAge}
                      onChange={(e) => setNewAge(e.target.value)}
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Enter age"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-weight">Weight (kg) *</Label>
                    <Input
                      id="new-weight"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Enter weight"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setAddingNew(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddNewPet}
                disabled={
                  !newName || !newBreed || !newAge || !newWeight || saving
                }
              >
                {saving ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                {saving ? "Adding..." : "Add Pet"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Pet Profiles
          </h1>
          <p className="text-gray-600">
            Manage your pets' information and health records
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => {
                setActivePet(pet.id);
                setEditMode(false);
              }}
              className={`flex flex-col items-center px-4 py-2 rounded-lg min-w-[100px] ${
                pet.id === activePet
                  ? "bg-green-50 border-2 border-green-500"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src={pet.image || "/dog-avatar.png"}
                  alt={pet.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-sm font-medium">{pet.name}</span>
              <span className="text-xs text-gray-500 capitalize">
                {pet.breed}
              </span>
            </button>
          ))}

          <button
            onClick={() => setAddingNew(true)}
            className="flex flex-col items-center px-4 py-2 rounded-lg bg-gray-50 border border-dashed border-gray-300 min-w-[100px]"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-600">Add New</span>
          </button>
        </div>

        {currentPet && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={currentPet.image || "/dog-avatar.png"}
                    alt={currentPet.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentPet.name}</h2>
                  <p className="text-gray-600 capitalize">
                    {currentPet.breed} • {currentPet.age} years •{" "}
                    {currentPet.weight} kg
                  </p>
                </div>
              </div>

              {!editMode && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditToggle}
                    className="flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeletePet(currentPet.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="info">
                  <Settings className="h-4 w-4 mr-2" />
                  Info
                </TabsTrigger>
                <TabsTrigger value="medical">
                  <History className="h-4 w-4 mr-2" />
                  Medical History
                </TabsTrigger>
                <TabsTrigger value="medications">
                  <Pill className="h-4 w-4 mr-2" />
                  Medications
                </TabsTrigger>
                <TabsTrigger value="appointments">
                  <Calendar className="h-4 w-4 mr-2" />
                  Appointments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Pet Information
                      {editMode && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleEditToggle}
                        >
                          Cancel
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {editMode
                        ? "Edit your pet's details below"
                        : "Basic information about your pet"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {editMode ? (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name">Pet Name</Label>
                          <Input
                            id="edit-name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-type">Pet Type</Label>
                            <Select
                              value={editType}
                              onValueChange={setEditType}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dog">Dog</SelectItem>
                                <SelectItem value="cat">Cat</SelectItem>
                                <SelectItem value="bird">Bird</SelectItem>
                                <SelectItem value="small_mammal">
                                  Small Mammal
                                </SelectItem>
                                <SelectItem value="reptile">Reptile</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-breed">Breed</Label>
                            <Input
                              id="edit-breed"
                              value={editBreed}
                              onChange={(e) => setEditBreed(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-age">Age (years)</Label>
                            <Input
                              id="edit-age"
                              value={editAge}
                              onChange={(e) => setEditAge(e.target.value)}
                              type="number"
                              min="0"
                              step="0.1"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-weight">Weight (kg)</Label>
                            <Input
                              id="edit-weight"
                              value={editWeight}
                              onChange={(e) => setEditWeight(e.target.value)}
                              type="number"
                              min="0"
                              step="0.1"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Pet Type
                          </h3>
                          <p className="capitalize">{currentPet.type}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Breed
                          </h3>
                          <p>{currentPet.breed}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Age
                          </h3>
                          <p>{currentPet.age} years</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Weight
                          </h3>
                          <p>{currentPet.weight} kg</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {editMode && (
                    <CardFooter>
                      <Button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="ml-auto bg-green-700 hover:bg-green-800"
                      >
                        {saving ? (
                          <LoadingSpinner size="sm" className="mr-2" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>
                      Record of past medical conditions and treatments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentPet.medicalHistory &&
                    currentPet.medicalHistory.length > 0 ? (
                      <div className="space-y-4">
                        {currentPet.medicalHistory.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                <p className="font-medium">{item.date}</p>
                              </div>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {item.event}
                              </span>
                            </div>
                            {item.notes && (
                              <p className="mt-3 text-sm text-gray-600">
                                {item.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          No medical history recorded yet
                        </p>
                        <Button className="mt-4">Add Medical Record</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Medications</CardTitle>
                    <CardDescription>
                      Current and past medications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentPet.medications &&
                    currentPet.medications.length > 0 ? (
                      <div className="space-y-4">
                        {currentPet.medications.map((medication, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{medication.name}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {medication.dosage}, {medication.frequency}
                                </p>
                              </div>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Active
                              </span>
                            </div>
                            <div className="mt-3 text-sm">
                              <div className="flex items-center text-gray-500">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>Started: {medication.startDate}</span>
                              </div>
                              {medication.endDate && (
                                <div className="flex items-center text-gray-500 mt-1">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>Ends: {medication.endDate}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          No medications recorded yet
                        </p>
                        <Button className="mt-4">Add Medication</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>
                      Scheduled veterinary visits and checkups
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentPet.appointments &&
                    currentPet.appointments.length > 0 ? (
                      <div className="space-y-4">
                        {currentPet.appointments.map((appointment, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  {appointment.type}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {appointment.clinic}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center text-gray-800 mb-1">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center text-gray-800">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                            </div>
                            {appointment.notes && (
                              <p className="mt-3 text-sm text-gray-600">
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          No appointments scheduled
                        </p>
                        <Button className="mt-4">Schedule Appointment</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
