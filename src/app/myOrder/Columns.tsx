"use client";
import Status from "@/components/Status";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Eye, MoreHorizontal, PackageCheck, RefreshCw, Trash2, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { MdAccessTimeFilled, MdClose, MdDeliveryDining, MdDone } from "react-icons/md";
import firebaseApp from "@/app/libs/firebase";
import { getStorage } from "firebase/storage";
import { ExtendedOrder } from "./OrderClient";
import { formatPrice } from "../../../utils/formatPrice";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const columns: ColumnDef<ExtendedOrder>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "id", header: "ID", size: 220 },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 220,
    cell: (params) => {
      return <p className="ml-5">{params.row.original.user.name}</p>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 100,
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return <div className="font-semibold text-slate-800">{formatPrice(amount)}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    size: 130,
    cell: (params) => {
      return (
        <div>
          {params.row.original.status === "pending" ? (
            <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
          ) : params.row.original.status === "complete" ? (
            <Status text="completed" icon={MdDone} bg="bg-green-200" color="text-green-700" />
          ) : (
            <></>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    size: 130,
    cell: ({ getValue }) => {
      const deliveryStatus = getValue() as string;
      return (
        <div>
          {deliveryStatus === "pending" ? (
            <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
          ) : deliveryStatus === "dispatched" ? (
            <Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
          ) : deliveryStatus === "delivered" ? (
            <Status text="delivered" icon={MdDone} bg="bg-green-200" color="text-green-700" />
          ) : (
            <></>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createDate",
    header: "Date",
    size: 130,
    // cell: ( params ) => {
    //   return <p className="ml-5">{pa}</p>;
    // },
  },
  {
    accessorKey: "action",
    header: "Actions",
    size: 200,
    cell: (params) => {
      const router = useRouter();
      const storage = getStorage(firebaseApp);

      const handleDispatch = useCallback((id: string) => {
        axios
          .put("/api/order", {
            id,
            deliveryStatus: "dispatched",
          })
          .then((res) => {
            toast.success("Order Dispatched");
            router.refresh();
          })
          .catch((err) => {
            toast.error("Oops! Something went wrong");
            console.log(err);
          });
      }, []);

      const handleDeliver = useCallback((id: string) => {
        axios
          .put("/api/order", {
            id,
            deliveryStatus: "delivered",
          })
          .then((res) => {
            toast.success("Order Delivered");
            router.refresh();
          })
          .catch((err) => {
            toast.error("Oops! Something went wrong");
            console.log(err);
          });
      }, []);

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant={"outline"} onClick={() => router.push(`/order/${params.row.original.id}`)}>
                <Eye size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View detail</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>

        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem onClick={() => handleDispatch(params.row.original.id)}>
        //       <Truck size={15} />
        //       <p className="ml-2">Dispatched</p>
        //     </DropdownMenuItem>
        //     <DropdownMenuItem onClick={() => handleDeliver(params.row.original.id)}>
        //       <PackageCheck size={15} />
        //       <p className="ml-2">Delivered</p>
        //     </DropdownMenuItem>
        //     <DropdownMenuItem onClick={() => router.push(`/order/${params.row.original.id}`)}>
        //       <Eye size={15} />
        //       <p className="ml-2">View Detail</p>
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
  },
];
