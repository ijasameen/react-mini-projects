import { useState, useRef, useEffect } from "react";

export default function BuyItem({
  index,
  item,
  toggleItemCompletion,
  deleteItem,
  editItem,
}) {
  const { text } = item;

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setEditingText(text);
      editInputRef.current.focus();
    }
  }, [isEditing, text]);

  if (isEditing) {
    return (
      <>
        <input
          ref={editInputRef}
          className="card-input"
          type="text"
          name="text"
          value={editingText}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              setIsEditing(false);
              editItem(index, editingText);
            }
          }}
          onChange={(ev) => setEditingText(ev.target.value)}
        />
        <button
          className="icon-btn icon-bg icon-tick"
          type="button"
          onClick={() => {
            editItem(index, editingText);
            setIsEditing(false);
          }}
        ></button>
        <button
          className="icon-btn"
          type="button"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          X
        </button>
      </>
    );
  } else {
    return (
      <>
        <span
          className="card-text"
          onClick={() => {
            toggleItemCompletion(index);
          }}
        >
          {text}
        </span>
        {
          // <span className="tag">x 1l</span>
          // <span className="tag">@ Milkshop</span>
        }
        <button
          className="icon-btn icon-bg icon-pencil"
          type="button"
          onClick={() => {
            setIsEditing(true);
          }}
        ></button>
        <button
          className="icon-btn"
          type="button"
          onClick={() => deleteItem(index)}
        >
          X
        </button>
      </>
    );
  }
}
