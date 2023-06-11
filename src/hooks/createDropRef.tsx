import { useDrop } from "react-dnd";
import { ItemTypes } from "../components/Tasks/TaskItem";
import { Task, TaskStatus } from "../models/Task";
import { useContext } from "react";
import TaskContext from "../store/task-context";
import UserContext from "../store/user-context";
import { toastError } from "../components/Layout/RootLayout";

const updateTask = async (
  task: Task,
  token: string | null,
  status: TaskStatus
) => {
  try {
    await fetch("https://localhost:7272/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        taskID: task.id,
        status,
      }),
    });
  } catch {
    toastError("An error occured!");
  }
};

export const useCreateDropRef = (status: TaskStatus) => {
  const taskCtx = useContext(TaskContext);
  const userCtx = useContext(UserContext);

  const [, ref] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: Task) => {
      item.status = status;

      updateTask(item, userCtx.token, status);
      taskCtx.updateStatus(item);
    },
  }));

  return ref;
};
