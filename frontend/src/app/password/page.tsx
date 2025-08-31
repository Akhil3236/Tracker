"use client";

import axios from 'axios';
import React, { useState } from 'react'

type Props = {}

function page({}: Props) {

  const[email,setemail]=useState("");
  const [otp,setotp]=useState("");

  const response={

    to:email
  }

  const verify={

    to:email,
    otp:otp
  }
  
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setemail(e.target.value);
 }
  const handleChangeotp=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setotp(e.target.value);
 }
const sendmail=async(response: {to: string})=>{

  const sendemail=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/password`,response)

  console.log(sendemail);
   
  
  alert(`email has been sent to ${email}`)

  // alert(to);  
 }

 const handleSubmit=async()=>{
  const sendemail=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/otp`,verify)
  
  if(sendemail.status===200){
     
    sendmail(response);
    
  }
 }

 const sendotp=async()=>{

     const sendotp=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/reset`,response)

     alert("otp has been sented to you email");
     
 }
  return (
    
    <>
    
    <form>
      <input type="text"
      name='email'
      placeholder='enter your email'
      value={email}
      onChange={handleChange}
      required
      />


      <br />

      <input type="text"
      name='otp'
      placeholder='enter otp'
      value={otp}
      onChange={handleChangeotp}
      required />

      <br />
      
      <button onClick={handleSubmit}>submit</button>

    </form>
      <button onClick={sendotp} >request OTP</button>
    </>

  )
}

export default page