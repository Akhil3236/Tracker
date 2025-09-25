"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useUserstate from "@/app/Store/store";
import "bootstrap/dist/css/bootstrap.min.css";

const Header: React.FC = () => {
  const user = useUserstate((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load Bootstrap JS for dropdowns and toggler
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [user]);

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#ffc107" }} // Yellow background
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold fs-4"
          href="/"
          style={{ color: "#000000" }} // Black text
        >
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
              <Link className="nav-link" href="/" style={{ color: "#000000" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/shop" style={{ color: "#000000" }}>
                Shop
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#000000" }}
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/categories/whey-protein">
                    Whey Protein
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/categories/creatine-monohydrate">
                    Creatine Monohydrate
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="/categories/peanut-butter">
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
              <Link className="nav-link" href="/about" style={{ color: "#000000" }}>
                About
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link href="/search">
              <Image src="/assets/search.png" alt="Search" width={24} height={24} />
            </Link>
            <Link href="/cart">
              <Image src="/assets/trolley.png" alt="Cart" width={24} height={24} />
            </Link>
            {isLoggedIn ? (
              <Link href="/user">
                <Image src="/assets/user.png" alt="User" width={24} height={24} />
              </Link>
            ) : (
              <Link href="/login" style={{ color: "#000000" }}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
