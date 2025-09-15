"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useUserstate from "@/app/Store/store";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Header.css";

const Header: React.FC = () => {
  const user = useUserstate((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check localStorage on client
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [user]); // runs again if Zustand updates user

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4 shadow-sm">
      <Link className="navbar-brand fw-bold fs-4" href="/">
        FitFuel
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/shop">
              Shop
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" href="/categories/whey-protein">
                  Whey Protein
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  href="/categories/creatine-monohydrate"
                >
                  Creatine Monohydrate
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  href="/categories/peanut-butter"
                >
                  Peanut Butter
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/categories/oats-museli">
                  Oats & Muesli
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/about">
              About
            </Link>
          </li>
        </ul>

        <div className="d-flex align-items-center gap-3">
          <Link href="/search" className="nav-link p-0">
            <Image
              src="/assets/search.png"
              alt="Search"
              className="nav-icon"
              width={24}
              height={24}
            />
          </Link>
          <Link href="/cart" className="nav-link position-relative p-0">
            <Image
              src="/assets/trolley.png"
              alt="Cart"
              className="nav-icon"
              width={24}
              height={24}
            />
          </Link>

          {isLoggedIn ? (
            <Link href="/user" className="nav-link p-0">
              <Image
                src="/assets/user.png"
                alt="User"
                className="nav-icon"
                width={24}
                height={24}
              />
            </Link>
          ) : (
            <Link href="/login" className="nav-link p-0">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;



// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import useUserstate from "@/app/Store/store";

// // src/components/Header.tsx
// export default function Header() {

//   const router = useRouter();
//   const user = useUserstate((state) => state.user);

//     return (
//       <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
        
//         <nav className="header">
//           <div className="left">
//             <Link href="/dashboard">Logo</Link>
//           </div>


//           <div className="right">

//             <Link href="/dashboard">Home</Link>
//             <Link href="/cart">Cart</Link>
//             {
//               user ? (
//                 <>
//                   <Link href="/user">user</Link>
//                 </>
//               ) : (
//                 <>
//                 <Link href="/login">Login</Link>
//                 </>
//               )
//             }
//             </div>
//         </nav>
//       </header>
//     );
//   }
  