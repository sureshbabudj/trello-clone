import React, { ReactElement, useContext, useEffect, useState } from "react";
import { getRandomId } from "../utils/utils";
import { Context } from "../store/Store";
import { Board as BoardType, ContextType } from "../types";
import InlineInputEdit from "./InlineInputEdit";
import SwimLanes from "./SwimLanes";

export default function Board(): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);

  const [board, setBoard] = useState<undefined | BoardType>(
    selectCurrentBoard()
  );

  function updateOrAddBoard(val: string) {
    if (!val) {
      return;
    }
    let boardId, type, lifecyle;
    if (board) {
      boardId = board.id;
      type = "updateBoard";
      lifecyle = { updatedAt: new Date().toISOString() };
    } else {
      boardId = getRandomId();
      type = "addBoard";
      lifecyle = { createdAt: new Date().toISOString() };
    }

    dispatch({
      type,
      data: {
        id: boardId,
        name: val,
        ...lifecyle
      }
    });
  }

  function updateBoard(board: BoardType) {
    dispatch({
      type: "updateBoard",
      data: {
        ...board,
        updatedAt: new Date().toISOString()
      }
    });
  }

  function selectCurrentBoard(): BoardType | undefined {
    const currentBoardId = state.app.currentBoard;
    let currentBoard;
    if (currentBoardId) {
      currentBoard = state.boards.find((i) => i.id === currentBoardId);
    }
    if (!currentBoard && state.boards.length) {
      currentBoard = state.boards[state.boards.length - 1];
      dispatch({ type: "setCurrentBoard", data: currentBoard });
    }
    return currentBoard;
  }

  useEffect(() => {
    const board = state.boards.find((i) => i.id === state.app.currentBoard);
    if (board) {
      setBoard(board);
    }
  }, [state.app.currentBoard, board]);
  return (
    <>
      {/*Board info bar */}
      <section className="board-info-bar">
        <div className="board-controls">
          <button className="board-title btn">
            <h2 className="board-name">
              <InlineInputEdit
                placeholder={
                  !board ? "Enter New Board Name" : "update Board name"
                }
                emit={(e) => updateOrAddBoard(e)}
                defaultValue={board?.name}
              />
            </h2>
          </button>

          {board && (
            <button
              className="star-btn btn"
              aria-label="Star Board"
              onClick={() =>
                updateBoard({
                  ...board,
                  isFavorite: board.isFavorite ? false : true
                })
              }
            >
              <i
                className={`fa-star ${board.isFavorite ? "fas" : "fa"}`}
                aria-hidden="true"
              ></i>
            </button>
          )}

          <button className="personal-btn btn">Personal</button>

          <button className="private-btn btn">
            <i
              className="fas fa-briefcase private-btn-icon"
              aria-hidden="true"
            ></i>
            Private
          </button>
        </div>

        <button className="menu-btn btn">
          <i className="fas fa-ellipsis-h menu-btn-icon" aria-hidden="true"></i>
          Show Menu
        </button>
      </section>

      {/*End of board info bar */}

      {board && <SwimLanes board={board} />}
    </>
  );
}
