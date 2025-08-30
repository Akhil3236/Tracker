"use client";


import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// src/components/Header.tsx
export default function Header() {
  
  const [logged,setlooged]=useState(false);
  const router = useRouter();
  
  useEffect(()=>{
     
    const checkuser=async()=>{
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, {
          withCredentials: true, 
        });
        if(res){
          setlooged(true);
        }
      } catch (err) {
        setlooged(false);
      }
    }
    
    checkuser();
    
    // Listen for auth changes
    const handleStorageChange = () => {
      checkuser();
    };
    
    const handleAuthChange = () => {
      checkuser();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', checkuser);
    window.addEventListener('auth-changed', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', checkuser);
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  },[router])


    return (
      <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
        
        <nav className="header">
          <div className="left">
            <Link href="/dashboard">Logo</Link>
          </div>


          <div className="right">


           
            <Link href="/">Home</Link>
           
            <Link href="/about">about us</Link>
          
            {
              logged ? (
                <>
                  <Link href="/user">user</Link>
                </>
              ) : (
                <>
                <Link href="/login">Login</Link>
                </>
              )
            }
            </div>
        </nav>
      </header>
    );
  }
  