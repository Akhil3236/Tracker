"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

import axios from 'axios';

type Props = {}

function Page({}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userdata,setuserdata]=useState("");
    const [search,setsearch]=useState(""); 
    const [products,setproducts]=useState<any>(null);
    
    
    useEffect(() => {
        const checkAuth = async () => {
          try {
            setLoading(true);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, {
              withCredentials: true, 
            });
            setuserdata(res.data.name);
            setLoading(false);
          } catch (err) {
            console.error("Not authenticated", err);
            setLoading(false);
            router.push("/login"); 
          }
        };

        const pro=async()=>{
          const productsRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product`,
            {
              withCredentials:true
            });
          setproducts(productsRes.data);
          }
          checkAuth();
          pro();

        }
          , []);
            
    
      if (loading) return <p>Loading...</p>;




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

        <pre>
          {products !== null ? products.name : null}
          
        </pre>
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

export default Page