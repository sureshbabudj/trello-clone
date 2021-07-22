import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useDocumentEvent } from "../utils/utils";

interface Props {
  emit?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  type?: "text" | "textarea";
}

export default function InlineInputEdit({
  emit,
  type = "text",
  placeholder,
  defaultValue
}: Props): ReactElement {
  const textInput = useRef<any>(null);
  const inlineEdit = useRef<any>(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [err, setErr] = useState(false);

  function handleSubmit(e?: any) {
    e && e.preventDefault();
    if (!value) {
      setErr(true);
      return;
    }
    setErr(false);
    setIsEditEnabled(false);
    if (typeof emit === "function") {
      emit(value);
    }
  }

  function handleInputChange(e: any) {
    setValue(e.target.value);
    if (e.target.value.length) {
      setErr(false);
    }
  }

  function handleEdit() {
    setIsEditEnabled(true);
  }

  useEffect(() => {
    setIsEditEnabled(!defaultValue);
    !!defaultValue && setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (isEditEnabled) {
      textInput.current?.focus();
    }
  }, [isEditEnabled]);

  const closeActions = useCallback(
    (e: any) => {
      if (
        !isEditEnabled ||
        (inlineEdit.current && inlineEdit.current.contains(e.target))
      ) {
        return;
      }
      handleSubmit();
    },
    [isEditEnabled]
  );

  useDocumentEvent([{ type: "mouseup", callback: closeActions }]);

  return (
    <div
      className={`inline-input-wrap ${type === "textarea" ? "text-area" : ""}`}
      ref={inlineEdit}
    >
      {isEditEnabled ? (
        <form noValidate onSubmit={handleSubmit}>
          {type === "textarea" ? (
            <>
              <textarea
                placeholder={placeholder || "Enter"}
                defaultValue={value}
                rows={4}
                onChange={handleInputChange}
                ref={textInput}
              ></textarea>
              <button
                type="submit"
                className="submit-btn button button-small button-secondary"
              >
                Submit <i className="fas fa-check-circle"></i>
              </button>
            </>
          ) : (
            <input
              type="text"
              placeholder={placeholder || "Enter"}
              defaultValue={value}
              onChange={handleInputChange}
              ref={textInput}
              className={`${err ? "error" : ""}`}
            />
          )}
          {err && <i className="inputErrorIcon fas fa-times"></i>}
        </form>
      ) : (
        <div className="inline-input-value" onClick={handleEdit}>
          {value}
        </div>
      )}
    </div>
  );
}
