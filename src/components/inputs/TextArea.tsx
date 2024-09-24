'use client'

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";


interface TextAreaProps {
    id: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const TextAreaForm: React.FC<TextAreaProps> = ({
    id,
    label,
    disabled,
    required,
    register,
    errors
}) => {
  return (
    <div className="w-full relative">
    {/* <input className={`peer w-full p-4 pt-6 outline-none border-y-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-400' : 'border-slate-300'} ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}`}/> */}
    <Label htmlFor={id} className={`${errors[id] ? 'text-red-600' : 'text-slate-800'}`}>{label}</Label> 
    <Textarea 
      id={id} 
      disabled={disabled} 
      {...register(id, {required})}
      placeholder=""
      className={`${errors[id] ? 'border-red-600' : 'border-slate-300'} ${errors[id] ? 'focus:border-red-600' : 'focus:border-slate-300'}`}
      />
      
    </div>
  )
}

export default TextAreaForm;