"use client";

import React, { use } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

function page() {
  const router=useRouter();

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
    
    try {
      const resdata=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signin`,data);

      console.log('Response status:', resdata.status);
      console.log('Response data:', resdata.data);
      
      if(resdata.status===200){
        
        toast.success(resdata.data.message,{
          autoClose:5000
        });
        router.push("/dashboard")
      }
      if(resdata.status===202){
        toast(resdata.data.message);
      }
    } catch (error: any) {
      console.log('Error caught:', error);
      console.log('Error response:', error.response);
      console.log('Error status:', error.response?.status);
      console.log('Error data:', error.response?.data);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 'Login failed';
        toast.error(errorMessage);
      } else if (error.request) {
        // Network error
        toast.error('Network error. Please check your connection.');
      } else {
        // Other errors
        toast.error('Something went wrong. Please try again.');
      }
      console.error('Login error:', error);
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