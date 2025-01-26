import ChessBoard from "./components/ChessBoard";
import HexagonBoard from "./components/HexagonBoard/HexagonBoard";

export default function Home() {
  return (
    <div className="bg-black flex p-10 w-full h-full">
      <div className="bg-orange-400 p-20">
        SideBar
      </div>
      <div className="pl-20">
        <HexagonBoard />
        {/* <ChessBoard /> */}
      </div>
    </div>
  );
}
