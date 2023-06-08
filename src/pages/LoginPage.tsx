import React, { useContext, useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import UserContext, { User } from "../store/user-context";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>();

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    const item = {
      email,
      password,
    };

    try {
      const res = await fetch("https://localhost:7272/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (res.ok) {
        type ResponeType = { token: string; user: User };
        const data: ResponeType = await res.json();
        userCtx.login(data.token, data.user);
        navigate("/");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (e) {
      alert("An error occured!");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <form className="w-full flex flex-col items-center p-3 gap-2">
      <h1 className="mb-5 text-2xl font-bold">Login</h1>
      <Input
        type="email"
        name="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        type="password"
        name="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {error && <p className="text-sm text-red-400 font-semibold">{error}</p>}
      <Button type="submit" name="Submit" onClick={onClickHandler} />
    </form>
  );
};

export default LoginPage;
