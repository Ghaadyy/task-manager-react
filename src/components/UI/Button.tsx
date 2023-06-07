import React from "react";

type Props = {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button: React.FC<Props> = ({ type, name, onClick }) => {
  return (
    <button
      type={type}
      name={name}
      onClick={onClick}
      className="rounded-lg bg-blue-400 px-5 py-3 text-white font-bold hover:bg-blue-600 transition-colors duration-150 ease-in-out"
    >
      {name}
    </button>
  );
};

export default Button;
