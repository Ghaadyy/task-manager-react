import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string | undefined>(undefined);

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // setError("Please fill the field");
  };

  return (
    <form className="w-full flex flex-col items-center p-3 gap-2">
      <h1 className="mb-5 text-2xl font-bold">SignUp</h1>
      <Input
        type="email"
        name="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={error}
      />
      <Input
        type="password"
        name="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        error={error}
      />
      <Button type="submit" name="Submit" onClick={onClickHandler} />
    </form>
  );
};

export default SignUpPage;
