import React, { useContext, useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import UserContext from "../store/user-context";
import Select from "../components/UI/Select";
import { toastError, toastSuccess } from "../components/Layout/RootLayout";

const CreateTaskPage = () => {
  const userCtx = useContext(UserContext);
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
      toastSuccess("Successfully added task!");
    } else {
      const data = await res.json();
      toastError(data.message);
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
      <Select
        name="priority"
        onChange={(e) => setPriority(Number.parseInt(e.target.value))}
      >
        <option selected={true} disabled>
          Choose a priority
        </option>
        <option value={0}>Low</option>
        <option value={1}>Medium</option>
        <option value={2}>High</option>
      </Select>
      <Select
        name="status"
        onChange={(e) => setStatus(Number.parseInt(e.target.value))}
      >
        <option selected={true} disabled>
          Choose a status
        </option>
        <option value={0}>Todo</option>
        <option value={1}>In Progress</option>
        <option value={2}>Completed</option>
      </Select>
      <Button type="submit" name="Submit" onClick={onClickHandler} />
    </form>
  );
};

export default CreateTaskPage;
