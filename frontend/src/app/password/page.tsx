"use client";

import axios from 'axios';
import React, { useState } from 'react'
import {useRouter} from 'next/navigation';

type Props = {}

function page({}: Props) {

  const[email,setemail]=useState("");
  const [otp,setotp]=useState("");
  const [password1,setpassword1]=useState("");
  const [password2,setpassword2]=useState("");
  const router=useRouter();

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
  const handleChangepassword1=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setpassword1(e.target.value);
 }
  const handleChangeotpassword2=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setpassword2(e.target.value);
 }
const sendmail=async(response: {to: string})=>{

  const sendemail=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/password`,response)

  console.log(sendemail);
   
  
  alert(`email has been sent to ${email}`)

  // alert(to);  
 }

 const handleSubmit=async()=>{
   
   router.push("/");
   if(password1==password2){
     const sendemail=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/otp`,verify)
     
     if(sendemail.status===200){  
      sendmail(response);

    }
  else{
    alert("Password Doesn't Mactched")
  }
  }
 }

 const sendotp=async()=>{

     const sendotp=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/reset`,response)

     alert("otp has been sent to your email");
     
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

      <br />
      <input type="password" 
      name="password1" 
      id="password" 
      placeholder='enter your password'
      value={password1}
      onChange={handleChangepassword1} 
      
      required />

      <br />
      <input type="password" 
      name="password2" 
      id="password" 
      placeholder='conform your password'
      value={password2}
      onChange={handleChangeotpassword2} 
      required />
      
      <button onClick={handleSubmit}>submit</button>

    </form>
      <button onClick={sendotp} >request OTP</button>
    </>

  )
}

export default page