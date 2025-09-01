"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserstate from "@/app/Store/store.js";

// src/components/Header.tsx
export default function Header() {

  const router = useRouter();
  const user = useUserstate((state) => state.user);





    return (
      <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
        
        <nav className="header">
          <div className="left">
            <Link href="/dashboard">Logo</Link>
          </div>


          <div className="right">


           
            <Link href="/dashboard">Home</Link>
           
            <Link href="/about">about us</Link>
          
            {
              user ? (
                <>
                  <Link href="/user">user</Link>
                </>
              ) : (
                <>
                <Link href="/login">Login</Link>
                </>
              )
            }
            </div>
        </nav>
      </header>
    );
  }
  