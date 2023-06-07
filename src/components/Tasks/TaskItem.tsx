import React from "react";
import Card from "../UI/Card";
import { useDrag } from "react-dnd";
import { Task } from "./TaskGrid";

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

  return (
    <div ref={drag}>
      <Card>
        <h1 className="font-bold text-lg mb-3">{task.title}</h1>
        <div className="flex flex-row flex-wrap gap-2">
          <div className="bg-red-400 rounded-md px-2 py-1">
            <p className="text-white text-sm font-semibold select-none cursor-default">
              High
            </p>
          </div>
          <div className="bg-blue-400 rounded-md px-2 py-1">
            <p className="text-white text-sm font-semibold select-none cursor-default">
              Medium
            </p>
          </div>
          <div className="bg-yellow-400 rounded-md px-2 py-1">
            <p className="text-white text-sm font-semibold select-none cursor-default">
              Low
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskItem;
