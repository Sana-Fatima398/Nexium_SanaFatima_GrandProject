'use client';
import React from 'react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "flag-icons/css/flag-icons.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SignUpPage(){

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/auth/magic-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, country }),
        });

        if (response.status === 200) {
            // Handle successful signup
            console.log('Signup successful');
        } else {
            // Handle error
            console.error('Signup failed');
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-8'>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        type="email" 
                        id="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor='country'>Select your Country</Label>
                    <Select value={country} onValueChange={(value) => setCountry(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                                <SelectItem value="pakistan"><span className="fi fi-pk" style={{ marginRight: "8px" }}></span>Pakistan</SelectItem>
                                <SelectItem value="usa"><span className="fi fi-us" style={{ marginRight: "8px" }}></span>United States</SelectItem>
                                <SelectItem value="canada"><span className="fi fi-ca" style={{ marginRight: "8px" }}></span>Canada</SelectItem>
                                <SelectItem value="uk"><span className="fi fi-uk" style={{ marginRight: "8px" }}></span>United Kingdom</SelectItem>
                                <SelectItem value="australia"><span className="fi fi-au" style={{ marginRight: "8px" }}></span>Australia</SelectItem>
                                <SelectItem value="germany"><span className="fi fi-de" style={{ marginRight: "8px" }}></span>Germany</SelectItem>
                                <SelectItem value="france"><span className="fi fi-fr" style={{ marginRight: "8px" }}></span>France</SelectItem>
                                <SelectItem value="japan"><span className="fi fi-jp" style={{ marginRight: "8px" }}></span>Japan</SelectItem>
                                <SelectItem value="brazil"><span className="fi fi-br" style={{ marginRight: "8px" }}></span>Brazil</SelectItem>
                                <SelectItem value="india"><span className="fi fi-in" style={{ marginRight: "8px" }}></span>India</SelectItem>
                                <SelectItem value="china"><span className="fi fi-cn" style={{ marginRight: "8px" }}></span>China</SelectItem>
                            </SelectContent>
                    </Select>
                </div>

                <Button className="bg-amber-600" >Sign Up</Button>
                </form>
        </div>
    );

}

