import React, { useContext, useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/user-context";

const CreateTaskPage = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<number>();
  const [status, setStatus] = useState<number>();

  const [error, setError] = useState<string>();

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    const item = {
      title,
      priority,
      status,
      userID: userCtx.user?.id,
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCtx.token}`,
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      navigate("/tasks");
    } else {
      const data = await res.json();
      setError(data.message);
    }

    setTitle("");
    setPriority(undefined);
    setStatus(undefined);
  };

  return (
    <form className="w-full flex flex-col items-center p-3 gap-2">
      <h1 className="mb-5 text-2xl font-bold">Create a new Task</h1>
      <Input
        type="text"
        name="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <select
        name="priority"
        className="max-w-[250px] w-full border-2 rounded-lg p-3 outline-none focus:border-[#979797]"
        onChange={(e) => setPriority(Number.parseInt(e.target.value))}
      >
        <option selected={true} disabled>
          Choose a priority
        </option>
        <option value={0}>Low</option>
        <option value={1}>Medium</option>
        <option value={2}>High</option>
      </select>
      <select
        name="status"
        className="max-w-[250px] w-full border-2 rounded-lg p-3 outline-none focus:border-[#979797]"
        onChange={(e) => setStatus(Number.parseInt(e.target.value))}
      >
        <option selected={true} disabled>
          Choose a status
        </option>
        <option value={0}>Todo</option>
        <option value={1}>In Progress</option>
        <option value={2}>Completed</option>
      </select>
      {/* <Input
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      /> */}
      {error && <p className="text-sm text-red-400 font-semibold">{error}</p>}
      <Button type="submit" name="Submit" onClick={onClickHandler} />
    </form>
  );
};

export default CreateTaskPage;
