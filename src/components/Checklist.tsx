import React, { ReactElement, useContext } from "react";
import { Context } from "../store/Store";
import { Checklist, ContextType } from "../types";
import Actions from "./Actions";
import InlineInputEdit from "./InlineInputEdit";

interface Props {
  checklist: Checklist;
}

export default function Checklist({ checklist }: Props): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);
  const actions = ["View Details", "Delete"];

  function updateChecklist(data: Checklist) {
    dispatch({
      type: "updateChecklist",
      data
    });
  }

  function handleAction(e: string) {
    if (e === actions[0]) {
      viewDetails();
    } else if (e === actions[1]) {
      removeTask();
    }
  }

  function viewDetails() {
    console.log("view details");
  }

  function removeTask() {
    dispatch({ type: "removeChecklist", data: checklist });
  }

  return (
    <>
      <label htmlFor={checklist.id.toString()} className="status-checkbox">
        <input
          defaultChecked={checklist.status}
          onChange={() => updateChecklist({ ...checklist, status: !status })}
          type="checkbox"
          name={checklist.id.toString()}
          id={checklist.id.toString()}
        />
      </label>
      <InlineInputEdit
        defaultValue={checklist.name}
        emit={(e) => updateChecklist({ ...checklist, name: e })}
      />
      <Actions items={actions} onSelected={(e) => handleAction(e)} />
    </>
  );
}
