import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle } from "@mui/material";
import Board from "./Components/Board/Board";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import BoltIcon from "@mui/icons-material/Bolt";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HomeIcon from "@mui/icons-material/Home";
import "./App.css";
import Editable from "./Components/Editable/Editable";

const backgroundImages = [
  "https://images.pexels.com/photos/960137/pexels-photo-960137.jpeg?auto=compress&cs=tinysrgb&w=1572",
  "https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&w=1572",
  "https://images.pexels.com/photos/413195/pexels-photo-413195.jpeg?auto=compress&cs=tinysrgb&w=1572",
  // Add more image URLs
];

function App() {
 
  const [showStar, setShowStar] = useState(true);
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(
    backgroundImages[0]
  );

  const addboardHandler = (name) => {
    if(name.trim()===""){
      return;
    }
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    if (title.trim()===""){
      return;
    }
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };
  

 
  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  const changeBackgroundHandler = () => {
    const currentIndex = backgroundImages.indexOf(selectedBackgroundImage);
    const nextIndex = (currentIndex + 1) % backgroundImages.length;
    setSelectedBackgroundImage(backgroundImages[nextIndex]);
  };

  

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

  function toggleShowStar() {
    setShowStar((prevShowStar) => !prevShowStar);
  }

  function handleClearBoard() {
    localStorage.removeItem("prac-kanban");
    setBoards([]);
  }

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${selectedBackgroundImage})` }}
    >
      <div className="app_nav">
        <Button variant="text">Kanban Board</Button>
        {showStar ? (
          <Button onClick={toggleShowStar}>
            <StarBorderIcon />
          </Button>
        ) : (
          <Button onClick={toggleShowStar}>
            <StarIcon />
          </Button>
        )}
        <Button variant="text" startIcon={<HomeIcon />}>
          Home
        </Button>
        <Button  onClick={changeBackgroundHandler} variant="contained" startIcon={<AddPhotoAlternateIcon />}>
          Change Background
        </Button>
        <Button
          variant="text"
          onClick={handleClearBoard}
          startIcon={<BoltIcon />}
        >
          Clear Board
        </Button>
        <Button variant="text" startIcon={<MoreHorizOutlinedIcon />} />
        <img
          src="https://picsum.photos/id/237/80/80"
          alt="profile"
        />
      </div>
      <div className="app_boards_container">
        <div className="app_boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
          <div className="app_boards_last">
            <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
      {/* <Dialog open={showPopup} onClose={closePopup}>
        <DialogTitle>Please Enter a Task</DialogTitle>
      </Dialog> */}
    </div>
  );
}

export default App;