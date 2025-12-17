/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { twMerge } from "tailwind-merge";

type TButton = {
  label: string;
  onClick?: any;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button: React.FC<TButton> = ({
  label,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        "px-4 py-3 bg-primary-10 text-white text-base font-medium leading-5 tracking-tighter rounded-[10px]",
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;