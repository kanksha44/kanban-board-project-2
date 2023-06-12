import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import DeleteIcon from '@mui/icons-material/Delete';
import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
import { Button } from "@mui/material";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels } = props.card;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
              <button > <DeleteIcon /> </button> 
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card_footer_item">
              <CheckSquare className="card_footer_icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;




















// import { useState } from "react";
// import "./Card.css";
// import { useNavigate } from "react-router-dom";

// const Card = ({ cardInfo, removeCard, updateCardTitle }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(cardInfo.title);

//   const handleSaveCardTitle = () => {
//     const trimmedTitle = editedTitle.trim();
//     if (trimmedTitle !== "") {
//       updateCardTitle(trimmedTitle);
//     }
//     setIsEditing(false);
//   };

//   const Navigate = useNavigate();

//   const handleNavigateClick = (e) => {
//     e.preventDefault;
//     Navigate("/description/:cardInfo.id");
//   };

//   return (
//     <div className="card-container" onClick={handleNavigateClick}>
//       {isEditing ? (
//         <input
//           type="text"
//           value={editedTitle}
//           onChange={(e) => setEditedTitle(e.target.value)}
//         />
//       ) : (
//         <div>{cardInfo.title}</div>
//       )}
//       <div className="card-actions">
//         {isEditing ? (
//           <button onClick={handleSaveCardTitle}>Save</button>
//         ) : (
//           <>
//             <button onClick={() => setIsEditing(true)}>Edit</button>
//             <button onClick={removeCard}>Delete</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card;
