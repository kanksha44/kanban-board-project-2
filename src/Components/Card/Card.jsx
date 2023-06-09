import { useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ cardInfo, removeCard, updateCardTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(cardInfo.title);

  const handleSaveCardTitle = () => {
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle !== "") {
      updateCardTitle(trimmedTitle);
    }
    setIsEditing(false);
  };

  const Navigate = useNavigate();

  const handleNavigateClick = (e) => {
    e.preventDefault;
    Navigate("/description/:cardInfo.id");
  };

  return (
    <div className="card-container" onClick={handleNavigateClick}>
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <div>{cardInfo.title}</div>
      )}
      <div className="card-actions">
        {isEditing ? (
          <button onClick={handleSaveCardTitle}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={removeCard}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
