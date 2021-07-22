import React, { ReactElement, useContext, useEffect, useState } from "react";
import { getRandomId } from "../utils/utils";
import { Context } from "../store/Store";
import { Board, ContextType } from "../types";
import InlineInputEdit from "./InlineInputEdit";

interface Props {}

export default function Board({}: Props): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);

  const [board, setBoard] = useState<undefined | Board>(selectCurrentBoard());

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

  function selectCurrentBoard(): Board | undefined {
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
  }, [state.app.currentBoard]);
  return (
    <>
      {/*Board info bar */}
      <section className="board-info-bar">
        <div className="board-controls">
          <button className="board-title btn">
            <h2 className="board-name">
              <InlineInputEdit
                emit={(e) => updateOrAddBoard(e)}
                defaultValue={board?.name}
              />
            </h2>
          </button>

          <button className="star-btn btn" aria-label="Star Board">
            <i className="far fa-star" aria-hidden="true"></i>
          </button>

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
    </>
  );
}
