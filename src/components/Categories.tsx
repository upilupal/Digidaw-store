'use client'
import React from "react";
import Container from "./Container";
import { categories } from "../../utils/Categories";
import CategoryItem from "./CategoryItem";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName === "/";

  if (!isMainPage) return null;
  return (
    <div>
      <Container>
        <div className="py-4 flex items-center justify-between">
          {categories.map((item) => (
            <CategoryItem key={item.label} label={item.label} icon={item.icon} selected={category === item.label || (category === null && item.label === "All")} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
