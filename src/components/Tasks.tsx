import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ContextType, Task as TaskType, Swimlane } from "../types";
import { Context } from "../store/Store";
import InlineInputEdit from "./InlineInputEdit";
import { getRandomId } from "../utils/utils";
import Task from "./Task";

interface Props {
  swimlane: Swimlane;
}

export default function Tasks({ swimlane }: Props): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    getTasks();
  }, [state]);

  function getTasks(): void {
    const temp = state.tasks.filter((i) => i.swimlaneId === swimlane.id);
    setTasks(temp);
  }

  function addTask(name: string) {
    const data: TaskType = {
      id: getRandomId(),
      name,
      swimlaneId: swimlane.id,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: "addTask", data });
    setShowAddTask(false);
  }

  return (
    <>
      <ul className="list-items">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        {!showAddTask ? (
          <button
            className="add-card-btn btn"
            onClick={() => setShowAddTask(true)}
          >
            Add a card
          </button>
        ) : (
          <div className="add-flow-wrap">
            <InlineInputEdit emit={(e) => addTask(e)} />
            <button
              className="button button-small button-secondary button-secondary-outlined"
              onClick={() => setShowAddTask(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
      </ul>
    </>
  );
}
