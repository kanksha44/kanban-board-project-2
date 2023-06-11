import "./Nav.css";
import { list } from "../../recoil_description_atoms/DescriptionAtoms";
import { useRecoilState } from "recoil";
import Button from '@mui/material/Button';
import React, { useState} from "react";
import BoltIcon from '@mui/icons-material/Bolt';

function Nav() {
  const [listData, setListData] = useRecoilState(list);

  function handleClearBoard() {
    setListData([]);
    localStorage.removeItem("listData");
  }
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <h3>Task Manager</h3>
          </div>
          <div className="change-background">
            <button>Change Background</button>
          </div>
          <div className="profile">
            <img src="https://picsum.photos/200/300" alt="profile" />
          </div>
          <Button
          variant="text"
          onClick={handleClearBoard}
          startIcon={<BoltIcon />}
          >
            Clear Board
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;