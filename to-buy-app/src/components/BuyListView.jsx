import { useEffect, useState } from "react";
import BuyItem from "./BuyItem";
import { v4 as uuidv4 } from "uuid";
import BuyListsItem from "./BuyListsItem";

export default function BuyListView({
  buyList,
  deleteBuyList,
  buyItemsMap = new Map(),
  setBuyItemsMap,
  updateBuyItemsLocalStorage,
  updateBuyItemsStats,
}) {
  const [inputText, setInputText] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (!buyItemsMap) return;
    const item = buyItemsMap.get(editingItemId);
    if (item) {
      setEditingText(item.text);
    }
  }, [editingItemId, buyItemsMap]);

  if (!buyList || !buyItemsMap) return <div></div>;

  const { title, createdDate } = buyList;

  const buyItems = Array.from(buyItemsMap.values())
    .reverse()
    .map((item) => {
      return (
        <li
          key={item.id}
          data-id={item.id}
          data-completed={item.isCompleted}
          className="card-list-item"
        >
          <BuyItem
            item={item}
            toggleItemCompletion={toggleItemCompletion}
            deleteItem={deleteItem}
            editItem={editItem}
            isEditing={editingItemId && editingItemId === item.id}
            setEditingItemId={setEditingItemId}
            editingText={editingText}
            setEditingText={setEditingText}
          />
        </li>
      );
    });

  return (
    <article className="buy-list-view">
      <header>
        <h1>{title}</h1>
        <div>
          <div>
            <span className="tag">{createdDate}</span>{" "}
            <span className="tag">
              {buyList.completedItemsCount} / {buyList.totalItemsCount}
            </span>
          </div>
          <button
            className="icon-btn"
            data-color-var="inversed"
            type="button"
            onClick={() => {
              deleteBuyList(buyList.id);
            }}
          >
            X
          </button>
        </div>
      </header>
      <div>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            addItem(inputText);
            setInputText("");
          }}
          className="new-buy-item-form"
        >
          <input
            className="input-text-n"
            type="text"
            name="text"
            placeholder="Enter a new item"
            id="new-todo-input"
            value={inputText}
            onChange={(ev) => setInputText(ev.target.value)}
          />
          <button
            className="icon-btn icon-bg-s icon-arrow-down"
            data-color-var="accent"
            type="submit"
          ></button>
        </form>
      </div>
      <div className="buy-items-container">
        <ul className="card-list">{buyItems}</ul>
      </div>
    </article>
  );

  function toggleItemCompletion(id) {
    const item = buyItemsMap.get(id);
    if (!item) return false;

    const isCompleted = item.isCompleted;

    setBuyItemsMap((prev) => {
      const newItems = new Map(prev);
      newItems.get(id).isCompleted = !isCompleted;
      updateBuyItemsLocalStorage(buyList.id, Array.from(newItems.values()));
      updateBuyItemsStats(
        buyList.id,
        Array.from(newItems.values()).filter((item) => item.isCompleted).length
      );
      return newItems;
    });
  }

  function addItem(text) {
    // TODO: better validation
    if (!text) return;

    const id = uuidv4();

    setBuyItemsMap((prev) => {
      const newItems = new Map(prev);
      newItems.set(id, { id, text, isCompleted: false });
      updateBuyItemsLocalStorage(buyList.id, Array.from(newItems.values()));
      updateBuyItemsStats(buyList.id, null, newItems.size);
      return newItems;
    });
  }

  function editItem(id, text) {
    // TODO: better validation
    if (!text) return;

    const item = buyItemsMap.get(id);
    if (!item) return false;

    setBuyItemsMap((prev) => {
      const newItems = new Map(prev);
      newItems.get(id).text = text;
      updateBuyItemsLocalStorage(buyList.id, Array.from(newItems.values()));
      return newItems;
    });
  }

  function deleteItem(id) {
    const item = buyItemsMap.get(id);
    if (!item) return false;

    setBuyItemsMap((prev) => {
      const newItems = new Map(prev);
      newItems.delete(id);
      updateBuyItemsLocalStorage(buyList.id, Array.from(newItems.values()));
      updateBuyItemsStats(
        buyList.id,
        Array.from(newItems.values()).filter((item) => item.isCompleted).length,
        newItems.size
      );
      return newItems;
    });
  }
}
