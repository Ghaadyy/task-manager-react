import React, { useContext, useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import UserContext from "../store/user-context";
import { useNavigate } from "react-router-dom";
import { toastError } from "../components/Layout/RootLayout";
import { User } from "../models/User";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const item = {
      email,
      password,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (res.ok) {
        type ResponeType = { token: string; user: User };
        const data: ResponeType = await res.json();
        userCtx.login(data.token, data.user);
        navigate("/tasks");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch {
      toastError();
    }

    setEmail("");
    setPassword("");
    setIsLoading(false);
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
      <Button
        type="submit"
        name="Submit"
        onClick={onClickHandler}
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginPage;
