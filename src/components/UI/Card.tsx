import React from "react";

type Props = {
  children?: React.ReactNode;
  isMoveable?: boolean;
};

const Card: React.FC<Props> = ({ children, isMoveable = true }) => {
  return (
    <div
      className={`bg-white flex flex-col border-2 ${
        isMoveable && "border-[#979797]"
      }  px-4 py-2 rounded-lg w-[300px] min-h-[100px] ${
        isMoveable && "hover:shadow-xl"
      } transition-shadow duration-200 ease-in-out`}
    >
      {children}
    </div>
  );
};

export default Card;
