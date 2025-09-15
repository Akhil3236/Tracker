"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from "react";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load Bootstrap JS for dropdowns/collapse
//   useEffect(() => {
//   import("bootstrap/dist/js/bootstrap.bundle.min.js");
// }, []);

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
