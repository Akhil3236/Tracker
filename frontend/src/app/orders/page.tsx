"use client";

import axios from "axios";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import useOrders from "../Store/orderStore";

function Page() {
  const setorders = useOrders((state) => state.setorders); 
  const items = useOrders((state) => state.items);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}order`, {
          withCredentials: true,
        });

        if (response.data) {
          setorders(response.data); 
          
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, [setorders]);

  

  return (
    <>
    <br />
    <br />
    <br />
    <p>Order Status</p>
    <ul>
      {items? (
        items.map((order: { _id: any; id: any; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; totalPrice: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <li key={order._id || order.id}>
            <p><strong>Order ID:</strong> {order._id || order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total Price:</strong> {order.totalPrice}</p>
            <hr />
          </li>
        ))
      ) : (
        <li>No orders found.</li>
      )}
    </ul>
  </>
  );
}

export default Page;
