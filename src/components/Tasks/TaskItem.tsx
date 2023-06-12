import React, { useContext, useState } from "react";
import Card from "../UI/Card";
import { useDrag } from "react-dnd";
import { Task, TaskPriority } from "../../models/Task";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/user-context";
import TaskContext from "../../store/task-context";
import { toastError, toastSuccess } from "../Layout/RootLayout";

type Props = {
  task: Task;
};

export const ItemTypes = {
  CARD: "card",
};

const TaskItem: React.FC<Props> = ({ task }) => {
  const taskCtx = useContext(TaskContext);
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [isHover, setIsHover] = useState<boolean>(false);

  const [, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  let priorityTagName: string;
  let priorityTagColor: string;

  if (task.priority === TaskPriority.High) {
    priorityTagName = "High";
    priorityTagColor = "bg-red-400";
  } else if (task.priority === TaskPriority.Medium) {
    priorityTagName = "Medium";
    priorityTagColor = "bg-blue-400";
  } else {
    priorityTagName = "Low";
    priorityTagColor = "bg-yellow-400";
  }

  const deleteHandler = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userCtx.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          taskCtx.deleteTask(task);
          toastSuccess("Successfully deleted task!");
        } else toastError();
      })
      .catch((e) => {
        toastError();
      });
  };

  return (
    <div
      ref={drag}
      className="relative"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div
        onClick={deleteHandler}
        className={`${
          isHover ? "opacity-100" : "opacity-0"
        } cursor-pointer h-7 w-7 bg-red-500 rounded-lg absolute right-0 mt-[-10px] mr-[-10px] flex items-center justify-center text-white font-bold transition-all duration-200 ease-in-out`}
      >
        X
      </div>
      <Card
        onClick={() => navigate(`/edit-task/${task.id}`)}
        className="cursor-pointer"
      >
        <h1 className="font-bold text-lg mb-3">{task.title}</h1>
        <div className="flex flex-row flex-wrap gap-2">
          <div className={`${priorityTagColor} rounded-md px-2 py-1`}>
            <p className="text-white text-sm font-semibold select-none cursor-default">
              {priorityTagName}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskItem;
