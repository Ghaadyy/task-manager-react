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

  // const addInputRef = useRef<HTMLInputElement>();

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

  // const [tags, setTags] = useState<any[]>([]);

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
      {/* <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTags((prevTags) => prevTags.concat(addInputRef.current?.value));
          }}
          className="flex flex-row items-center border-2 rounded-lg px-1"
        >
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Add column"
            ref={addInputRef as React.LegacyRef<HTMLInputElement>}
          />
          <p className="font-bold text-lg">+</p>
        </form>
      </div> */}
    </div>
  );
};

export default TaskGrid;
