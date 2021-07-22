export interface Store {
  boards: Board[];
  swimlanes: Swimlane[];
  tasks: Task[];
  checklists: Checklist[];
  app: Obj;
}

export interface Obj {
  [key: string]: any;
}

export interface Board {
  id: number;
  name: string;
  desc?: string;
  createdAt: string;
  updatedAt?: string;
  isFavorite?: boolean;
}

export interface Swimlane {
  id: number;
  name: string;
  desc?: string;
  boardId: number;
  createdAt: string;
  updatedAt?: string;
  order?: number;
}

export interface Task {
  id: number;
  name: string;
  desc?: string;
  swimlaneId: number;
  label?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Checklist {
  id: number;
  name: string;
  desc?: string;
  status?: boolean;
  taskId: number;
  createdAt: string;
  updatedAt?: string;
}

export type ContextType = {
  state: Store;
  dispatch: any;
};
