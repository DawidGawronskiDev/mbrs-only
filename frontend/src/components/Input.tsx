import { InputHTMLAttributes } from "react";

interface InputWithProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export default function Input({ label, name, ...props }: InputWithProps) {
  return (
    <p className="flex flex-col gap-1">
      <label htmlFor={name} className="font-black uppercase text-c-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className="border-4 border-c-200 px-4 py-2 font-black"
      />
    </p>
  );
}
