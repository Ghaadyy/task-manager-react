import React from "react";

type Props = {
  error: string | undefined;
};

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Props;

const Input: React.FC<InputProps> = ({
  name,
  type,
  onChange,
  error,
  value,
}) => {
  return (
    <>
      <input
        className="border-2 rounded-lg p-3 outline-none"
        type={type}
        name={name}
        placeholder={name}
        onChange={onChange}
        value={value}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </>
  );
};

export default Input;
