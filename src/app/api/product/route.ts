// /api/product
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if(!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }


  try {
    const body = await request.json();
    const { name, description, price, brand, category, inStock, image } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        inStock,
        image,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.error();
    }
  
    const body = await request.json();
    const { id, inStock } = body;
  
    if (!id) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
  
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        inStock,
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
  }

}
