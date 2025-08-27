"use client";

import React, { use, useEffect } from 'react'
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import axios from 'axios';

type Props = {}

function page({}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userdata,setuserdata]=useState("");
    const [logged,setlogged]=useState(false);
  
    useEffect(() => {
        const checkAuth = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, {
              withCredentials: true, 
            });
            
            setLoading(true)
            setLoading(false);
            setuserdata(res.data.name);
          } catch (err) {
            console.error("Not authenticated", err);
            router.push("/login"); 
          }
        };
    
        checkAuth();
      });
    
      if (loading) return <p>Loading...</p>;
  return (
    <>
    
    <div className="main">

        
        Hi ,  <b> 
            {userdata}</b> Welcome
        <br />

        <br />

        <p>this for products page where user can see the products
            and if the role is user then 
        </p>

        <p>lets add the products here section </p>
        
        <br />
    </div>
     </>
  )
}

export default page