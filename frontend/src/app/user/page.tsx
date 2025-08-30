"use client";
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {}

function page({}: Props) {

  const navigate=useRouter();
  const logout=async()=>{


    const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/logout`, {}, {
        withCredentials:true
    });

    if(res.status===200){
        // Dispatch custom event to refresh header
        window.dispatchEvent(new Event('auth-changed'));
        navigate.push("login");
    }

  } 
 
  return (
    <>
     

     <p>
     here will be all the user details 
     </p>
    

    <button onClick={logout}>
        logout
    </button>
    
    </>
  )
}

export default page