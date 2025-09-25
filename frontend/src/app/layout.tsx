"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css'; // AOS styles
import { useEffect } from "react";
import AOS from "aos";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    // Load Bootstrap JS dynamically for client-side
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Initialize AOS animations
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // animate only once
      mirror: false,  // disable animation when scrolling past
    });

    // Refresh AOS on content changes
    AOS.refresh();
  }, []);

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
