// /app/cart/CartClient.tsx
"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../../../utils/formatPrice";
import ItemContent from "./ItemContent";

interface SnapConfig {
  onSuccess: (result: any) => void;
  onPending: (result: any) => void;
  onError: (result: any) => void;
  onClose: () => void;
}
declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: SnapConfig) => void;
    };
  }
}

const CartClient: React.FC = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const [isSnapReady, setIsSnapReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.snap) {
      setIsSnapReady(true);
    }
  }, []);

  const checkoutHandler = async () => {
    try {
      const response = await axios.post("/api/transaction", { items: cartProducts });
      const { token } = response.data;
      console.log({ token });

      if (isSnapReady && window.snap) {
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log("success", result);
            // Handle successful payment
          },
          onPending: function (result) {
            console.log("pending", result);
            // Handle pending payment
          },
          onError: function (result) {
            console.error("error", result);
            // Handle payment error
          },
          onClose: function () {
            console.log("customer closed the popup without finishing the payment");
            // Handle snap popup closed
          },
        });
      } else {
        console.error("Snap library is not ready");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
            <MdArrowBack />
            <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <Script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} onLoad={() => setIsSnapReady(true)} />
      <div>
        <Heading title="shopping cart" center />
        <div className="md:grid md:grid-cols-3 gap-4 items-start my-4">
          {/* left component */}
          <Card className="col-span-2 px-4">
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
              <div className="col-span-2 justify-self-start">Product</div>
              <div className="justify-self-center">Price</div>
              <div className="justify-self-center">Quantity</div>
              <div className="justify-self-end">Total</div>
            </div>
            <div>
              {cartProducts &&
                cartProducts.map((item) => {
                  return <ItemContent key={item.id} item={item} />;
                })}
            </div>
          </Card>

          {/* right component */}
          <Card className="col-span-1 px-4">
            <div className="border-t-[1.5px] border-slate-200 py-4">
              <div className="text-sm flex flex-col gap-1 items-start">
                <div className="flex justify-between w-full text-base font-semibold bg-slate-200 p-3 rounded">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <p className="text-slate-500">Taxes and shipping calculate at checkout</p>
                <Button
                  onClick={() => {
                    checkoutHandler();
                  }}
                  className="w-full my-4"
                >
                  Checkout
                </Button>
                {/* </Link> */}
                <div className="w-full">
                  <Button
                    onClick={() => {
                      handleClearCart();
                    }}
                    variant={"outline"}
                    className="w-full"
                  >
                    Clear Cart
                  </Button>
                </div>
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                  <MdArrowBack />
                  <span className="hover:opacity-70">Continue shopping</span>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CartClient;
