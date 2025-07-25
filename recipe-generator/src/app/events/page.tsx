'use client'

import React, { useState } from "react"
import { ChevronDownIcon, PlusCircle, MinusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import Calendar18 from "@/components/calendar-18"

const recipeOptions = ["Biryani", "Cake", "Tacos", "Sushi", "Korma"]

export default function EventsPage() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("10:30:00")
  const [eventName, setEventName] = useState("")
  const [recipes, setRecipes] = useState<string[]>([""])
  const [events, setEvents] = useState<
    { name: string; date: Date; time: string; recipes: string[] }[]
  >([])

  const handleAddEvent = () => {
    if (eventName && date && recipes.some(r => r)) {
      setEvents(prev => [
        { name: eventName, date, time, recipes: recipes.filter(r => r) },
        ...prev,
      ])
      setEventName("")
      setDate(undefined)
      setRecipes([""])
    }
  }

  const handleRecipeChange = (index: number, value: string) => {
    const updated = [...recipes]
    updated[index] = value
    setRecipes(updated)
  }

  const handleAddRecipeField = () => {
    setRecipes(prev => [...prev, ""])
  }

  const handleRemoveRecipeField = (index: number) => {
    if (recipes.length > 1) {
      setRecipes(prev => prev.filter((_, i) => i !== index))
    }
  }

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
                  value={recipe}
                  onChange={(e) =>
                    handleRecipeChange(index, e.target.value)
                  }
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select a recipe</option>
                  {recipeOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
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

    
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Added Events</h2>
        {events.length === 0 ? (
          <p className="text-muted-foreground">No events yet.</p>
        ) : (
          <Accordion type="multiple" className="w-full space-y-2">
            {events.map((event, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>
                  {event.name} — {event.date.toLocaleDateString()}
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p>
                    <strong>Date:</strong> {event.date.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Recipes:</strong>{" "}
                    {event.recipes.join(", ") || "None"}
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
