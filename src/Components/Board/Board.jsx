import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";

import Card from "../Card/Card";
import Editable from "../Editable/Editable";

import PropTypes from "prop-types";

import "./Board.css";

function Board(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "popover-board" : undefined;

  const removeBoardHandler = () => {
    props.removeBoard(props.board.id);
    handleClose();
  };

  const addCardHandler = (title) => {
    if (title.trim() === "") {
      return;
    }

    props.addCard(props.board.id, title);
  };

  return (
    <div className="board">
    <div className="board-wrapper">

      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div className="board_header_title_more">
          <MoreHorizIcon onClick={handleClick} />

          <Popover
            id={popoverId}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="board_popover_content">
              <p onClick={removeBoardHandler}>Delete Board</p>
            </div>
          </Popover>
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
          onSubmit={addCardHandler}
        />
      </div>
      </div>
    </div>
  );
}

Board.propTypes = {
  addCard: PropTypes.func.isRequired,
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
  }),
  removeBoard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  dragEntered: PropTypes.func.isRequired,
  dragEnded: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
};

export default Board;