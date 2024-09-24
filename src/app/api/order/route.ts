// /api/product
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";



export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    if (currentUser.role !== "ADMIN") {
      return NextResponse.error();
    }
  
    const body = await request.json();
    const { id, deliveryStatus } = body;
  
    if (!id) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
  
    const order = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        deliveryStatus,
      },
    });
  
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error updating product:", error);
  }

}
