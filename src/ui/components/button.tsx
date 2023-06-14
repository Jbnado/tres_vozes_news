import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, To } from "react-router-dom";

interface buttonProps {
  children: ReactNode;
  buttonType: "primary" | "secondary" | "purple" | "dark";
  onClick?: () => void;
  link?: boolean;
  to?: To;
  props?: React.DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

export default function ButtonComponent({
  children,
  buttonType,
  onClick,
  link = false,
  to,
  props,
}: buttonProps) {
  const buttonTypes = {
    primary:
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded border border-blue-600 bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto",
    secondary:
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded border border-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto",
    purple:
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring",
    dark: "inline-flex items-center gap-1.5 whitespace-nowrap rounded border-2 border-[#171515] bg-[#171515] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-[#171515] focus:outline-none focus:ring active:opacity-75",
  };

  if (link) {
    return (
      <Link className={buttonTypes[buttonType]} to={to as To}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonTypes[buttonType]} {...props} onClick={onClick}>
      {children}
    </button>
  );
}
