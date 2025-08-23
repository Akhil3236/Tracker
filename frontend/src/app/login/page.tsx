"use client";

import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';



function page() {

  const [data,setdata]=useState({

    email:"",
    password:""

  })

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      
     setdata({
      ...data,
      [e.target.name]:e.target.value
     });
  }

  /*--------------------------
       login function 
  ----------------------------*/
  const submitdata=async(e:React.ChangeEvent<HTMLFormElement>)=>{

    e.preventDefault();    
    const resdata=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signin`,data);

    if(resdata.data.message){
      
      toast.success(resdata.data.message,{
        autoClose:5000
      });
    }
    // else{
    //   toast(resdata.data.message);
    // }
  }

  return (
    
    <>
     <ToastContainer />
      <br />
      <br />

      <form className="main" onSubmit={submitdata}>

        <label htmlFor="email">
          E-mail:
          <input type="text" 
          placeholder='Enter yout name'
          name='email'
          required
          value={data.email}
          onChange={handleChange}
          className='border p-1.5'
          
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          password:
          <input type="password" 
          placeholder='Enter Password'
          name="password"
          required
          value={data.password}
          onChange={handleChange}
          className='border p-1.5'
          />
        </label>

        <br />
        <button type='submit'>log-in</button>

         <p>
         Create account <Link href="/signup">here</Link>
        </p>
          

      </form>
    </>
  )
}

export default page