import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Context } from "../store/Store";
import { ContextType, Task as TaskType } from "../types";
import Actions from "./Actions";
import InlineInputEdit from "./InlineInputEdit";
import Modal from "./Modal";

interface Props {
  task: TaskType;
}

function Task({ task }: Props): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const actions = ["View Details", "Delete"];
  const taskNode = useRef<HTMLLIElement>(null);
  const [classes, setClasses] = useState(["task"]);

  function updateTask(name: string) {
    dispatch({
      type: "updateTask",
      data: {
        ...task,
        name,
        updatedAt: new Date().toISOString()
      }
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
    setModalOpen(true);
  }

  function removeTask() {
    dispatch({ type: "removeTask", data: task });
  }

  function dragStart(e: any) {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", task.id);
    setTimeout(() => {
      setClasses(["task drag-hidden"]);
    }, 0);
  }

  function dragEnd(e: any) {
    setClasses(["task"]);
  }

  useEffect(() => {
    if (taskNode.current) {
      taskNode.current.addEventListener("dragend", dragEnd);
      taskNode.current.addEventListener("dragstart", dragStart);
    }
    return () => {
      if (taskNode.current) {
        taskNode.current.removeEventListener("dragend", dragEnd);
        taskNode.current.removeEventListener("dragstart", dragStart);
      }
    };
  }, []);

  return (
    <li
      className={classes.join(" ")}
      id={`task-${task.id}`}
      draggable="true"
      ref={taskNode}
    >
      <InlineInputEdit defaultValue={task.name} emit={(e) => updateTask(e)} />
      <Actions items={actions} onSelected={(e) => handleAction(e)} />

      <Modal
        id={`task-details-${task.id}`}
        open={modalOpen}
        closeModal={() => setModalOpen(false)}
      >
        <div>{JSON.stringify(task)}</div>
      </Modal>
    </li>
  );
}
export default Task;
