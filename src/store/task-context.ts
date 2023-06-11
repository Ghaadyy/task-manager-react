import { createContext } from "react";
import { Task } from "../models/Task";

export type TaskContextType = {
  tasks: Task[];
  createTask: (task: Task) => void;
  getTasks: (tasks: Task[]) => void;
  updateStatus: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  createTask: (task) => {},
  getTasks: (tasks) => {},
  updateStatus: (task) => {},
  updateTask: (task) => {},
  deleteTask: (task) => {},
});

export default TaskContext;
