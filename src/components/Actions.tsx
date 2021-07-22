import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useDocumentEvent } from "../utils/utils";

interface Props {
  items: string[];
  onSelected: (item: string) => void;
}

export default function Actions({ items, onSelected }: Props): ReactElement {
  const [open, setOpen] = useState(false);
  const menu = useRef<null | any>(null);

  const closeActions = useCallback(
    (e: any) => {
      if (menu.current && menu.current.contains(e.target)) {
        return;
      }
      setOpen(false);
    },
    [menu]
  );

  function handleOpen(): void {
    setOpen(!open);
  }

  function handleActionClick(item: string): void {
    if (typeof onSelected === "function") {
      onSelected(item);
    }
    setOpen(false);
  }

  useDocumentEvent([{ type: "mouseup", callback: closeActions }]);

  return (
    <div className="actions" ref={menu}>
      <i
        className={`${open ? "opened" : ""} fas fa-ellipsis-v`}
        onClick={handleOpen}
      ></i>
      {open && (
        <div className="overflow">
          <ul>
            {items.map((item, i) => (
              <li key={i} onClick={() => handleActionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
