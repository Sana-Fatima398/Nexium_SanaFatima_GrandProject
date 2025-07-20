import { CarouselPlugin } from "@/components/ui/carouselPlugin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-rows mx-auto p-12 gap-24">
       
        <div className="ms-14">
          <CarouselPlugin />
          </div>
          <div>
            <h1 className="text-4xl">Generate a recipe using AI</h1>
            <Button className="bg-amber-600">generate</Button>
          </div>
      </div>
      <div>
        <textarea>

        </textarea>
        <div>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </div>
       
        <div>
          <div></div>
          <Button>Discard</Button>
          <Button>Save</Button>
        </div>

      </div>
      <div className="flex flex-col items-center justify-center p-12">
        <h2 className="text-2xl mb-4">Popular Recipes</h2>
        <p className="text-gray-600 mb-8">Explore our collection of popular recipes.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">         
          <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
      </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
      </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center p-12">
        <div><p className="text-5xl">Persoanlise it</p></div>
        <div className="bg-amber-700 text-5xl">Calendar</div>
      </div>

       <div className="flex flex-row items-center justify-center p-12">
        <div><p className="text-5xl">Do like and subscribe</p></div>
        <div className="bg-amber-700 text-5xl">Emojis</div>
      </div>

      <footer className="bg-amber-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Recipe Generator. All rights reserved.</p>    
          </div>  
      </footer>   
    </div>

  );
}
