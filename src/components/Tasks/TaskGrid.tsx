import { useContext, useEffect } from "react";
import { TaskStatus } from "../../Models/Task";
import UserContext from "../../store/user-context";
import TaskContext from "../../store/task-context";
import { useCreateDropRef } from "../../hooks/createDropRef";
import TaskColumn from "./TaskColumn";

const TaskGrid = () => {
  const taskCtx = useContext(TaskContext);
  const userCtx = useContext(UserContext);

  const todoDropRef = useCreateDropRef(TaskStatus.Todo);
  const inProgressDropRef = useCreateDropRef(TaskStatus.InProgess);
  const completedDropRef = useCreateDropRef(TaskStatus.Completed);

  useEffect(() => {
    fetch(`https://localhost:7272/api/tasks/user/${userCtx.user?.id}`, {
      headers: {
        Authorization: `Bearer ${userCtx.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        taskCtx.getTasks(data);
      })
      .catch((e) => console.log(e));
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
        text="To do"
        tasks={inProgressTasks}
      />
      <TaskColumn ref={completedDropRef} text="To do" tasks={completedTasks} />
    </div>
  );
};

export default TaskGrid;
