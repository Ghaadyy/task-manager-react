import React, { useContext, useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import UserContext, { User } from "../store/user-context";
import { useNavigate } from "react-router-dom";
import { toastError } from "../components/Layout/RootLayout";

const SignUpPage: React.FC = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>();

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    const user = {
      email,
      password,
      firstName,
      lastName,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
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
  };

  return (
    <form className="w-full flex flex-col items-center p-3 gap-2">
      <h1 className="mb-5 text-2xl font-bold">SignUp</h1>
      <Input
        type="text"
        name="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <Input
        type="text"
        name="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
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

export default SignUpPage;
