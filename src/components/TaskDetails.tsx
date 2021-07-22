import React, { ReactElement, useContext, useEffect, useState } from "react";
import { formatDate } from "../utils/utils";
import { Context } from "../store/Store";
import { ContextType, Task, Swimlane } from "../types";
import InlineInputEdit from "./InlineInputEdit";

interface Props {
  task: Task;
}

export default function TaskDetails({ task }: Props): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);
  const [swimlanes, setSwimlanes] = useState<Swimlane[]>([]);

  function updateTask(data: Task) {
    dispatch({
      type: "updateTask",
      data: {
        ...data,
        updatedAt: new Date().toISOString()
      }
    });
  }

  function getSwimLanes(): void {
    const temp = state.swimlanes.filter(
      (i) => i.boardId === state.app.currentBoard
    );
    setSwimlanes(temp);
  }

  function handleSwimLaneMovement(e: any) {
    const swimlaneId = swimlanes[e.target.selectedIndex].id;
    updateTask({ ...task, swimlaneId });
  }

  useEffect(() => {
    getSwimLanes();
  }, []);

  return (
    <div className="task-details">
      <div className="task-main-bar">
        <h3 className="heading">
          <i className="fas fa-caret-square-right"></i>
          <span className="title">
            <InlineInputEdit
              emit={(e) => updateTask({ ...task, name: e })}
              defaultValue={task.name}
            />
          </span>
        </h3>
        <div className="desc field">
          <div className="label">
            <i className="fas fa-align-left"></i> Description:
          </div>
          <InlineInputEdit
            type="textarea"
            placeholder="Enter description"
            defaultValue={task.desc}
            emit={(e) => updateTask({ ...task, desc: e })}
          />
        </div>

        <div className="checklists-wrap field">
          <div className="label">
            <i className="fas fa-check-square"></i> Checklist:
          </div>
          {/* Checklists  */}
        </div>
      </div>
      <div className="task-sidebar">
        <div className="field">
          <div className="label">
            <i className="fas fa-calendar-day"></i> Created At:
          </div>
          <div>{formatDate(task.createdAt)}</div>
        </div>
        {task.updatedAt && (
          <div className="field">
            <div className="label">
              <i className="fas fa-calendar-day"></i> Updated At:
            </div>
            <div>{formatDate(task.updatedAt)}</div>
          </div>
        )}
        <div className="field">
          <form className="form-aligned" onSubmit={(e) => e.preventDefault()}>
            <label className="label">
              <i className="fas fa-map-signs"></i> Move to:
            </label>
            {task.swimlaneId}
            <select
              // defaultValue={task.swimlaneId} not working
              onChange={handleSwimLaneMovement}
            >
              {swimlanes.map((swimlane: Swimlane) => (
                <option
                  key={swimlane.id}
                  value={swimlane.id}
                  id={swimlane.id.toString()}
                  selected={task.swimlaneId === swimlane.id}
                >
                  {swimlane.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
    </div>
  );
}
