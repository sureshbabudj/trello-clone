import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  ContextType,
  Task as TaskType,
  Checklist as ChecklistType
} from "../types";
import { Context } from "../store/Store";
import InlineInputEdit from "./InlineInputEdit";
import { getRandomId } from "../utils/utils";
import Checklist from "./Checklist";

interface Props {
  task: TaskType;
}

export default function Checklists({ task }: Props): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);
  const [checklists, setChecklists] = useState<ChecklistType[]>([]);
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  useEffect(() => {
    getChecklist();
  }, [state]);

  function getChecklist(): void {
    const temp = state.checklists.filter((i) => i.taskId === task.id);
    setChecklists(temp);
  }

  function addChecklist(name: string) {
    const data: ChecklistType = {
      id: getRandomId(),
      name,
      taskId: task.id,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: "addChecklist", data });
    setShowAddChecklist(false);
  }

  return (
    <ul className="checklists">
      {checklists.map((checklist) => (
        <li className="checklist" key={checklist.id}>
          <Checklist checklist={checklist} />
        </li>
      ))}

      <li>
        {!showAddChecklist ? (
          <button
            className="button button-small button-primary"
            onClick={() => setShowAddChecklist(true)}
          >
            Add Checklist <i className="fas fa-plus"></i>
          </button>
        ) : (
          <div className="add-flow-wrap">
            <InlineInputEdit emit={(e) => addChecklist(e)} />
            <button
              className="button button-small button-secondary button-secondary-outlined"
              onClick={() => setShowAddChecklist(false)}
            >
              <i className="fas fa-ban"></i>
            </button>
          </div>
        )}
      </li>
    </ul>
  );
}
