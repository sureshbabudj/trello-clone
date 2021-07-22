import React, { ReactElement, useContext, useState } from "react";
import { getRandomId } from "../utils/utils";
import { Context } from "../store/Store";
import { Board, ContextType } from "../types";
import InlineInputEdit from "./InlineInputEdit";
import Actions from "./Actions";

export default function Boards(props: any): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);
  const [showAddBoard, setShowAddBoard] = useState(false);
  const actions = ["View Board", "Remove"];

  function addBoard(name: string) {
    dispatch({
      type: "addBoard",
      data: {
        id: getRandomId(),
        name,
        createdAt: new Date().toISOString()
      }
    });
    setShowAddBoard(false);
  }

  function updateBoard(board: Board) {
    dispatch({
      type: "updateBoard",
      data: {
        ...board,
        updatedAt: new Date().toISOString()
      }
    });
  }

  function handleAction(e: string, board: Board) {
    if (e === actions[0]) {
      viewDetails(board);
    } else if (e === actions[1]) {
      removeTask(board);
    }
  }

  function viewDetails(board: Board) {
    dispatch({ type: "setCurrentBoard", data: board });
    props.closeModal();
  }

  function removeTask(board: Board) {
    dispatch({ type: "removeBoard", data: board });
  }
  return (
    <div className="boards">
      <table className="boards-list table-fill" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Favorite</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.boards.map((board) => (
            <tr key={board.id}>
              <td width={"90%"}>{board.name}</td>
              <td className="text-center ">
                {board.isFavorite ? (
                  <i
                    className="fas fa-heart fav"
                    onClick={() => updateBoard({ ...board, isFavorite: false })}
                  ></i>
                ) : (
                  <i
                    className="far fa-heart"
                    onClick={() => updateBoard({ ...board, isFavorite: true })}
                  ></i>
                )}
              </td>
              <td className="text-center ">
                <Actions
                  items={actions}
                  onSelected={(e) => handleAction(e, board)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="add-board">
              {!showAddBoard ? (
                <button
                  className="button button-small button-primary"
                  onClick={() => setShowAddBoard(true)}
                >
                  Add Board <i className="fas fa-plus"></i>
                </button>
              ) : (
                <div className="add-flow-wrap">
                  <InlineInputEdit emit={(e) => addBoard(e)} />
                  <button
                    className="button button-small button-secondary button-secondary-outlined"
                    onClick={() => setShowAddBoard(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
