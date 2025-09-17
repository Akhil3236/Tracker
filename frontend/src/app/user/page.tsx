"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserstate from "../Store/store";
import useCart from "../Store/cartStore";
import useProduct from "../Store/products";
import useOrders from "../Store/orderStore";

type Props = {};

function Page({ }: Props) {
  const user = useUserstate((state) => state.user);
  const clearUser = useUserstate((state) => state.clearUser);
  const clearProducts=useCart((state)=>state.clearProducts);
  const clearProduct=useProduct((state)=>state.clearProduct);
  const clearorders=useOrders((state)=>state.clearorders);


  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  const logout = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/logout`,
      {},
      { withCredentials: true }
    );

    if (res.status === 200) {
      window.dispatchEvent(new Event("auth-changed"));
      clearUser();
      clearProducts();
      clearProduct();
      clearorders();

      router.push("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveChanges = () => {
    // TODO: send update request to backend (e.g., axios.put)
    console.log("Updated Data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center p-6">
      <div className="bg-gray-900 shadow-lg rounded-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-red-400 mb-4">
          👤 User Profile
        </h2>

        {user ? (
          <>
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring focus:ring-green-500"
                />
                <div className="flex gap-3">
                  <button
                    onClick={saveChanges}
                    className="bg-green-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="font-semibold text-red-400">Name:</span>{" "}
                  {user.name}
                </p>
                <p>
                  <span className="font-semibold text-red-400">Email:</span>{" "}
                  {user.email}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400">No user logged in ❌</p>
        )}
      </div>
    </div>
  );
}

export default Page;
