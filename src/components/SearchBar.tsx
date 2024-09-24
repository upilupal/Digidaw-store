"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { on } from "events";

const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) {
      return router.push("/");
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <div className="flex items-center">
      <Input {...register("searchTerm")} className="border-gray-300 w-80 rounded-r-none" placeholder="Find product.." autoComplete="off" />
      <Button className="rounded-l-none bg-slate-800" onClick={handleSubmit(onSubmit)}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
