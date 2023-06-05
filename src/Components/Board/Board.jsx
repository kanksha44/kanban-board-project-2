import "./Board.css";
import Nav from "../Navbar/Nav";
import Card from "../Card/Card";

const Board = () => {
  return (
    <div className="board-container">
      <Nav />
      <div className="adding-card">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Board;
