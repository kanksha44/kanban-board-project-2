import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editable/Editable";

import PropTypes from "prop-types";

import "./Board.css";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizIcon />

          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

// Board.propTypes = {
//   addCard:PropTypes.func,
//   removeBoard: PropTypes.func,
//   removeCard: PropTypes.func,
//   dragEntered: PropTypes.func,
//   dragEnded: PropTypes.func,
//   updateCard: PropTypes.func,
// };

Board.propTypes = {
  addCard: PropTypes.func,
  board: PropTypes.shape({
    id: PropTypes.number.isRequired, // Add prop validation for board.id as a required number
    title: PropTypes.string.isRequired, // Add prop validation for board.title as a required string
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
  }),
  removeBoard: PropTypes.func,
  removeCard: PropTypes.func,
  dragEntered: PropTypes.func,
  dragEnded: PropTypes.func,
  updateCard: PropTypes.func,
};

export default Board;

// import "./Board.css";
// import List from "../List/List";

// const Board = () => {
//   return (
//     <div className="board-container">
//       {/* will show filter component here */}
//       <div className="adding-card">
//         <List />
//       </div>
//     </div>
//   );
// };

// export default Board;
