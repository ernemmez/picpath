import { ButtonHTMLAttributes } from "react";

export interface Iinput {
  type: string;
  label?: string;
  variant: "static" | "standard" | "outlined";
  color?: "blue" | "purple" | "indigo" | "teal";
  error?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "standart" | "filled" | "gradient" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  rippleEffect?: boolean;
}

export interface PPMapTypes {
  resultData?: any;
}
