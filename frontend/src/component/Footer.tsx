"use client";
import React from "react";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#000000",
        padding: "40px 60px 20px 60px", // Top/Bottom: 40/20, Left/Right: 20px
        width: "100%",
      }}
    >
      {/* Wrapper with side padding */}
      <div
        style={{
          width: "100%",
          paddingLeft: "60px", // Add extra left spacing
          paddingRight: "60px", // Add extra right spacing
          boxSizing: "border-box",
        }}
      >
        {/* Main Footer Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: "60px",
            alignItems: "start",
            marginBottom: "40px",
          }}
        >
          {/* Left Section - Logo and Social */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="#ffc107"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  style={{
                    color: "#ffc107",
                    fontSize: "24px",
                    fontWeight: "700",
                    margin: 0,
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Fuel Your Fitness
                </h2>
              </div>
            </div>

            {/* Social Media Icons */}
            <div style={{ display: "flex", gap: "15px" }}>
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{ color: "#ffffff", transition: "color 0.3s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffc107")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h3
              style={{
                color: "#ffc107",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Resources
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Shop", "Categories", "About"].map((text, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    color: "#9ca3af",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Column */}
          <div>
            <h3
              style={{
                color: "#ffc107",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Legal
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Terms", "Privacy Policy"].map((text, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    color: "#9ca3af",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div
          style={{
            height: "1px",
            backgroundColor: "#333333",
            marginBottom: "20px",
          }}
        ></div>

        {/* Copyright */}
        <div style={{ textAlign: "left" }}>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "14px",
              margin: 0,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            © 2025 FitFuel - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
