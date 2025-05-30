import { useEffect, useRef } from "react";

export default function BuyListsItem({
  buyList,
  selectBuyList,
  setExpanded,
  isSelected,
  renameBuyList,
  isEditing,
  changeEditingBuyListId,
  editingText,
  setEditingText,
  deleteBuyList,
}) {
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setEditingText(buyList.title);
      editInputRef.current.focus();
    }
  }, [isEditing, buyList.title, setEditingText]);

  if (isEditing) {
    return (
      <>
        <input
          ref={editInputRef}
          className="input-text-n card-input"
          placeholder="New Buy List"
          type="text"
          name="text"
          value={editingText}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              const title = editingText || buyList.title || "New Buy List";
              renameBuyList(buyList.id, title);
              changeEditingBuyListId(null);
            }
          }}
          onChange={(ev) => setEditingText(ev.target.value)}
        />
        <button
          className="icon-btn icon-bg icon-tick"
          type="button"
          data-color-var={isSelected ? "inversed" : ""}
          onClick={() => {
            changeEditingBuyListId(null);
            const title = editingText || buyList.title || "New Buy List";
            renameBuyList(buyList.id, title);
          }}
        ></button>
        <button
          className="icon-btn icon-bg icon-arrow-right"
          type="button"
          data-color-var={isSelected ? "inversed" : ""}
          onClick={() => {
            const title = editingText || buyList.title;
            title || renameBuyList(buyList.id, "New Buy List");
            changeEditingBuyListId(null);
          }}
        ></button>
      </>
    );
  } else {
    return (
      <>
        <span
          className="card-text"
          onClick={() => selectBuyList(buyList.id) && setExpanded(false)}
        >
          {buyList.title}
        </span>
        <span className="tag">
          {buyList.completedItemsCount} / {buyList.totalItemsCount}
        </span>
        <span className="tag">{buyList.createdDate}</span>
        <button
          className="icon-btn icon-bg icon-pencil"
          type="button"
          data-color-var={isSelected ? "inversed" : ""}
          onClick={() => {
            changeEditingBuyListId(buyList.id);
          }}
        ></button>
        <button
          className="icon-btn"
          data-color-var={isSelected ? "inversed" : ""}
          type="button"
          onClick={() => deleteBuyList(buyList.id)}
        >
          X
        </button>
      </>
    );
  }
}
