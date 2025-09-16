// app/cart/page.tsx  (Next.js 13+ App Router)
// For Next.js 12, use pages/cart.tsx

"use client";

import axios from "axios";
import { useEffect } from "react";
import useUserstate from "../Store/store";
import useCart from "../Store/cartStore"
import {useRouter} from "next/navigation";
import { push } from "firebase/database";

// items now come from zustand store
export default function CartPage() {
  type ProductRef = { _id?: string; id?: string; name: string; cost: number; image?: string };
  type CartItem = { id?: string; _id?: string; productId?: ProductRef; name?: string; cost?: number; quantity: number; image?: string };
  const setProducts = useCart((state) => state.setProducts);
  const items = useCart((state) => state.items) as CartItem[];
  const user = useUserstate((state) => state.user);
  const router=useRouter();

  useEffect(() => {

    const getproduct = async () => {

      const id = (user as any)?.id || (user as any)?._id;
      if (!id) return;
      const getproduct = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}cart/${id}`, {
        withCredentials: true
      })

      const payload = getproduct.data?.cart?.items || getproduct.data?.items || [];
      setProducts(payload);

    }
    getproduct();
  }, [user])

  const deleteitem = async (itemId: string) => {
    try {
      console.log("deleted item:", itemId);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}cart/remove`, { itemId }, {
        withCredentials: true
      });

      console.log(response.data);

      // Refresh cart data after successful deletion
      const id = (user as any)?.id || (user as any)?._id;
      if (id) {
        const getproduct = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}cart/${id}`, {
          withCredentials: true
        });
        const payload = getproduct.data?.cart?.items || getproduct.data?.items || [];
        setProducts(payload);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }
  
  const checkout=async()=>{

  const orderit=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}cart/place-order`,{},{
    withCredentials:true
  });

  if(orderit.status===200){
    router.push("/orders");
  }
  else{

    console.log(orderit);
    router.push("/orders");
    
  }
  

  }

  const total = items.reduce((sum: number, item: CartItem) => {
    const cost = item.productId?.cost ?? item.cost ?? 0;
    return sum + cost * item.quantity;
  }, 0);

  return (
    <div className="min-h-150 bg-gray-100 flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black">
        {items.map((item: CartItem, index: number) => (
          <div
            key={item.id || item._id || item.productId?._id || item.productId?.id || `${item.productId?.name || item.name}-${index}`}
            className="flex items-start space-x-3 bg-grey rounded-2xl shadow-md p-4 max-w-md"
          >
            <img
              src={item.productId?.image || item.image || ""}
              alt={(item.productId?.name || item.name) as string}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.productId?.name || item.name}</p>
              <p className="text-gray-600 text-sm">
                ₹{item.productId?.cost ?? item.cost} × {item.quantity}
              </p>
              <p className="font-bold text-green-600 mt-1">
                ₹{(item.productId?.cost ?? item.cost ?? 0) * item.quantity}
              </p>
              <button onClick={() => deleteitem(item.id || item._id || item.productId?._id || item.productId?.id || "")}>delete</button>
            </div>
          </div>
        ))}


      </div>

      {/* Footer like ChatGPT input box */}
      <div className="p-4 bg-black border-t shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Total</h2>
          <p className="text-lg font-bold text-green-600">₹{total}</p>
        </div>
        <button onClick={checkout} className="mt-3 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
