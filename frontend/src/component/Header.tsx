import Link from "next/link";

// src/components/Header.tsx
export default function Header() {
    return (
      <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">about me</Link>
        </nav>
      </header>
);
}
  