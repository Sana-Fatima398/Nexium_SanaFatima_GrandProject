'use client'

import { useEffect } from "react";
import React, { useState } from "react"
import { ChevronDownIcon, PlusCircle, MinusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import axios from 'axios';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Calendar18 from "@/components/calendar-18";
import { useRecipeContext } from "../context/RecipeContext";
import { useUserContext } from "../context/UserContext";
import Image from "next/image";



type Event = {
  email: string;
  name: string;
  date: Date;
  time: string;
  recipes: [{_id:string, name:string}]
  createdAt?: string;
}


export default function EventsPage() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("10:30:00")
  const [eventName, setEventName] = useState("")
  const { recipes, setRecipes } = useRecipeContext();
  const [userEvents, setUserEvent] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event | undefined>(undefined);
  const {user} = useUserContext();

  useEffect(() => {
    
      const fetchRecipes = async () => {
        try {
          const res = await fetch("/api/recipe/read",{
              method: "POST",
                headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: user?.email })  
                });
                if (!res.ok) throw new Error("Failed to fetch recipes");
                const data = await res.json();
                setRecipes(data); 
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } 
        };

   
    

  }, [setRecipes]);

     const fetchEvents = async () =>{
        if (!user?.email) return;
        try{
          const res = await fetch("api/event/read",{
            method:"POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email: user?.email })  
          })
            if (!res.ok) throw new Error("Failed to fetch events");
            const data = await res.json();
            console.log("Fetched events:", data);
            setUserEvent(data);
        }catch(error)
        {
          console.error("Error fetching events:", error);
        }
      }

  const handleAddEvent = async () => {
    try{
 
    if (eventName && date) {
       console.log(user?.email);
       console.log(date);
       console.log(time);
       console.log(recipes)
      const res = await axios.post('/api/event/add', {
        email: user?.email,
        name: eventName,
        date: date,
        time: time, 
        recipes,      
      });
      
     if (res.status === 200) {
        console.log('Saved event successfully');
        setEvents(undefined)
        setEventName("")
        setDate(undefined)
        setRecipes([])
        } else {
        console.log('Failed to event recipe');
      }
    } 
  }
    catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please check the console for details.');
    }
  }

 const handleRecipeChange = (index: number, value: string) => {
  const updated = [...recipes];
  updated[index] = { ...updated[index], name: value }; // update only name
  setRecipes(updated);
};

const handleAddRecipeField = () => {
  setRecipes(prev => [...prev,  {
      _id: "",
      name: "",
      email: "",         // required
      prompt: "",        // required
      ingredients: [],
      instructions: []
    }]); // new empty recipe
};

const handleRemoveRecipeField = (index: number) => {
  if (recipes.length > 1) {
    setRecipes(prev => prev.filter((_, i) => i !== index));
  }
};



  return (
    <div className="p-5 space-y-10 sm:m-7 ">

      <div className="flex flex-col md:flex-col items-start">
        <h1 className="text-5xl font-bold m-6 font-shadow text-amber-800">
          Your Events
        </h1>
      </div>


      <div className="flex flex-col lg:flex-row gap-16 border rounded-lg md:p-6 sm:p-2 mx-auto shadow-md">

        <div className="flex flex-col gap-6 flex-1 mx-auto md:p-4">
    
          <div className="flex flex-col gap-3">
            <Label>Event Name</Label>
            <Input
              placeholder="Dawat"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full"
            />
          </div>

       
          <div className="flex flex-col gap-3">
            <div className="flex flex-row w-full">
                <Label className="w-11/12">Select Recipes</Label>
                <Button
                        type="button"
                        variant="ghost"
                        onClick={() => handleAddRecipeField()}
                        className="w-1/12"
                    >
                        <PlusCircle className="w-5 h-5 text-green-500" />
                </Button>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
            {recipes.map((recipe, index) => (
              <div key={index} className="flex flex-row items-center gap-2 w-full">
                <select
                  value={recipe.name}
                  onChange={(e) =>
                    handleRecipeChange(index, e.target.value)
                  }
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select a recipe</option>
                  {recipes.map((recipe) => (
                    <option key={recipe._id} value={recipe.name}>
                      {recipe.name}
                    </option>
                  ))}
                </select>
               
                {recipes.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleRemoveRecipeField(index)}
                  >
                    <MinusCircle className="w-5 h-5 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
         
            </div>
                
          </div>


          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-between font-normal w-full"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(d) => {
                      setDate(d)
                      setOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label>Time</Label>
              <Input
                type="time"
                value={time}
                step="1"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-fit mt-2" onClick={handleAddEvent}>
            Add Event
          </Button>
        </div>

  <div className="flex-1 w-full flex justify-center items-center">
  <Calendar18 />
</div>

      </div>

      {user?.email !== '' && <div><Button onClick={fetchEvents}></Button></div>}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Added Events</h2>
        {userEvents.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-5 font-shadow"><div className="text-2xl md:4xl">Your events will be shown here.</div><Image src="/event.png" alt="event image" width={180} height={180}/></div>
        ) : (
          <Accordion type="multiple" className="w-full space-y-2">
            {userEvents.map((event, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>
                  {event.name}
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p>
                    <strong>Date:</strong> {event.time}
                  </p>
                  <p>
                    <strong>Recipes:</strong>{" "}
                    {event.recipes.map(r => r.name).join(", ") || "None"}

                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
      
    </div>
  )
}
