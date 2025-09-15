"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useUserstate from "@/app/Store/store";

const Header: React.FC = () => {
  const user = useUserstate((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);



  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-blue-600 hover:text-blue-700">
            FitFuel
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition px-3 py-2 rounded">
              Home
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition px-3 py-2 rounded">
              Shop
            </Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition px-3 py-2 rounded flex items-center gap-1">
                Categories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
                <li>
                  <Link href="/categories/whey-protein" className="block px-4 py-2 hover:bg-gray-100">
                    Whey Protein
                  </Link>
                </li>
                <li>
                  <Link href="/categories/creatine-monohydrate" className="block px-4 py-2 hover:bg-gray-100">
                    Creatine Monohydrate
                  </Link>
                </li>
                <li>
                  <hr className="border-gray-300" />
                </li>
                <li>
                  <Link href="/categories/peanut-butter" className="block px-4 py-2 hover:bg-gray-100">
                    Peanut Butter
                  </Link>
                </li>
                <li>
                  <Link href="/categories/oats-museli" className="block px-4 py-2 hover:bg-gray-100">
                    Oats & Muesli
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition px-3 py-2 rounded">
              About
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-gray-600 hover:text-blue-600 transition p-2 rounded-full hover:bg-gray-100">
              <Image src="/assets/search.png" alt="Search" width={24} height={24} />
            </Link>
            <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition p-2 rounded-full hover:bg-gray-100">
              <Image src="/assets/trolley.png" alt="Cart" width={24} height={24} />
            </Link>
            {isLoggedIn ? (
              <Link href="/user" className="text-gray-600 hover:text-blue-600 transition p-2 rounded-full hover:bg-gray-100">
                <Image src="/assets/user.png" alt="User" width={24} height={24} />
              </Link>
            ) : (
              <Link href="/login" className="text-blue-600 hover:text-blue-800 transition px-3 py-2 rounded hover:bg-blue-50">
                Login
              </Link>
            )}
            {/* Hamburger for mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link href="/" className="block text-gray-600 hover:text-blue-600 transition px-3 py-2 rounded hover:bg-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="block text-gray-600 hover:text-blue-600 transition px-3 py-2 rounded hover:bg-gray-100">
                Shop
              </Link>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer flex items-center justify-between text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
                  Categories
                  <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <ul className="mt-2 space-y-1 pl-4">
                  <li>
                    <Link href="/categories/whey-protein" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
                      Whey Protein
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/creatine-monohydrate" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
                      Creatine Monohydrate
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/peanut-butter" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
                      Peanut Butter
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/oats-museli" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
                      Oats & Muesli
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/about" className="block text-gray-600 hover:text-blue-600 transition px-3 py-2 rounded hover:bg-gray-100">
                About
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <Link href="/user" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-gray-100">
                  Profile
                </Link>
              ) : (
                <Link href="/login" className="block text-blue-600 hover:text-blue-800 px-3 py-2 rounded hover:bg-blue-50">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;




// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import useUserstate from "@/app/Store/store";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import "./Header.css";

// const Header: React.FC = () => {
//   const user = useUserstate((state) => state.user);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, [user]);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light px-4 shadow-sm">
//       <Link className="navbar-brand fw-bold fs-4" href="/">
//         FitFuel
//       </Link>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//           <li className="nav-item">
//             <Link className="nav-link active" href="/">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" href="/">
//               Shop
//             </Link>
//           </li>
//           <li className="nav-item dropdown">
//             <a
//               className="nav-link dropdown-toggle"
//               href="#"
//               id="navbarDropdown"
//               role="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               Categories
//             </a>
//             <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//               <li>
//                 <Link className="dropdown-item" href="/categories/whey-protein">
//                   Whey Protein
//                 </Link>
//               </li>
//               <li>
//                 <Link className="dropdown-item" href="/categories/creatine-monohydrate">
//                   Creatine Monohydrate
//                 </Link>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li>
//                 <Link className="dropdown-item" href="/categories/peanut-butter">
//                   Peanut Butter
//                 </Link>
//               </li>
//               <li>
//                 <Link className="dropdown-item" href="/categories/oats-museli">
//                   Oats & Muesli
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" href="/about">
//               About
//             </Link>
//           </li>
//         </ul>

//         <div className="d-flex align-items-center gap-3">
//           <Link href="/search" className="nav-link p-0">
//             <Image
//               src="/assets/search.png"
//               alt="Search"
//               className="nav-icon"
//               width={24}
//               height={24}
//             />
//           </Link>
//           <Link href="/cart" className="nav-link position-relative p-0">
//             <Image
//               src="/assets/trolley.png"
//               alt="Cart"
//               className="nav-icon"
//               width={24}
//               height={24}
//             />
//           </Link>

//           {isLoggedIn ? (
//             <Link href="/user" className="nav-link p-0">
//               <Image
//                 src="/assets/user.png"
//                 alt="User"
//                 className="nav-icon"
//                 width={24}
//                 height={24}
//               />
//             </Link>
//           ) : (
//             <Link href="/login" className="nav-link p-0">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;




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
  