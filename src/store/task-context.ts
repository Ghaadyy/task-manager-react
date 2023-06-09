import { createContext } from "react";
import { Task } from "../Models/Task";

export type TaskContextType = {
  tasks: Task[];
  createTask: (task: Task) => void;
  getTasks: (tasks: Task[]) => void;
  updateTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  createTask: (task) => {},
  getTasks: (tasks) => {},
  updateTask: (task) => {},
  deleteTask: (task) => {},
});

export default TaskContext;