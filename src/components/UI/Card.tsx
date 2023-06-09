import React from "react";

type Props = {
  children?: React.ReactNode;
  isMoveable?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  small?: boolean;
};

const Card: React.FC<Props> = ({
  children,
  isMoveable = true,
  className,
  onClick,
  small = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white flex flex-col border-2 ${
        isMoveable && "border-[#979797]"
      } justify-between px-4 py-3 rounded-lg w-[300px] ${
        small ? "min-h-[70px]" : "min-h-[100px]"
      } ${
        isMoveable && "hover:shadow-xl"
      } transition-shadow duration-200 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
