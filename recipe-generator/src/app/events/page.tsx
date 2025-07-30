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
import { useEventContext } from "../context/EventContext";
import Image from "next/image";


export default function EventsPage() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("10:30:00")
  const [eventName, setEventName] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false); 
  const [addLoading, setAddLoading] = useState(false);

  const { recipes, setRecipes } = useRecipeContext();
  const { events, setEvents } = useEventContext();

  const [selectedRecipes, setSelectedRecipes] = useState([{ _id: "", name: "" }]);

  const {user, login} = useUserContext();

  const [eventLoading, setEventLoading] = useState(true);

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
        fetchRecipes();
    
    const fetchEvents = async () =>{
        if (!user?.email) return;
        setEventLoading(true);
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
            setEvents(data);
        }catch(error)
        {
          console.error("Error fetching events:", error);
        }
        finally{
          setEventLoading(false);
        }
      }
    fetchEvents();

  }, [setRecipes]);


  
    const handleDelete = async(id: string) =>{
        setDeleteLoading(true);
        try {
        const res = await fetch("/api/event/delete", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ eventId: id })
        });

        if (res.status !== 200) alert("Event can not be deleted!");
        else{
            setEvents((prev) => prev.filter((e) => e._id !== id));
        }
        } catch (error) {
        console.error("Error deleting event:", error);
        }
        setDeleteLoading(false);
    
    }

  const handleAddEvent = async () => {
    
    setAddLoading(true);
    try{
 
    if (eventName && date) {
      const res = await axios.post('/api/event/add', {
        email: user?.email,
        name: eventName,
        date: date,
        time: time, 
        recipes: selectedRecipes
      });
      
     if (res.status === 200) {
        
        console.log('Saved event successfully');
        setEventName("")
        setDate(undefined)
        setSelectedRecipes([])
        } else {
        console.log('Failed to event recipe');
      }
    } 
  }
    catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please check the console for details.');
    }
    setAddLoading(false);
  }

const handleRecipeChange = (index: number, recipeId: string) => {
  const recipe = recipes.find((r) => r._id === recipeId);
  if (!recipe) return;
  const updated = [...selectedRecipes];
  updated[index] = { _id: recipe._id, name: recipe.name };
  setSelectedRecipes(updated);
};

const handleAddRecipeField = () => {
  setSelectedRecipes((prev) => [...prev, { _id: "", name: "" }]);
};

const handleRemoveRecipeField = (index: number) => {
  setSelectedRecipes((prev) => prev.filter((_, i) => i !== index));
};



  return (
    <div className="p-5 space-y-10 sm:m-7 ">

      <div className="flex flex-col md:flex-col items-start">
        <h1 className="text-6xl font-bold m-6 font-shadow text-amber-800 tracking-wider">
          Your Events
        </h1>
      </div>
       {!login ? (

      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="w-full p-10 text-3  xl md:text-5xl font-shadow text-center tracking-wider leading-relaxed">
          Sign in to personalize the events according to your schedule
        </div>
        <Image
          src="/event.png"
          alt="Login illustration"
          width={240}
          height={240}
        />
      </div>
    ):(
      <>
      <div className="flex flex-col lg:flex-row gap-16 border rounded-lg md:p-6 sm:p-2 mx-auto shadow-md">



        <div className="flex flex-col gap-6 flex-1 mx-5 my-5 p-4">
    
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
            {selectedRecipes.map((recipe, index) => (
  <div key={index} className="flex flex-row items-center gap-2 w-full">
    <select
      value={recipe._id}
      onChange={(e) => handleRecipeChange(index, e.target.value)}
      className="w-full border p-2 rounded-md"
    >
      <option value="">Select a recipe</option>
      {recipes.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
    {selectedRecipes.length > 1 && (
      <Button type="button" variant="ghost" onClick={() => handleRemoveRecipeField(index)}>
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
          <div className="flex flex-col justify-center items-center">
            {addLoading ? (<div className="progress-bar mt-7"/>):(  
                <Button className="w-1/2 mt-7 bg-amber-600 hover:bg-amber-500" onClick={handleAddEvent}>
              Add Event
              </Button>)}
        
          </div>
        </div>

  <div className="flex-1 w-full flex justify-center items-center">
  <Calendar18 />
</div>

      </div>

    
      <div className="mt-20">
        <div className="w-full mx-auto my-8 p-3 bg-amber-100 rounded-lg">  <h2 className="text-4xl font-semibold m-6 font-shadow text-amber-800">Event List</h2></div>
        {deleteLoading && <div className="progress-bar"></div>}
        {eventLoading ? (
  // Show loading skeleton
 <div className="w-full p-8 space-y-7">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="w-full bg-amber-100 h-28 rounded-xl shadow-md p-4 animate-pulse"
      >
        <div className="h-6 bg-amber-50 rounded w-1/3 mb-2" />
        <div className="h-4 bg-amber-50 rounded w-2/3 mb-1" />
        <div className="h-4 bg-amber-50 rounded w-1/2" />
      </div>
    ))}
  </div>
) : events.length === 0 ? (
  // No events message
  <div className="flex flex-col justify-center items-center gap-5 font-shadow">
    <div className="text-2xl md:text-3xl">Your events will be shown here.</div>
    <Image src="/event.png" alt="event image" width={180} height={180} />
  </div>
) : (
  // Events accordion
  <Accordion type="multiple" className="w-full p-5 space-y-4">
    {events.map((event, idx) => (
      <AccordionItem className="bg-amber-100 p-3 rounded-lg hover:shadow-xl hover:animate-in" key={idx} value={`item-${idx}`}>
        <AccordionTrigger className="font-shadow tracking-wider md:text-3xl text-2xl ps-8 hover:text-amber-800 hover:no-underline">{event.name}</AccordionTrigger>
        <AccordionContent className="p-4 text-md bg-amber-50 rounded-lg">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2 ps-4">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {event.time}
                </p>
                <p>
                  <strong>Recipes:</strong>{" "}
                  {event.recipes.map((r) => r.name).join(", ") || "None"}
                </p>
            </div>
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 md:items-end md:pe-4">
                <Button className="w-1/2 md:w-1/4 bg-amber-600 hover:bg-amber-500"  onClick={()=>{handleDelete(event._id)}}>Delete</Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)}

      </div>
      </>)}
    </div>
  )
}
