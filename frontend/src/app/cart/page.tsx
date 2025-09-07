// app/cart/page.tsx  (Next.js 13+ App Router)
// For Next.js 12, use pages/cart.tsx

"use client";

import { log } from "console";

const cartItems = [
  {
    id: "1",
    name: "Whey Protein (2kg)",
    cost: 1500,
    quantity: 2,
    image: "https://via.placeholder.com/60",
  },
  {
    id: "2",
    name: "Creatine Monohydrate (300g)",
    cost: 1200,
    quantity: 1,
    image: "https://via.placeholder.com/60",
  },
  {
    id: "3",
    name: "Pre-Workout Formula",
    cost: 800,
    quantity: 1,
    image: "https://via.placeholder.com/60",
  },
];
export default function CartPage() {
  const deleteitem=()=>{
    console.log("deleted items");
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.cost * item.quantity,
    0
  );

  return (
    <div className="min-h-150 bg-gray-100 flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start space-x-3 bg-grey rounded-2xl shadow-md p-4 max-w-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-gray-600 text-sm">
                ₹{item.cost} × {item.quantity}
              </p>
              <p className="font-bold text-green-600 mt-1">
                ₹{item.cost * item.quantity}
              </p>
              <button onClick={deleteitem}>delete</button>
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
        <button className="mt-3 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
