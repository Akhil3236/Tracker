"use client";

import axios from 'axios';
import React, { useState } from 'react'

type Props = {}

function page({}: Props) {

  const[email,setemail]=useState("");
  const[loading,setloading]=useState(false);


  const response={

    to:email
  }

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setemail(e.target.value);
 }

 const sendmail=async(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();

  const sendemail=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/password`,response)
  
  setloading(true);
  console.log(sendemail);
   
  
  alert(`email has been sent to ${email}`)

  // alert(to);  
 }
  return (
    
    <form onSubmit={sendmail}>

      <p>Email :</p>

      <input type="text"
      name='email'
      placeholder='enter your email'
      value={email}
      onChange={handleChange}
      required
      />


      <br />
      <br />

    <button type='submit'>submit</button>
    </form>
  )
}

export default page