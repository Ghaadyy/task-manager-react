import React, { useContext, useEffect, useState } from "react";
import TaskItem, { ItemTypes } from "./TaskItem";
import { useDrop } from "react-dnd";
import Card from "../UI/Card";
import { TaskStatus, Task } from "../../Models/Task";
import UserContext from "../../store/user-context";

const TaskGrid = () => {
  const userCtx = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [, todoDropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: Task, monitor) => {
      item.status = TaskStatus.Todo;
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === item.id) {
            return item;
          }
          return task;
        });
      });
    },
  }));

  const [, inProgressDropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: Task, monitor) => {
      item.status = TaskStatus.InProgess;
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === item.id) {
            return item;
          }
          return task;
        });
      });
    },
  }));

  const [, completedDropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: Task, monitor) => {
      item.status = TaskStatus.Completed;
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === item.id) {
            return item;
          }
          return task;
        });
      });
    },
  }));

  useEffect(() => {
    fetch(`https://localhost:7272/api/tasks/user/${userCtx.user?.id}`, {
      headers: {
        Authorization: `Bearer ${userCtx.token}`,
      },
    })
      .then(async (res) => setTasks(await res.json()))
      .catch((e) => console.log(e));
  }, [userCtx.token, userCtx.user?.id]);

  const todoTasks = tasks?.filter((task) => task.status === TaskStatus.Todo);

  const inProgressTasks = tasks?.filter(
    (task) => task.status === TaskStatus.InProgess
  );
  const completedTasks = tasks?.filter(
    (task) => task.status === TaskStatus.Completed
  );

  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl">To do</h1>
        {todoTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <div ref={todoDropRef}>
          <Card isMoveable={false}>
            <div className="m-auto text-[#a1a1a1]">Drop task here</div>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl">In Progress</h1>
        {inProgressTasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <div ref={inProgressDropRef}>
          <Card isMoveable={false}>
            <div className="m-auto text-[#a1a1a1]">Drop task here</div>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl">Completed</h1>
        {completedTasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <div ref={completedDropRef}>
          <Card isMoveable={false}>
            <div className="m-auto text-[#a1a1a1]">Drop task here</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskGrid;
