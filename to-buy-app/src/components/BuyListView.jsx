import { useState } from "react";
import BuyListItem from "./BuyItem";

export default function BuyListView({
  buyList,
  setBuyList,
  buyListItems = [],
}) {
  const [inputText, setInputText] = useState("");

  if (!buyList) return;

  const { title, createdDate } = buyList;
  const buyItems = buyListItems.reverse().map((item, index) => {
    return (
      <li
        key={index}
        data-index={index}
        data-completed={item.isCompleted}
        className="card-list-item"
      >
        <BuyListItem
          index={index}
          item={item}
          editItem={editItem}
          deleteItem={deleteItem}
          toggleItemCompletion={toggleItemCompletion}
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
              {buyListItems.filter((item) => item.isCompleted).length} /{" "}
              {buyListItems.length}
            </span>
          </div>
          <button className="icon-btn" data-color-var="inversed" type="button">
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

  function toggleItemCompletion(index) {
    const item = buyList.items[index];
    if (!item) return false;

    const isCompleted = buyList.items[index].isCompleted;

    setBuyList((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index].isCompleted = !isCompleted;
      return {
        ...prev,
        items: updatedItems,
      };
    });
    console.log(buyList.items[index].isCompleted);
  }

  function addItem(text) {
    // TODO: better validation
    if (!text) return;

    setBuyList((prev) => {
      return {
        // Copy all existing properties of prev
        ...prev,
        // Replace the items array with a new array including the new item
        items: [...prev.items, { text, isCompleted: false }],
      };
    });
  }

  function editItem(index, text) {
    // TODO: better validation
    console.log("editItem called", index, text);

    if (!text) return;

    const item = buyList.items[index];
    if (!item) return false;

    console.log(index, item);

    setBuyList((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index].text = text;
      return {
        ...prev,
        items: updatedItems,
      };
    });
  }

  function deleteItem(index) {
    setBuyList((prev) => {
      return {
        ...prev,
        items: prev.items.filter((item, i) => i != index),
      };
    });
  }
}
