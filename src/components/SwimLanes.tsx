import React, { ReactElement, useContext, useEffect, useState } from "react";
import { compare, getRandomId } from "../utils/utils";
import { Context } from "../store/Store";
import { Board, ContextType, Swimlane as SwimlaneType } from "../types";
import InlineInputEdit from "./InlineInputEdit";
import Swimlane from "./Swimlane";

interface Props {
  board: Board;
}

export default function SwimLanes({ board }: Props): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);
  const [swimlanes, setSwimlanes] = useState<SwimlaneType[]>([]);
  const [showAddSwimLane, setShowAddSwimLane] = useState(false);

  useEffect(() => {
    getSwimLanes();
  }, [board, state]);

  function getSwimLanes(): void {
    const temp = state.swimlanes.filter((i) => i.boardId === board.id);
    temp.map((i, index) => (i.order = i.order || index));
    temp.sort(compare);
    setSwimlanes(temp);
  }

  function addSwimlane(name: string) {
    const data: SwimlaneType = {
      id: getRandomId(),
      name,
      boardId: board.id,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: "addSwimlane", data });
    setShowAddSwimLane(false);
  }

  return (
    <>
      <section className="lists-container">
        {swimlanes.map((swimlane) => (
          <Swimlane key={swimlane.id} swimlane={swimlane} />
        ))}
        {!showAddSwimLane ? (
          <button
            className="add-list-btn btn"
            onClick={() => setShowAddSwimLane(true)}
          >
            Add a list
          </button>
        ) : (
          <div className="add-flow-wrap">
            <InlineInputEdit emit={(e) => addSwimlane(e)} />
            <button
              className="button button-small button-secondary button-secondary-outlined"
              onClick={() => setShowAddSwimLane(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
