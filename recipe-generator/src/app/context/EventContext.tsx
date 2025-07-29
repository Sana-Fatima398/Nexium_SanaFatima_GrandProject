'use client';

import { createContext, useContext, useState, ReactNode } from "react";
type Event = {
  _id: string;
  email: string;
  name: string;
  date: Date;
  time: string;
  recipes: [{_id:string, name:string}]
  createdAt?: string;
};  

type EventContextType = {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
};
const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({children}: { children: ReactNode })=>{
    const [events, setEvents] = useState<Event[]>([]);

    return (
        <EventContext.Provider value={{events, setEvents}}>
            {children}
        </EventContext.Provider>
    );

};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};