
import Calendar18 from "@/components/calendar-18";

export default function Events(){
    return (
        <div>
            <div className="flex flex-row w-full h-1/2 p-10">
                <div className="w-1/2 m-20">
                    <h1 className="text-7xl">Your Events</h1>
                </div>
                <div className="w-1/2">
                    <Calendar18 />
                </div>
                    
            </div>

            <div className="w-full h-1/2 p-10">
                <h1 className="m-3">Your Events are here</h1>
                <div className="flex flex-col gap-4">
                    <div className="h-16 bg-amber-200 rounded-md"></div>
                    <div className="h-16 bg-amber-200 rounded-md"></div>
                    <div className="h-16 bg-amber-200 rounded-md"></div>
                    <div className="h-16 bg-amber-200 rounded-md"></div>
                    <div className="h-16 bg-amber-200 rounded-md"></div>
                    <div className="h-16 bg-amber-200 rounded-md"></div>
                </div>
            </div>
        </div>
      
    );
}