import React from "react";
import TaskGrid from "../components/Tasks/TaskGrid";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

const TasksPage = () => {
  return (
    <div className="flex items-center justify-center">
      <DndProvider options={HTML5toTouch}>
        <TaskGrid />
      </DndProvider>
    </div>
  );
};

export default TasksPage;
