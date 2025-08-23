"use client";
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

type Props = {}

function page({}: Props) {

    const [data,setdata]=useState({
        name:"",
        email:"",
        password:"",
    });
    const onhandlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setdata({
            ...data,
            [e.target.name]:e.target.value
        })     
    }

    const submitdata=async(e:React.ChangeEvent<HTMLFormElement>)=>{

        e.preventDefault();  
        const resdata= await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signup`,data);
        // console.log(resdata.data);

        toast.success(resdata.data.message);
          toast.success("logged in sucessfully");
    }
  return (
    <>
     <ToastContainer />

     <form onSubmit={submitdata}>
        <label htmlFor="name">
            Username:
            <input type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={onhandlechange} 
              placeholder='enter your name'
              required
              />
        </label>
        <br />
        <label htmlFor="email">
            email:
            <input type="text"
              name="email"
              id="email"
              value={data.email}
              onChange={onhandlechange} 
              placeholder='enter your email'
              required
              />
        </label>
        <br />
        <label htmlFor="password">
            password:
            <input type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={onhandlechange} 
              placeholder='enter your password'
              required
              />
        </label>

        <br />
        <button type='submit'>Sign-up</button>
     </form>

    </>
  )
}

export default page