import React, { forwardRef } from "react";
import TaskItem from "./TaskItem";
import { Task } from "../../Models/Task";
import Card from "../UI/Card";

type Props = {
  tasks: Task[];
  text: string;
};

const TaskColumn = forwardRef(
  ({ tasks, text }: Props, ref: React.LegacyRef<HTMLDivElement>) => {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl">{text}</h1>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <div ref={ref}>
          <Card isMoveable={false}>
            <div className="m-auto text-[#a1a1a1]">Drop task here</div>
          </Card>
        </div>
      </div>
    );
  }
);

export default TaskColumn;
