import "./Board.css";
import List from "../List/List";

const Board = () => {
  return (
    <div className="board-container">
      {/* will show filter component here */}
      <div className="adding-card">
        <List />
      </div>
    </div>
  );
};

export default Board;