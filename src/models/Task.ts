export enum TaskStatus {
  Todo,
  InProgess,
  Completed,
}

export enum TaskPriority {
  Low,
  Medium,
  High,
}

export type Task = {
  title: string;
  id: string;
  status: TaskStatus;
  priority: TaskPriority;
};
