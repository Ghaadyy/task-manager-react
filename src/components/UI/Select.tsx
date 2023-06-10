import React from "react";

type SelectProps = {
  name: string | undefined;
  value?: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  children:
    | React.ReactElement<HTMLOptionElement>
    | React.ReactElement<HTMLOptionElement>[];
};

const Select: React.FC<SelectProps> = ({ name, value, onChange, children }) => {
  return (
    <select
      name={name}
      value={value}
      className="max-w-[250px] w-full border-2 rounded-lg p-3 outline-none focus:border-[#979797]"
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
