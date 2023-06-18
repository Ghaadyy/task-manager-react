import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean;
};

const Button: React.FC<Props> = ({
  type,
  name,
  onClick,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      name={name}
      onClick={onClick}
      className={`min-w-[150px] min-h-[50px] rounded-lg bg-blue-400 px-5 py-3 text-white font-bold hover:bg-blue-600 transition-all duration-150 ease-in-out flex flex-col items-center justify-center`}
    >
      {isLoading ? <ClipLoader color="#ffffff" size={20} /> : name}
    </button>
  );
};

export default Button;
