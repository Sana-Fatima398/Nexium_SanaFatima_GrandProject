'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createBrowClient } from '../../../../lib/supabase-browser';

export default function SignUpPage(){

    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');


    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/auth/magic-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.status === 200) {
            setResult("Check your email for the magic link!");
            // Handle successful signup
            console.log('Signup successful');
        } else {
            // Handle error
            console.log('Signup failed');
        }
    }

    const handleLogout = async () =>{
        
        const response = await fetch('/api/auth/signout');
        if(response.status === 200){
            setLogin(false);
            setUser('');
            setResult('');
        }
        else{
            console.error("Sign out failed");
        }
    }
    
    async function fetchUser() {
        const res = await fetch('/api/auth/user');
        if (res.status === 200) {
            const data = await res.json();
            setLogin(true);
            setUser(data.message); // "Hello user@example.com"
        } else {
            setLogin(false);
            setUser('');
        }
    }

    useEffect(() => {
        async function checkMagicLink() {
            const supabase = createBrowClient();
            const url = new URL(window.location.href);
            const code = url.searchParams.get('code');

            if (code) {
                const { error } = await supabase.auth.exchangeCodeForSession(code);
                if (!error) {
                    window.history.replaceState({}, document.title, '/account/signup'); // remove code from URL
                    fetchUser(); // refresh user
                } else {
                    console.error("Session exchange failed:", error.message);
                }
                } else {
                    fetchUser(); // Just fetch user if no code
            }
        }

    checkMagicLink();
}, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            {login ? (<div className='flex flex-col bg-amber-100 rounded-lg w-1/2 my-16 gap-5 p-8'>
                <p>your are alreaady signed in:{user}</p>
                <Button className='mx-auto w-1/2 bg-amber-600 hover:bg-amber-500' onClick={handleLogout}>sign out</Button>
            </div>):(
                <div className='w-1/2 my-16'>
                   <form onSubmit={handleSubmit} className='w-full'>
                <div className='flex flex-col bg-amber-100 rounded-lg w-full mx-auto p-7 gap-7'>
                <></>
                <div className="w-full items-center">
                    <Label htmlFor="email" className='pb-4'>Email</Label>
                    <Input 
                        type="email" 
                        id="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <Button className="bg-amber-600 w-full hover:bg-amber-700" >Sign Up</Button>
                </div>
                </form>
                <div className='mb-16'>
                {result !== '' && (
                    <div>{result}</div>
                )}
                </div>
                </div>
            )}

         
        </div>
    );

}

