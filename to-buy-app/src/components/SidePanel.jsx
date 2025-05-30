import logo from "../assets/logo.svg";
import { useState } from "react";
import BuyListsItem from "./BuyListsItem";

export default function SidePanel({
  buyListsMap,
  selectedBuyList,
  selectBuyList,
  addBuyList,
  deleteBuyList,
  renameBuyList,
}) {
  const [expanded, setExpanded] = useState(selectedBuyList == null);
  const [editingBuyListId, setEditingBuyListId] = useState(null);
  const [editingText, setEditingText] = useState("");

  function toggleSidebar() {
    setExpanded((prev) => !prev);
  }

  function changeEditingBuyListId(id) {
    setEditingBuyListId((prev) => {
      const prevBuyList = buyListsMap.get(prev);
      if (prevBuyList) {
        prevBuyList.title = editingText || "New Buy List";
      }
      return id;
    });
  }

  const asideClasses = expanded ? "side-panel expanded" : "side-panel";

  const buyListItems = Array.from(buyListsMap.values())
    .reverse()
    .map((buyList) => {
      return (
        <li
          key={buyList.id}
          className={
            selectedBuyList && selectedBuyList.id === buyList.id
              ? "card-list-item selected"
              : "card-list-item"
          }
          data-completed={
            buyList.totalItemsCount === buyList.completedItemsCount
          }
        >
          <BuyListsItem
            buyList={buyList}
            selectBuyList={selectBuyList}
            setExpanded={setExpanded}
            isSelected={selectedBuyList && selectedBuyList.id === buyList.id}
            renameBuyList={renameBuyList}
            isEditing={editingBuyListId && editingBuyListId == buyList.id}
            changeEditingBuyListId={changeEditingBuyListId}
            editingText={editingText}
            setEditingText={setEditingText}
            deleteBuyList={deleteBuyList}
          />
        </li>
      );
    });

  return (
    <aside className={asideClasses}>
      <header>
        <div className="logo">
          <img src={logo} width="40" /> To Buy
        </div>
        <button
          className="btn"
          type="button"
          onClick={() => {
            const id = addBuyList("");
            changeEditingBuyListId(id);
          }}
        >
          New List
        </button>
      </header>
      <div className="buy-lists-container">
        <ul className="card-list">{buyListItems}</ul>
      </div>
      <button
        className={`side-panel-expand-btn icon-bg ${
          expanded ? "icon-arrow-left" : "icon-arrow-right"
        }`}
        data-color-var={expanded ? "inversed" : ""}
        type="button"
        onClick={toggleSidebar}
      ></button>
    </aside>
  );
}
