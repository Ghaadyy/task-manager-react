import React, { useState } from "react";
import TaskContext, { TaskContextType } from "../store/task-context";
import { Task } from "../Models/Task";

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const defaultState: TaskContextType = {
    tasks,
    createTask: (task) => {
      setTasks((prevTasks) => prevTasks.concat(task));
    },
    getTasks: (tasks) => {
      setTasks(tasks);
    },
    updateTask: (task) => {
      setTasks(
        (prevTasks) => {
          let t = prevTasks.filter((prevTask) => prevTask.id !== task.id);
          t.push(task);
          return t;
        }
        // prevTasks.map((prevTask) => (prevTask.id !== task.id ? prevTask : task))
      );
    },
    deleteTask: (task) => {
      setTasks((prevTasks) =>
        prevTasks.filter((prevTask) => prevTask.id !== task.id)
      );
    },
  };

  return (
    <TaskContext.Provider value={defaultState}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
