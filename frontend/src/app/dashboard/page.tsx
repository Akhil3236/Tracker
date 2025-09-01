"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import useUserstate from "../Store/store.js";

import axios from 'axios';

type Props = {}

function Page({}: Props) {
    const router = useRouter();
    const [userdata,setuserdata]=useState("");
    const [search,setsearch]=useState(""); 
    const [products,setproducts]=useState<any[]>([]);
    const setUser = useUserstate((state) => state.setUser);
    const user = useUserstate((state) => state.user);

    
    
    
    useEffect(() => {

        const pro=async()=>{
          const productsRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product`,
            {
              withCredentials:true
            });
          setproducts(productsRes.data ?? []);
          }
          pro();

        }
          , []);
          
      
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setsearch(e.target.value);
 }
  
 const searchitem=(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      alert(search);
 }
  return (
    <>
    
    <div className="main">

        
        Hi ,  <b> 
            {userdata}</b> Welcome
        <br />

        <div className="serach">
      
          <form onSubmit={searchitem}>

              <input type="text" 
              placeholder='search'
              required
              name="search"
              value={search}
              onChange={handleChange}
              />

              <button type='submit'>search</button>
          </form>
        </div>


        <br />

        <ul>
          {products.map((p: any, idx: number) => (
            <li key={p._id || idx}>{p.name}</li>
          ))}



          {user?(
            <>{user.name}

            <p>user: {user.email}</p>
            </>
          
          ):(<>null</>)}
        </ul>

        
        <br />

        <p>lets add the products here section </p>
        
        <br />
    </div>
     </>
  )
}

export default Page