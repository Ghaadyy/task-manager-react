import React from "react";
import Card from "../UI/Card";
import { useDrag } from "react-dnd";
import { Task, TaskPriority } from "../../Models/Task";

type Props = {
  task: Task;
};

export const ItemTypes = {
  CARD: "card",
};

const TaskItem: React.FC<Props> = ({ task }) => {
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

  return (
    <div ref={drag}>
      <Card>
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
