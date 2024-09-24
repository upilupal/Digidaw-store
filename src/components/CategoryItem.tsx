"use client";
import { LucideIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import queryString from "query-string";
import { IconType } from "react-icons/lib";

interface CategoryItemProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url)
    }
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 rounded bg-transparent hover:bg-slate-800 text-slate-800  hover:text-secondary transition cursor-pointer ${
        selected ? "bg-transparent text-slate-800 border border-slate-700" : "bg-transparent text-slate-800"
      }`}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryItem;
