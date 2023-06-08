import React from "react";
import TaskGrid from "../components/Tasks/TaskGrid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TasksPage = () => {
  return (
    <div className="flex items-center justify-center">
      <DndProvider backend={HTML5Backend}>
        <TaskGrid />
      </DndProvider>
    </div>
  );
};

export default TasksPage;
