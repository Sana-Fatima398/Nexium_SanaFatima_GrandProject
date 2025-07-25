"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export default function Calendar18() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-sm scale-[0.85] sm:scale-100 transition-transform duration-200">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border w-full"
          buttonVariant="ghost"
        />
      </div>
    </div>
  )
}
