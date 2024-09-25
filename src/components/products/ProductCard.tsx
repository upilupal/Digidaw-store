"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { formatPrice } from "../../../utils/formatPrice";
import { truncateText } from "../../../utils/truncateText";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <Card className="size-full overflow-hidden rounded-lg">
      <div className="flex flex-col w-full gap-1">
        <CardHeader className="w-full p-0 border-b">
          <Link aria-label={data.name} href={`/product/${data.id}`}>
            <AspectRatio ratio={4 / 3}>
              <Image fill className="w-full h-full object-contain" src={data.image[0].image} alt={data.name} />
            </AspectRatio>
          </Link>
        </CardHeader>
        <CardContent className="space-y-1.5">
          <CardTitle className="mt-4 text-lg">{truncateText(data.name)}</CardTitle>
          <CardDescription className="">{formatPrice(data.price)}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-1 w-full">
          <Button aria-label="Add to cart" size="sm" className="h-8 w-full rounded-sm">
            <Link aria-label={data.name} href={`/product/${data.id}`}>
              View detail
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCard;
