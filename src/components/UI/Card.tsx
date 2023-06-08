import React from "react";

type Props = {
  children?: React.ReactNode;
  isMoveable?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const Card: React.FC<Props> = ({
  children,
  isMoveable = true,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white flex flex-col border-2 ${
        isMoveable && "border-[#979797]"
      }  px-4 py-2 rounded-lg w-[300px] min-h-[100px] ${
        isMoveable && "hover:shadow-xl"
      } transition-shadow duration-200 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
