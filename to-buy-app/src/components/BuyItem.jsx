import { useRef, useEffect } from "react";

export default function BuyItem({
  item,
  toggleItemCompletion,
  deleteItem,
  editItem,
  isEditing,
  setEditingItemId,
  editingText,
  setEditingText,
}) {
  const { id, text } = item;
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing, editingText]);

  if (isEditing) {
    return (
      <>
        <input
          ref={editInputRef}
          className="input-text-n card-input"
          type="text"
          name="text"
          value={editingText}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              setEditingItemId(null);
              editItem(id, editingText);
            }
          }}
          onChange={(ev) => setEditingText(ev.target.value)}
        />
        <button
          className="icon-btn icon-bg icon-tick"
          type="button"
          onClick={() => {
            editItem(id, editingText);
            setEditingItemId(null);
          }}
        ></button>
        <button
          className="icon-btn icon-bg icon-arrow-right "
          type="button"
          onClick={() => {
            setEditingItemId(null);
          }}
        ></button>
      </>
    );
  } else {
    return (
      <>
        <div className="card-content">
          <span
            className="card-text"
            onClick={() => {
              toggleItemCompletion(id);
            }}
          >
            {text}
          </span>
        </div>
        <button
          className="icon-btn icon-bg icon-pencil"
          type="button"
          onClick={() => {
            setEditingItemId(id);
          }}
        ></button>
        <button
          className="icon-btn"
          type="button"
          onClick={() => deleteItem(id)}
        >
          X
        </button>
      </>
    );
  }
}
