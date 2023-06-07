import React, { useContext, useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import UserContext from "../store/user-context";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error] = useState<string | undefined>(undefined);

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    const item = {
      email,
      password,
    };

    try {
      const res = await fetch("https://localhost:7272/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        alert("an error occured");
      } else {
        userCtx?.login(email, password);
        navigate("/");
      }
    } catch (e) {
      alert(e);
    }

    setEmail("");
    setPassword("");
    // setError("Please fill the field");
  };

  return (
    <form className="w-full flex flex-col items-center p-3 gap-2">
      <h1 className="mb-5 text-2xl font-bold">Login</h1>
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

export default LoginPage;
