"use client";

import useUserstate from "./Store/store";
import useProduct from "./Store/products";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  const setUser = useUserstate((state) => state.setUser);
  const setProduct = useProduct((state) => state.setProduct);

  const user = useUserstate((state) => state.user);
  // const product=useProduct((state)=>state.product);

  useEffect(() => {

    /*--------------------------------
       user details storage in zustand 
    ----------------------------------*/
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, {
          withCredentials: true,
        });
        setUser(res.data);

        setLoading(false);
      } catch (err) {
        console.error("Not authenticated", err);
        setLoading(false);
        // router.push("login"); 
      }
    };
    /*------------------------------------
       product details storage in zustand 
    ------------------------------------*/
    const getproducts = async () => {

      try {

        const products = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product`, {
          withCredentials: true,
        });
        setProduct(products.data);
        setLoading(false);
      } catch (error) {
        // router.push("login");
      }
    }
    checkAuth();
    getproducts();
  }, [setUser, setProduct]);

  const redirect = () => {

    if (user) {
      router.push("dashboard");
    }
    else {
      router.push("login");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Centered Container */}
      <div className="max-w-6xl w-full flex flex-col items-center">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            👋 Welcome,{" "}
            <span className="text-emerald-400">
              {user?.name || "Athlete"}
            </span>
            !
          </h1>
          <p className="text-lg text-gray-300">
            You’ve just entered <span className="font-bold text-indigo-400">FitFuel</span> —
            your one-stop destination for{" "}
            <span className="text-emerald-400">premium gym supplements</span>.
          </p>
        </div>

        {/* Store Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-bold text-indigo-400 mb-2">💪 Strength Boosters</h2>
            <p className="text-gray-300">Creatine & Pre-Workout to power up your lifts and stamina.</p>
          </div>

          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-bold text-emerald-400 mb-2">🥤 Recovery Essentials</h2>
            <p className="text-gray-300">Whey Protein & BCAAs to fuel muscle repair and faster recovery.</p>
          </div>

          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-bold text-yellow-400 mb-2">🛡️ Health & Wellness</h2>
            <p className="text-gray-300">Multivitamins & Omega-3 for immunity and overall wellness.</p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button onClick={redirect} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition">
            🛒 Shop Now
          </button>
          <p className="text-gray-400 mt-4">
            Fuel your journey with science-backed supplements ⚡
          </p>
        </div>
      </div>
    </main>
  );
}
