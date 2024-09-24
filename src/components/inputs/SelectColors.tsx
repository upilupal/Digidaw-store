"use client";

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import React, { useCallback, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import SelectImage from "./SelectImage";
import { Button } from "../ui/button";

interface SelectColorsProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColors: React.FC<SelectColorsProps> = ({ item, addImageToState, removeImageFromState, isProductCreated }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);

  // helper to open a image input when the checkbox is checked
  const handleCheck = useCallback((checked: boolean) => {
    setIsSelected(checked);

    if (!checked) {
      setFile(null);
      removeImageFromState(item);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex gap-2 items-center h-[60px]">
        <Checkbox id={item.color} checked={isSelected} onCheckedChange={handleCheck} className="cursor-pointer" />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}

        {file && (
          <div className="flex gap-2 text-sm col-span-2 items-center justify-between">
            <p>{file?.name}</p>
            <div className="w-[70px]">
              <Button
                variant={"outline"}
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColors;
