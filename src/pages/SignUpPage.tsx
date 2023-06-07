import React, { useContext, useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import UserContext, { User } from "../store/user-context";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error] = useState<string | undefined>(undefined);

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
      const res = await fetch("https://localhost:7272/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        type ResponeType = { token: string; user: User };
        const data: ResponeType = await res.json();
        userCtx.login(data.token, data.user);
        navigate("/");
      } else {
        console.log(res);
        alert("Bad request, try another email!");
      }
    } catch (e) {
      alert("An error occured!");
    }

    // setError("Please fill the field");
  };

  return (
    <form className="w-full flex flex-col items-center p-3 gap-2">
      <h1 className="mb-5 text-2xl font-bold">SignUp</h1>
      <Input
        type="text"
        name="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        error={error}
      />
      <Input
        type="text"
        name="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        error={error}
      />
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
