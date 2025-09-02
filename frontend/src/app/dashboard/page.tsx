"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useUserstate from "../Store/store";
import useProduct from "../Store/products";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const [search, setsearch] = useState("");

  const setUser = useUserstate((state) => state.setUser);
  const user = useUserstate((state) => state.user);
  const products = useProduct((state) => state.product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };

  const searchitem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(search);
  };  
  return (
    <>
      <div className="main">
        <br />

        {/* 🔎 Search Section */}
        <div className="serach">
          <form onSubmit={searchitem}>
            <input
              type="text"
              placeholder="search"
              required
              name="search"
              value={search}
              onChange={handleChange}
              />
            <button type="submit">search</button>
          </form>
        </div>

        <br />

        Hi , <b>{user.name}</b> Welcome

        <br /><br />
        {/* added  Products Section */}

        {/* make some changes */}
        <div className="products-grid">
          {products && products.length > 0 ? (
            products.map((p: any) => (
              <div
                key={p._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <p>
                  <b>₹{p.cost}</b> <span style={{ color: "green" }}>-{p.discount}%</span>
                </p>

                <div className="Buybutton">
                  
                <button
                  style={{
                    background: "#0070f3",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  >
                  Add to Cart
                </button>
                <button
                  style={{
                    background: "red",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  >
                  buy
                </button>
                  </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
