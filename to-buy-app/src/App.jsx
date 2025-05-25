import "./App.css";
import BuyListView from "./components/BuyListView";
import SidePanel from "./components/SidePanel";

export default function App() {
  return (
    <>
      <SidePanel />
      <main>
        <BuyListView />
      </main>
    </>
  );
}
