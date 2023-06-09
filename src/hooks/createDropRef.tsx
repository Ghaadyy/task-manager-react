import { useDrop } from "react-dnd";
import { ItemTypes } from "../components/Tasks/TaskItem";
import { Task, TaskStatus } from "../Models/Task";
import { useContext } from "react";
import TaskContext from "../store/task-context";
import UserContext from "../store/user-context";

const updateTask = (task: Task, token: string | null, status: TaskStatus) => {
  fetch("https://localhost:7272/api/tasks", {
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
