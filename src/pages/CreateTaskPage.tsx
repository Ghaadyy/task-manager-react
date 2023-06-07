import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<number>();
  const [status, setStatus] = useState<number>();

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    const item = {
      title,
      priority,
      status,
    };

    const res = await fetch("https://localhost:7272/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      alert("an error occured");
    } else {
      navigate("/tasks");
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
        className=""
        placeholder="Priority"
        onChange={(e) => setPriority(Number.parseInt(e.target.value))}
      >
        <option value={0}>Low</option>
        <option value={1}>Medium</option>
        <option value={2}>High</option>
      </select>
      <select
        className=""
        placeholder="Status"
        onChange={(e) => setStatus(Number.parseInt(e.target.value))}
      >
        <option value={0}>Todo</option>
        <option value={1}>In Progress</option>
        <option value={2}>Completed</option>
      </select>
      <Button type="submit" name="Submit" onClick={onClickHandler} />
    </form>
  );
};

export default CreateTaskPage;
