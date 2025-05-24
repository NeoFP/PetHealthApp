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
  Heart,
  Activity,
  Phone,
  ImageIcon,
  TrendingUp,
  Shield,
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

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
      <div className="min-h-screen w-full bg-white">
        <div className="flex justify-center items-center min-h-screen p-8 w-full">
          <div className="w-full max-w-5xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-green-800 mb-4">
                Add New Pet
              </h1>
              <p className="text-lg text-gray-600">
                Enter your pet's information to create a new profile
              </p>
            </div>

            <Card className="bg-white border-2">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">New Pet Information</CardTitle>
                <CardDescription className="text-base">
                  Please provide details about your pet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="new-name" className="text-base font-medium">
                      Pet Name *
                    </Label>
                    <Input
                      id="new-name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter pet's name"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="new-type"
                        className="text-base font-medium"
                      >
                        Pet Type *
                      </Label>
                      <Select value={newType} onValueChange={setNewType}>
                        <SelectTrigger className="h-12">
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

                    <div className="space-y-3">
                      <Label
                        htmlFor="new-breed"
                        className="text-base font-medium"
                      >
                        Breed *
                      </Label>
                      <Input
                        id="new-breed"
                        value={newBreed}
                        onChange={(e) => setNewBreed(e.target.value)}
                        placeholder="Enter breed"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="new-age"
                        className="text-base font-medium"
                      >
                        Age (years) *
                      </Label>
                      <Input
                        id="new-age"
                        value={newAge}
                        onChange={(e) => setNewAge(e.target.value)}
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="Enter age"
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="new-weight"
                        className="text-base font-medium"
                      >
                        Weight (kg) *
                      </Label>
                      <Input
                        id="new-weight"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="Enter weight"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-8">
                <Button
                  variant="outline"
                  onClick={() => setAddingNew(false)}
                  className="h-12 px-6 text-base"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddNewPet}
                  disabled={
                    !newName || !newBreed || !newAge || !newWeight || saving
                  }
                  className="bg-green-700 hover:bg-green-800 h-12 px-6 text-base font-medium"
                >
                  {saving ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : null}
                  {saving ? "Adding..." : "Add Pet"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-white">
        <div className="flex justify-center items-start min-h-screen p-8 w-full">
          <div className="w-full max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-green-800 mb-4">
                Pet Profiles
              </h1>
              <p className="text-lg text-gray-600">
                Manage your pets' information and health records
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
              {pets.map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => {
                    setActivePet(pet.id);
                    setEditMode(false);
                  }}
                  className={`flex flex-col items-center px-6 py-4 rounded-lg min-w-[120px] ${
                    pet.id === activePet
                      ? "bg-green-50 border-2 border-green-500"
                      : "bg-white border-2 border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="relative w-16 h-16 mb-3">
                    <Image
                      src={pet.image || "/dog-avatar.png"}
                      alt={pet.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="text-base font-medium">{pet.name}</span>
                  <span className="text-sm text-gray-500 capitalize">
                    {pet.breed}
                  </span>
                </button>
              ))}

              <button
                onClick={() => setAddingNew(true)}
                className="flex flex-col items-center px-6 py-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 hover:border-green-400 min-w-[120px]"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <span className="text-base font-medium text-gray-600">
                  Add New
                </span>
              </button>
            </div>

            {currentPet && (
              <>
                <div className="flex justify-between items-center mb-8 p-6 bg-white border-2 rounded-lg">
                  <div className="flex items-center gap-6">
                    <div className="relative w-20 h-20">
                      <Image
                        src={currentPet.image || "/dog-avatar.png"}
                        alt={currentPet.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{currentPet.name}</h2>
                      <p className="text-lg text-gray-600 capitalize">
                        {currentPet.breed} • {currentPet.age} years •{" "}
                        {currentPet.weight} kg
                      </p>
                    </div>
                  </div>

                  {!editMode && (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="default"
                        onClick={handleEditToggle}
                        className="flex items-center h-10 px-4"
                      >
                        <Edit className="h-5 w-5 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="default"
                        className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 h-10 px-4"
                        onClick={() => handleDeletePet(currentPet.id)}
                      >
                        <Trash className="h-5 w-5 mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-7 mb-8 h-12">
                    <TabsTrigger value="info" className="text-base">
                      <Settings className="h-5 w-5 mr-2" />
                      Info
                    </TabsTrigger>
                    <TabsTrigger value="health" className="text-base">
                      <Heart className="h-5 w-5 mr-2" />
                      Health
                    </TabsTrigger>
                    <TabsTrigger value="medical" className="text-base">
                      <History className="h-5 w-5 mr-2" />
                      Medical
                    </TabsTrigger>
                    <TabsTrigger value="medications" className="text-base">
                      <Shield className="h-5 w-5 mr-2" />
                      Medications
                    </TabsTrigger>
                    <TabsTrigger value="appointments" className="text-base">
                      <Calendar className="h-5 w-5 mr-2" />
                      Appointments
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="text-base">
                      <ImageIcon className="h-5 w-5 mr-2" />
                      Gallery
                    </TabsTrigger>
                    <TabsTrigger value="emergency" className="text-base">
                      <Phone className="h-5 w-5 mr-2" />
                      Emergency
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
                                    <SelectItem value="reptile">
                                      Reptile
                                    </SelectItem>
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
                                  onChange={(e) =>
                                    setEditWeight(e.target.value)
                                  }
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

                  <TabsContent value="health" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Health Metrics */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2" />
                            Health Metrics
                          </CardTitle>
                          <CardDescription>
                            Key health indicators over time
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <p className="text-2xl font-bold text-green-700">
                                98%
                              </p>
                              <p className="text-sm text-green-600">
                                Health Score
                              </p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <p className="text-2xl font-bold text-blue-700">
                                28.5kg
                              </p>
                              <p className="text-sm text-blue-600">
                                Current Weight
                              </p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <p className="text-2xl font-bold text-purple-700">
                                85
                              </p>
                              <p className="text-sm text-purple-600">
                                Heart Rate
                              </p>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                              <p className="text-2xl font-bold text-orange-700">
                                38.2°C
                              </p>
                              <p className="text-sm text-orange-600">
                                Temperature
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Activity Summary */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Activity className="h-5 w-5 mr-2" />
                            Activity Summary
                          </CardTitle>
                          <CardDescription>
                            Daily activity and exercise tracking
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Daily Walks
                              </span>
                              <span className="text-sm">2 completed</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: "80%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Play Time
                              </span>
                              <span className="text-sm">45 minutes</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: "60%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Rest Quality
                              </span>
                              <span className="text-sm">Excellent</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Nutrition Summary */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Weekly Nutrition Summary</CardTitle>
                          <CardDescription>
                            Feeding schedule and nutritional intake
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                              <p className="text-lg font-semibold">2.5 cups</p>
                              <p className="text-sm text-gray-600">
                                Daily Food
                              </p>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <p className="text-lg font-semibold">450ml</p>
                              <p className="text-sm text-gray-600">
                                Water Intake
                              </p>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <p className="text-lg font-semibold">3 treats</p>
                              <p className="text-sm text-gray-600">
                                Daily Treats
                              </p>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <p className="text-lg font-semibold">2,100 cal</p>
                              <p className="text-sm text-gray-600">
                                Daily Calories
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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
                              <div
                                key={index}
                                className="border rounded-lg p-4"
                              >
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
                              <div
                                key={index}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">
                                      {medication.name}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {medication.dosage},{" "}
                                      {medication.frequency}
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
                            {currentPet.appointments.map(
                              (appointment, index) => (
                                <div
                                  key={index}
                                  className="border rounded-lg p-4"
                                >
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
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">
                              No appointments scheduled
                            </p>
                            <Button className="mt-4">
                              Schedule Appointment
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="gallery" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Camera className="h-5 w-5 mr-2" />
                            Photo Gallery
                          </div>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Photo
                          </Button>
                        </CardTitle>
                        <CardDescription>
                          Capture and store your pet's memorable moments
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {/* Sample photos */}
                          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src="/dog-avatar.png"
                              alt="Pet photo"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                              Today
                            </div>
                          </div>
                          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src="/dog-avatar.png"
                              alt="Pet photo"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                              Yesterday
                            </div>
                          </div>
                          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src="/dog-avatar.png"
                              alt="Pet photo"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                              Last week
                            </div>
                          </div>
                          {/* Add photo placeholder */}
                          <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors">
                            <div className="text-center">
                              <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Add Photo</p>
                            </div>
                          </div>
                        </div>

                        {/* Photo categories */}
                        <div className="mt-6 pt-6 border-t">
                          <h3 className="text-lg font-medium mb-4">
                            Photo Categories
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              All Photos (12)
                            </Button>
                            <Button variant="outline" size="sm">
                              Vet Visits (3)
                            </Button>
                            <Button variant="outline" size="sm">
                              Playtime (5)
                            </Button>
                            <Button variant="outline" size="sm">
                              Grooming (2)
                            </Button>
                            <Button variant="outline" size="sm">
                              Milestones (2)
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="emergency" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Emergency Contacts */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 mr-2" />
                              Emergency Contacts
                            </div>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Contact
                            </Button>
                          </CardTitle>
                          <CardDescription>
                            Important contacts for emergencies
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  Primary Veterinarian
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  Happy Paws Veterinary Clinic
                                </p>
                                <p className="text-sm text-gray-600">
                                  Dr. Sarah Johnson
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-green-700">
                                  +1 (555) 123-4567
                                </p>
                                <p className="text-sm text-gray-600">
                                  24/7 Emergency
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  Emergency Animal Hospital
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  City Emergency Vet
                                </p>
                                <p className="text-sm text-gray-600">
                                  24 Hour Emergency Care
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-red-700">
                                  +1 (555) 999-8888
                                </p>
                                <p className="text-sm text-gray-600">
                                  Always Open
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  Pet Poison Control
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  ASPCA Poison Control
                                </p>
                                <p className="text-sm text-gray-600">
                                  24/7 Hotline
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-orange-700">
                                  +1 (888) 426-4435
                                </p>
                                <p className="text-sm text-gray-600">
                                  $95 consultation fee
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Emergency Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Emergency Information</CardTitle>
                          <CardDescription>
                            Quick reference for emergency situations
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h3 className="font-medium text-red-700 mb-2">
                              ⚠️ Signs of Emergency
                            </h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                              <li>• Difficulty breathing or choking</li>
                              <li>• Severe bleeding or trauma</li>
                              <li>• Loss of consciousness</li>
                              <li>• Seizures or convulsions</li>
                              <li>• Suspected poisoning</li>
                              <li>• Inability to urinate</li>
                              <li>• Severe vomiting or diarrhea</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-medium text-green-700 mb-2">
                              📋 Important Info to Have Ready
                            </h3>
                            <div className="text-sm space-y-2">
                              <div className="flex justify-between">
                                <span>Pet Name:</span>
                                <span className="font-medium">
                                  {currentPet.name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Breed:</span>
                                <span className="font-medium">
                                  {currentPet.breed}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Age:</span>
                                <span className="font-medium">
                                  {currentPet.age} years
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Weight:</span>
                                <span className="font-medium">
                                  {currentPet.weight} kg
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Microchip ID:</span>
                                <span className="font-medium">
                                  982-123-456-789
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-800">
                              <strong>Tip:</strong> Keep this information easily
                              accessible on your phone for quick reference
                              during emergencies.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
