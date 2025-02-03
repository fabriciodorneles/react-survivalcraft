import HexagonBoard from "./components/HexagonBoard/HexagonBoard";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { BoardProvider } from "./contexts/BoardContext";

export default function Home() {
  return (
    <BoardProvider>
      <div className="bg-black flex p-10 w-full h-full">
        <Sidebar />
        <div className="pl-10">
          <HexagonBoard />
        </div>
      </div>
    </BoardProvider>
  );
}
