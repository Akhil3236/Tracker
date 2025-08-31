"use client";

import React, { use } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { auth, googleprovider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";



// Force Google to show account selection
googleprovider.setCustomParameters({
  prompt: "select_account"
});



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
  email  login services 
  ----------------------------*/
  const login=async()=>{

    const sendmail=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/welcome`,{
      to: data.email
    });

    alert("Email has been sent")
    
  }
  /*--------------------------
       login function 
  ----------------------------*/
  const submitdata=async(e:React.ChangeEvent<HTMLFormElement>)=>{

    e.preventDefault();    
    
    try {
      const resdata=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signin`,data,{withCredentials:true,});

      console.log('Response status:', resdata.status);
      console.log('Response data:', resdata.data);
      
      if(resdata.status===200){
        
        toast.success(resdata.data.message,{
          autoClose:5000
        });
        login();
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
  /*--------------------------
       login with google 
  ----------------------------*/

  const google=async()=>{

    try {
        
      const result=await signInWithPopup(auth,googleprovider);
      const userdetails=result.user;


      const token = await userdetails.getIdToken();  
      const google_res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/google`,
        {token,},
        { withCredentials: true }
      );

      if(google_res.status===200){
        login();
        router.push("/dashboard");
        
      }
      // else{
      //   toast(google_res.data);
      // }
    
    } catch (error: any) {
      console.log("error :: ->  ",error); 
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

        <p>
        <Link href="/password">forgot password ?</Link>
          </p>  
        </label>

        <br />
        <button type='submit'>log-in</button>
        
        <br />
        <br />

        {/* added the auth */}

      </form>

         <p>
         Create account <Link href="/signup">here</Link>
        </p>          
        <button onClick={google}>sign in with google</button>
    </>
  )
}

export default page