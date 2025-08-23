import Link from "next/link";

// src/components/Header.tsx
export default function Header() {
    return (
      <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
        
        <nav>
            <Link href="/">Logo</Link>
            <Link href="/">Home</Link>
            <br />
            <Link href="/about">about us</Link>
            <br />
            <Link href="/login">Login</Link>
        </nav>
      </header>
    );
  }
  