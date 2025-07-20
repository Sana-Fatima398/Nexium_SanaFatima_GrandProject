import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddRecipe() {

    return (
        <div>
            <form>
                <div>
                    <Label>Name</Label>
                    <Input/>
                </div>
                <div>
                    <Label>Indegridents</Label>
                </div>
                <div>
                    <Label>Instuctions</Label>
                </div>
                <div>
                     <Label>Prep Time</Label>
                </div>
                 <div>
                     <Label>Serving Size</Label>
                </div>
                <div>
                    <Label>Image URL</Label>
                    <Input/>
                    </div>
                <div>
                    <Label>Makeit Public</Label>
                </div>
                <Button>Submit</Button>
            </form>
        </div>
    );
}