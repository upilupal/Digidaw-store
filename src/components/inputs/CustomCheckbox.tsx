"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";


interface CustomCheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, label, disabled, register }) => {
  return (
    <div className="w-full flex space-x-2 items-center">
      <input id={id} disabled={disabled} {...register(id)} className="cursor-pointer" type="checkbox" />
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
