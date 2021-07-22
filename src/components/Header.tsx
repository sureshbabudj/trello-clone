import React, { ReactElement, useState } from "react";
import Boards from "./Boards";
import Modal from "./Modal";

interface Props {}

export default function Header({}: Props): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Masthead */}
      <header className="masthead">
        <div className="boards-menu">
          <button className="boards-btn btn" onClick={() => setModalOpen(true)}>
            <i className="fab fa-trello boards-btn-icon"></i>Boards
          </button>

          <div className="board-search">
            <input
              type="search"
              className="board-search-input"
              aria-label="Board Search"
            />
            <i className="fas fa-search search-icon" aria-hidden="true"></i>
          </div>
        </div>

        <div className="logo">
          <h1>
            <i className="fab fa-trello logo-icon" aria-hidden="true"></i>Trello
          </h1>
        </div>

        <div className="user-settings">
          <button className="user-settings-btn btn" aria-label="Create">
            <i className="fas fa-plus" aria-hidden="true"></i>
          </button>

          <button className="user-settings-btn btn" aria-label="Information">
            <i className="fas fa-info-circle" aria-hidden="true"></i>
          </button>

          <button className="user-settings-btn btn" aria-label="Notifications">
            <i className="fas fa-bell" aria-hidden="true"></i>
          </button>

          <button className="user-settings-btn btn" aria-label="User Settings">
            <i className="fas fa-user-circle" aria-hidden="true"></i>
          </button>
        </div>
      </header>
      {/*End of masthead */}

      <Modal
        id="task-details"
        title="Boards"
        open={modalOpen}
        closeModal={() => setModalOpen(false)}
      >
        <Boards />
      </Modal>
    </>
  );
}
