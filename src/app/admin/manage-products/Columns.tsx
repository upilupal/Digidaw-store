"use client";
import Status from "@/components/Status";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, RefreshCw, Trash, Trash2 } from "lucide-react";
import { MdClose, MdDone } from "react-icons/md";
import { formatPrice } from "../../../../utils/formatPrice";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import getProducts from "@/app/actions/getProducts";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/app/libs/firebase";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "id", header: "ID", size: 220 },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 220,
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 100,
    cell: ({ getValue }) => {
      const price = getValue() as number;
      return <div className="font-semibold text-slate-800">{formatPrice(price)}</div>;
    },
  },
  { accessorKey: "category", header: "Category", size: 100 },
  { accessorKey: "brand", header: "Brand", size: 100 },
  {
    accessorKey: "inStock",
    header: "inStock",
    size: 120,
    cell: ({ getValue }) => {
      const inStock = getValue() as boolean;
      return <div>{inStock === true ? <Status text="in stock" icon={MdDone} bg="bg-teal-200" color="text-teal-700" /> : <Status text="out of stock" icon={MdClose} bg="bg-red-200" color="text-red-700" />}</div>;
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    size: 200,
    cell: (params) => {
      const router = useRouter();
      const storage = getStorage(firebaseApp);
      const handleStock = useCallback((id: string, inStock: boolean) => {
        axios
          .put("/api/product", {
            id,
            inStock: !inStock,
          })
          .then((res) => {
            toast.success("Product status changed");
            router.refresh();
          })
          .catch((err) => {
            toast.error("Oops! Something went wrong");
            console.log(err);
          });
      }, []);

      const handleDelete = useCallback(async (id: string, images: any[]) => {
        toast("Deleting product, please wait!");

        const handleImageDelete = async () => {
          try {
            for (const item of images) {
              if (item.image) {
                const imageRef = ref(storage, item.image);
                await deleteObject(imageRef);
                console.log("image deleted", item.image);
              }
            }
          } catch (error) {
            return console.log("Deleting images error", error);
          }
        };

        await handleImageDelete();

        axios
          .delete(`/api/product/${id}`)
          .then((res) => {
            toast.success("Product deleted");
            router.refresh();
          })
          .catch((err) => {
            toast.error("Failed to delete product");
            console.log(err);
          });
      }, []);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleStock(params.row.original.id, params.row.original.inStock)} className="cursor-pointer">
              <RefreshCw size={15} />
              <p className="ml-2">Restock</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`product/${params.row.original.id}`)} className="cursor-pointer">
              <Eye size={15} />
              <p className="ml-2">View Detail</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(params.row.original.id, params.row.original.image)} className="cursor-pointer">
              <Trash2 size={15} />
              <p className="ml-2">Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
