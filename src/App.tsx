import { useEffect } from "react";
import "./App.css";
import { useDispatch} from "react-redux";
import initiateWebSocket from "./store/thunk/crypto";
import { AppDispatch} from "./store";
import TableView from "./components/TableView";
import ListView from "./components/ListView";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(initiateWebSocket(import.meta.env.VITE_WEBSOCKET_URL));
  }, []);
  return (
    <>
      <main className="bg-slate-50 min-h-dvh pt-3">
        <h2 className="text-3xl font-semibold  mx-5">Crypto Table</h2>
        <TableView />
        <ListView />
      </main>
    </>
  );
}

export default App;
