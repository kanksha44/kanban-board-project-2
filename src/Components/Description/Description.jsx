import React, { useState } from "react";
import styles from "./Description.module.css";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";

const Description = () => {
  const [watch, setWatch] = useState("Watch");
  const [show, setShow] = useState("Show details");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(true);
  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [cardTitle, setCardTitle] = useState("card1");
  const [isEditingCardTitle, setIsEditingCardTitle] = useState(false);
  const [editedCardTitle, setEditedCardTitle] = useState("");

  const handleCardTitleClick = () => {
    setIsEditingCardTitle(true);
    setEditedCardTitle(cardTitle);
  };

  const handleCardTitleChange = (event) => {
    setEditedCardTitle(event.target.value);
  };

  const handleSaveCardTitle = () => {
    if (editedCardTitle.trim() !== "") {
      setCardTitle(editedCardTitle);
    }
    setIsEditingCardTitle(false);
  };

  const handleWatch = () => {
    setWatch(watch === "Watch" ? "Watching" : "Watch");
  };

  const handleShow = () => {
    setCardTitle(editedCardTitle);
    setShow(show === "Show details" ? "Hide details" : "Show details");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setIsDescriptionChanged(true);
  };

  const handleSaveDescription = () => {
    setIsDescriptionChanged(false);
    setEditMode(false);
  };

  const handleEditDescription = () => {
    setEditMode(true);
  };

  const handleAddComment = () => {
    const timestamp = new Date().toLocaleString();
    const newComment = {
      content: currentComment,
      user: "User",
      timestamp: timestamp,
    };

    setComments([...comments, newComment]);
    setCurrentComment("");
  };
  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setCurrentComment(comments[index].content);
  };
  

  const handleSaveComment = () => {
    if (currentComment.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[editingCommentIndex].content = currentComment;
      setComments(updatedComments);
    }
    setEditingCommentIndex(null);
    setCurrentComment("");
  };
  

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };

  const handleDiscardChanges = () => {
    setCurrentComment("");
    setEditingCommentIndex(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <LaptopChromebookIcon className={styles.laptop} />
            <div className={styles.cardname}>
              {isEditingCardTitle ? (
                <input
                  type="text"
                  value={editedCardTitle}
                  onChange={handleCardTitleChange}
                  onBlur={handleSaveCardTitle}
                  autoFocus
                />
              ) : (
                <h3 onClick={handleCardTitleClick}>{cardTitle}</h3>
              )}
              <div className={styles.listname}>
              <p>in list todo</p>
              {watch === "Watching" && (
                <VisibilityIcon  />
              )}
              </div>
              
            </div>
          </div>
          <CloseIcon className={styles.close} />
        </div>
        <div className={styles.notification}>
          <p>Notification</p>
          <div className={styles.eyeblock} onClick={handleWatch}>
            <VisibilityIcon className={styles.eye} />
            <h3>{watch}</h3>
            {watch === "Watching" && (
              <CheckBoxIcon className={styles.checkbox} />
            )}
          </div>
        </div>
        <div className={styles.speaker}>
          <SubjectIcon className={styles.speakericon} />
          <div className={styles.description}>
            <h3>Description</h3>
            {editMode ? (
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  placeholder="Add a more detailed description..."
                  multiline
                  maxRows={10}
                  className={styles.textbox}
                  value={description}
                  onChange={handleDescriptionChange}
                />
                {isDescriptionChanged && description.trim() !== "" && (
                  <button onClick={handleSaveDescription}>Save</button>
                )}
              </div>
            ) : (
              <div className={styles.descriptionText}>
                {description ? (
                  <>
                    <p>{description}</p>
                    <button onClick={handleEditDescription}>Edit</button>
                  </>
                ) : (
                  <TextField
                    id="outlined-multiline-flexible"
                    placeholder="Add a more detailed description..."
                    multiline
                    maxRows={10}
                    className={styles.textbox}
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.activity}>
          <div className={styles.activityicon}>
            <FormatListBulletedIcon />
            <h3>Activity</h3>
          </div>
          <p onClick={handleShow}>{show}</p>
        </div>
        <div className={styles.comment}>
          <PersonIcon className={styles.person} />
          <TextField
            id="outlined-multiline-flexible"
            placeholder="Write a comment..."
            multiline
            maxRows={10}
            className={styles.commentbox}
            value={currentComment}
            onChange={handleCommentChange}
          />
          {editingCommentIndex === null ? (
            <button
              onClick={handleAddComment}
              disabled={!currentComment.trim()}
            >
              Add Comment
            </button>
          ) : currentComment.trim() !== "" ? (
            <button onClick={handleSaveComment}>Save</button>
          ) : (
            <button onClick={handleDiscardChanges}>Discard Changes</button>
          )}
        </div>

        <div className={styles.commentsList}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <PersonIcon className={styles.person} />
                <span className={styles.userName}>{comment.user}</span>
                <span className={styles.timestamp}>{comment.timestamp}</span>
              </div>
              <p>{comment.content}</p>
              <div className={styles.commentActions}>
                <button onClick={() => handleEditComment(index)}>Edit</button>
                <button onClick={() => handleDeleteComment(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;