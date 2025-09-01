"use client";
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useUserstate from "../Store/store.js";


type Props = {}

function page({}: Props) {
  
  const user = useUserstate((state) => state.user);
  const clearUser = useUserstate((state) => state.clearUser);
  const navigate=useRouter();
  const logout=async()=>{


    const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/logout`, {}, {
        withCredentials:true
    });

    if(res.status===200){
        // Dispatch custom event to refresh header
        window.dispatchEvent(new Event('auth-changed'));
        clearUser();
        navigate.push("login");
    }
  } 
  return (
    <>
     

     <p>
     here will be all the user details 
     </p>
    

     {user?(<>
        {user.name}
        <br />
        {user.email}
        <br />
        {user.role}
        <br />
     </>):(<>

     <p>null</p></>)}


    <button onClick={logout}>
        logout
    </button>
    
    </>
  )
}

export default page