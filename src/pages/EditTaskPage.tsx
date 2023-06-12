import React, { useContext, useEffect, useState } from "react";
import Input from "../components/UI/Input";
import { Task, TaskPriority, TaskStatus } from "../models/Task";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../store/user-context";
import Button from "../components/UI/Button";
import TaskContext from "../store/task-context";
import Select from "../components/UI/Select";
import { toastError, toastSuccess } from "../components/Layout/RootLayout";

const EditTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const taskCtx = useContext(TaskContext);
  const userCtx = useContext(UserContext);

  const [title, setTitle] = useState<string>();
  const [priority, setPriority] = useState<TaskPriority>();
  const [status, setStatus] = useState<TaskStatus>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${userCtx.token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data: Task = await res.json();
          setTitle(data.title);
          setStatus(data.status);
          setPriority(data.priority);
        }
      })
      .catch((e) => console.log(e));
  }, [id, userCtx.token, navigate]);

  const submitHandler: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const item = {
      title,
      priority,
      status,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCtx.token}`,
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        taskCtx.updateTask({
          title: title as string,
          id: id as string,
          status: status as TaskStatus,
          priority: priority as TaskPriority,
        });
        toastSuccess("Successfully edited task!");
      })
      .catch(() => toastError());
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex flex-col items-center p-3 gap-2"
    >
      <h1 className="mb-5 text-2xl font-bold">Edit your task</h1>
      <Input
        type="text"
        name="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Select
        name="priority"
        value={priority}
        onChange={(e) => setPriority(Number.parseInt(e.target.value))}
      >
        <option value={0}>Low</option>
        <option value={1}>Medium</option>
        <option value={2}>High</option>
      </Select>
      <Select
        name="status"
        value={status}
        onChange={(e) => setStatus(Number.parseInt(e.target.value))}
      >
        <option value={0}>Todo</option>
        <option value={1}>In Progress</option>
        <option value={2}>Completed</option>
      </Select>
      <Button type="submit" name="Submit" />
    </form>
  );
};

export default EditTaskPage;
