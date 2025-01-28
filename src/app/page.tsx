import ChessBoard from "./components/ChessBoard";
import HexagonBoard from "./components/HexagonBoard/HexagonBoard";
import { Sidebar } from "./components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="bg-black flex p-10 w-full h-full">
      <Sidebar />
      <div className="pl-10">
        <HexagonBoard />
        {/* <ChessBoard /> */}
      </div>
    </div>
  );
}
