import { useContext, useEffect } from "react";
import { TaskStatus } from "../../models/Task";
import UserContext from "../../store/user-context";
import TaskContext from "../../store/task-context";
import { useCreateDropRef } from "../../hooks/createDropRef";
import TaskColumn from "./TaskColumn";
import { toastError } from "../Layout/RootLayout";

const TaskGrid = () => {
  const taskCtx = useContext(TaskContext);
  const userCtx = useContext(UserContext);

  const todoDropRef = useCreateDropRef(TaskStatus.Todo);
  const inProgressDropRef = useCreateDropRef(TaskStatus.InProgess);
  const completedDropRef = useCreateDropRef(TaskStatus.Completed);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/tasks/user/${userCtx.user?.id}`,
      {
        headers: {
          Authorization: `Bearer ${userCtx.token}`,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        taskCtx.getTasks(data);
      })
      .catch((e) => toastError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todoTasks = taskCtx.tasks.filter(
    (task) => task.status === TaskStatus.Todo
  );

  const inProgressTasks = taskCtx.tasks.filter(
    (task) => task.status === TaskStatus.InProgess
  );
  const completedTasks = taskCtx.tasks.filter(
    (task) => task.status === TaskStatus.Completed
  );

  return (
    <div className="flex flex-row gap-8 overflow-x-scroll px-8 py-4 max-h-[90vh] overflow-y-scroll">
      <TaskColumn ref={todoDropRef} text="To do" tasks={todoTasks} />
      <TaskColumn
        ref={inProgressDropRef}
        text="In progress"
        tasks={inProgressTasks}
      />
      <TaskColumn
        ref={completedDropRef}
        text="Completed"
        tasks={completedTasks}
      />
    </div>
  );
};

export default TaskGrid;
