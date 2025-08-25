"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

type Props = {}

function page({}: Props) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userdata,setuserdata]=useState({});
  
    useEffect(() => {
        const checkAuth = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, {
              withCredentials: true, 
            });
            
            setLoading(false);
            setuserdata(res.data);
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

        
        DashBoard 

        <br />
       <button>Authroized</button>
    </div>
     </>
  )
}

export default page