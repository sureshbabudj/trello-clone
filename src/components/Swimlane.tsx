import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Context } from "../store/Store";
import { ContextType, Swimlane } from "../types";
import Actions from "./Actions";
import InlineInputEdit from "./InlineInputEdit";

interface Props {
  swimlane: Swimlane;
}

export default function Swimlane({ swimlane }: Props): ReactElement {
  const { state, dispatch } = useContext<ContextType>(Context);
  const swimlaneNode = useRef<HTMLDivElement>(null);
  const actions = ["View Details", "Delete"];
  const [classes, setClasses] = useState(["list"]);

  function handleAction(e: string) {
    console.log(e, swimlane);
    if (e === actions[0]) {
      viewDetails();
    } else if (e === actions[1]) {
      removeSwimlane();
    }
  }

  function viewDetails() {
    console.log("view details");
  }

  function updateSwimlane(name: string) {
    dispatch({
      type: "updateSwimlane",
      data: {
        ...swimlane,
        name,
        updatedAt: new Date().toISOString()
      }
    });
  }

  function removeSwimlane() {
    dispatch({ type: "removeSwimlane", data: swimlane });
  }

  function dragStart(e: any) {
    e.dataTransfer.setData("text/plain", swimlane.id);
    e.dataTransfer.setData("type", "swimlane");
    setTimeout(() => {
      setClasses(["list drag-hidden"]);
    }, 0);
  }

  function dragEnd(e: any) {
    setClasses(["list"]);
  }

  function dragEnter(e: any) {
    e.preventDefault();
    setClasses(["list", "drag-over"]);
  }

  function dragOver(e: any) {
    e.preventDefault();
    setClasses(["list", "drag-over"]);
  }

  function dragLeave(e: any) {
    setClasses(["list"]);
  }

  function handleTaskMovement(target: number, draggable: number) {
    const swimlane = state.swimlanes.find((i) => i.id === target);
    if (!swimlane) {
      return;
    }
    const task = state.tasks.find((i) => i.id === draggable);
    if (!task) {
      return;
    }
    dispatch({
      type: "updateTask",
      data: {
        ...task,
        swimlaneId: swimlane.id,
        updatedAt: new Date().toISOString()
      }
    });
  }

  function drop(e: any) {
    e.preventDefault();
    setClasses(["swimlane"]);
    const draggable = parseInt(e.dataTransfer.getData("text/plain"));
    const target = parseInt(e.currentTarget.id.split("swimlane-")[1]);
    const type = e.dataTransfer.getData("type");
    if (type && type === "swimlane") {
      dispatch({ type: "changeOrder", data: { draggable, target } });
    } else {
      handleTaskMovement(target, draggable);
    }
  }

  useEffect(() => {
    if (swimlaneNode.current) {
      swimlaneNode.current.addEventListener("dragend", dragEnd);
      swimlaneNode.current.addEventListener("dragstart", dragStart);
      swimlaneNode.current.addEventListener("dragenter", dragEnter);
      swimlaneNode.current.addEventListener("dragover", dragOver);
      swimlaneNode.current.addEventListener("dragleave", dragLeave);
      swimlaneNode.current.addEventListener("drop", drop);
    }
    return () => {
      if (swimlaneNode.current) {
        swimlaneNode.current.removeEventListener("dragend", dragEnd);
        swimlaneNode.current.removeEventListener("dragstart", dragStart);
        swimlaneNode.current.removeEventListener("dragenter", dragEnter);
        swimlaneNode.current.removeEventListener("dragover", dragOver);
        swimlaneNode.current.removeEventListener("dragleave", dragLeave);
        swimlaneNode.current.removeEventListener("drop", drop);
      }
    };
  }, []);

  return (
    <>
      <div
        id={`swimlane-${swimlane.id}`}
        draggable="true"
        className={classes.join(" ")}
        ref={swimlaneNode}
      >
        <h3 className="list-title">
          <InlineInputEdit
            emit={(e: any) => updateSwimlane(e)}
            defaultValue={swimlane.name}
          />
          <Actions items={actions} onSelected={(e) => handleAction(e)} />
        </h3>
        <ul className="list-items">
          <li>Complete mock-up for client website</li>
          <li>Email mock-up to client for feedback</li>
          <li>Update personal website header background image</li>
          <li>Update personal website heading fonts</li>
          <li>Add google map to personal website</li>
          <li>Begin draft of CSS Grid article</li>
          <li>Read new CSS-Tricks articles</li>
          <li>Read new Smashing Magazine articles</li>
          <li>Read other bookmarked articles</li>
          <li>Look through portfolios to gather inspiration</li>
          <li>Create something cool for CodePen</li>
          <li>Post latest CodePen work on Twitter</li>
          <li>Listen to new Syntax.fm episode</li>
          <li>Listen to new CodePen Radio episode</li>
        </ul>

        <button className="add-card-btn btn">Add a card</button>
      </div>
    </>
  );
}
