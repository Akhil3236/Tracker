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
        
        try {
            const resdata= await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signup`,data);
            console.log('Signup Response status:', resdata.status);
            console.log('Signup Response data:', resdata.data);

            toast.success(resdata.data.message);
            toast.success("logged in sucessfully");
        } catch (error: any) {
            console.log('Signup Error caught:', error);
            console.log('Signup Error response:', error.response);
            console.log('Signup Error status:', error.response?.status);
            console.log('Signup Error data:', error.response?.data);
            
            // Handle different types of errors
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || 'Signup failed';
                toast.error(errorMessage);
            } else if (error.request) {
                // Network error
                toast.error('Network error. Please check your connection.');
            } else {
                // Other errors
                toast.error('Something went wrong. Please try again.');
            }
            console.error('Signup error:', error);
        }
    }
  return (
    <>
     <ToastContainer 
       position="top-right"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
     />

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