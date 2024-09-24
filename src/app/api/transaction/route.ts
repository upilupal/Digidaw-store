// /api/transaction/route.ts
import midtransClient from "midtrans-client";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prisma";

interface CartProductType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

const calculateOrder = (items: CartProductType[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const truncateName = (name: string, maxLength: number = 50) => {
  return name.length > maxLength ? name.substring(0, maxLength - 3) + "..." : name;
};



export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid items data" }, { status: 400 });
    }

    const order_id = `TRX-${Date.now()}`;
    const gross_amount = calculateOrder(items);

    let parameter = {
      item_details: items.map((item) => ({
        id: item.id,
        price: Number(item.price),
        quantity: item.quantity,
        name: truncateName(item.name),
      })),
      transaction_details: {
        order_id,
        gross_amount,
      },
      customer_details: {
        first_name: currentUser.name,
        email: currentUser.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const transaction_id = transaction.transaction_id;


    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: gross_amount,
      status: "pending",
      token: transaction.token,
      deliveryStatus: "pending",
      products: items,
    };

    await prisma.order.create({
      data: orderData,
    });

    // let order;
    // if (transaction_id) {
    //   // Check if an order with this transaction_id already exists
    //   // const existingOrder = await prisma.order.findUnique({
    //   //   where: { transactionId: transaction_id },
    //   // });

    //   if (existingOrder) {
    //     // Update the existing order
    //     order = await prisma.order.update({
    //       where: { id: existingOrder.id },
    //       data: orderData,
    //     });
    //   } else {
    //     // Create a new order
    //     order = await prisma.order.create({
    //       data: orderData,
    //     });
    //   }
    // } else {
    //   // If for some reason transaction_id is not available, create a new order
    //   // order = await prisma.order.create({
    //   //   data: orderData,
    //   // });
    // }

    return NextResponse.json({ ...transaction });
  } catch (error) {
    console.error("Detailed Midtrans error:", error);
    return NextResponse.json({ error: "Failed to create transaction token", details: error }, { status: 500 });
  }
}
