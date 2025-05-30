import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import "./App.css";
import BuyListView from "./components/BuyListView";
import SidePanel from "./components/SidePanel";

export default function App() {
  const [buyListsMap, setBuyListsMap] = useState(new Map());
  const [selectedBuyList, setSelectedBuyList] = useState(null);
  const [selectedBuyItemsMap, setSelectedBuyItemsMap] = useState(null);

  useEffect(() => {
    // Load the the buy lists from local storage
    const buyListsString = localStorage.getItem("buy-lists");

    if (!buyListsString) return;

    const buyLists = JSON.parse(buyListsString);
    const buyListsMap = new Map(
      buyLists.map((buyList) => [buyList.id, buyList])
    );
    setBuyListsMap(buyListsMap);
  }, []);

  useEffect(() => {
    if (!selectedBuyList) {
      setSelectedBuyItemsMap(new Map());
      return;
    }

    // Load the the buy lists from local storage
    const buyListItemsString = localStorage.getItem(
      `buy-list-items_${selectedBuyList.id}`
    );

    if (!buyListItemsString) {
      setSelectedBuyItemsMap(new Map());
      return;
    }

    const buyListItems = JSON.parse(buyListItemsString);
    const buyListItemsMap = new Map(
      buyListItems.map((buyList) => [buyList.id, buyList])
    );

    setSelectedBuyItemsMap(buyListItemsMap);
  }, [selectedBuyList]);

  function addBuyList(title) {
    const id = uuidv4();
    const newBuyList = {
      id,
      title: title,
      createdDate: new Date().toDateString(),
      totalItems: 0,
      completedItems: 0,
    };

    setBuyListsMap((prev) => {
      const newBuyListsMap = new Map(prev);
      newBuyListsMap.set(id, newBuyList);
      updateBuyListsLocalStorage(Array.from(newBuyListsMap.values()));
      return newBuyListsMap;
    });

    // We can directly update the selectedBuyList with newBuyList here
    // When the the time the ui rerenders, the selectedBuyList id will match and update appropriately.
    setSelectedBuyList(newBuyList);
    return id;
  }

  function deleteBuyList(id) {
    const buyList = buyListsMap.get(id);
    if (!buyList) return false;

    setBuyListsMap((prev) => {
      const newBuyListsMap = new Map(prev);
      newBuyListsMap.delete(id);
      updateBuyListsLocalStorage(Array.from(newBuyListsMap.values()));
      return newBuyListsMap;
    });

    return id;
  }

  function renameBuyList(id, title) {
    if (!title) return false;

    const buyList = buyListsMap.get(id);
    if (!buyList) return false;

    setBuyListsMap((prev) => {
      const newBuyListsMap = new Map(prev);
      newBuyListsMap.get(id).title = title;
      updateBuyListsLocalStorage(Array.from(newBuyListsMap.values()));
      return newBuyListsMap;
    });
  }

  function selectBuyList(id) {
    const buyList = buyListsMap.get(id);
    if (!buyList) return false;

    setSelectedBuyList(buyList);
    return true;
  }

  return (
    <>
      <SidePanel
        buyListsMap={buyListsMap}
        selectedBuyList={selectedBuyList}
        selectBuyList={selectBuyList}
        addBuyList={addBuyList}
        deleteBuyList={deleteBuyList}
        renameBuyList={renameBuyList}
      />
      <main>
        <BuyListView
          buyList={selectedBuyList}
          setBuyList={setSelectedBuyList}
          buyItemsMap={selectedBuyItemsMap}
          setBuyItemsMap={setSelectedBuyItemsMap}
          updateBuyItemsLocalStorage={updateBuyListItemsLocalStorage}
        />
      </main>
    </>
  );

  function updateBuyListsLocalStorage(buyLists) {
    const buyListsString = JSON.stringify(buyLists);
    localStorage.setItem("buy-lists", buyListsString);
  }

  function updateBuyListItemsLocalStorage(buyListId, buyListItems) {
    const buyListsString = JSON.stringify(buyListItems);
    localStorage.setItem(`buy-list-items_${buyListId}`, buyListsString);
  }
}
