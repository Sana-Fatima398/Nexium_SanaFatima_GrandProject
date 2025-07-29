'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserContext } from '../../context/UserContext';
import CookingAnimation from '@/components/ui/cookingAnimation';
import SignOutAnimation from '@/components/ui/signOutAnimation';
import { set } from 'mongoose';

export default function SignUpPage(){

    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const { user,setUser, login, setLogin } = useUserContext();
    

    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('/api/auth/magic-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.status === 200) {
            setResult("Check your email inbox for the link!");
          
            console.log('Signup successful');
            setLoading(false);
        } else {
        
            console.log('Signup failed');
        }
    }

    const handleLogout = async () =>{
        
        const response = await fetch('/api/auth/signout');
        if(response.status === 200){
            setLogin(false);
            setUser(undefined);
            setResult('');
        }
        else{
            console.error("Sign out failed");
        }
    }
    

    return (
        <div className='flex flex-col items-center justify-center'>
            {login ? (
                <div className='flex flex-col my-10 shadow-2xl md:flex-row w-full md:w-3/4 p-4'>
                     <div className='w-full md:w-1/2'><SignOutAnimation /></div>
                    <div className='flex flex-col bg-amber-100 rounded-lg w-full md:w-1/2 md:m-4 p-7 gap-7'>
                        
                        <div  className='font-shadow text-2xl md:text-4xl p-3 leading-relaxed'>You are signed in as: {user?.email}</div>

                        <Button className='mx-auto w-1/2 bg-amber-600 hover:bg-amber-500' onClick={handleLogout}>sign out</Button>
                    </div>
                    
                   
                   
                </div>
                
                ):(
                <div className='flex flex-col my-10 shadow-2xl md:flex-row w-full md:w-3/4 p-4'>
                 <div className='w-full md:w-1/2'><CookingAnimation /></div>
                <div className='flex flex-col bg-amber-100 rounded-lg w-full md:w-1/2 md:m-4 p-7 gap-7'>
                 {result ? (
                        <div className='font-shadow text-2xl md:text-5xl p-5 leading-relaxed'>{result}</div>
                        ) : (
                        <form onSubmit={handleSubmit} className=''>
                            <div className="w-full items-center">
                            <Label htmlFor="email" className='flex flex-col font-shadow text-2xl md:text-4xl p-3'>
                                <div>Email</div>
                                <div className='text-lg md:text-2xl'>Sign Up by Email only</div>
                            </Label>
                            <Input 
                                type="email" 
                                id="email" 
                                placeholder="abc@gmail.com" 
                                value={email} 
                                className='mt-7'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                {!loading ? (
                            <Button className="bg-amber-600 w-2/6 hover:bg-amber-500 my-4">Sign Up</Button>    
                                ):(<div className='progress-bar  my-4'></div>)}
                            </div> 

                        </form>
                        )}

                </div>
                
              
                </div>
            )}

         
        </div>
    );

}

