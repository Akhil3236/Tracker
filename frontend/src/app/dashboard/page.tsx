"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserstate from "../Store/store";
import useProduct from "../Store/products";
import axios from "axios";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const [search, setsearch] = useState("");

  const setProduct = useProduct((state) => state.setProduct);
  const user = useUserstate((state) => state.user);
  const products = useProduct((state) => state.product);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };

  const searchitem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(search);
  };  
 
  useEffect(()=>{
  
    /*------------------------------------
       product details storage in zustand 
    ------------------------------------*/
    const getproducts = async () => {

      try {

        const products = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product`, {
          withCredentials: true,
        });
        setProduct(products.data);
      } catch (error) {
        // router.push("login");
      }
    }
    getproducts();

  },[setProduct])
  const addtocart=async(product:any)=>{

    const id=product._id;
    console.log("added to cart",id);
  
  }
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

         <p>
         Welcome , 
          <b>{user?.name || "Athlete"}</b> 
          </p> 
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
                  onClick={()=>addtocart(p)}
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
