import React, { useState } from "react";
import Card from "../Card/Card";
import AddNewList from "../AddNewList/AddNewList";
import { useSelector, useDispatch } from "react-redux";
import {
  removeList,
  updateListTitle,
  removeCard,
  updateCardTitle
} from "../../store/listSlice";

const List = () => {
  const listItems = useSelector((store) => store.listSlice.list);
  const dispatch = useDispatch();

  const [editingListId, setEditingListId] = useState(null);
  const [editedListTitle, setEditedListTitle] = useState("");

  const handleRemoveList = (listId) => {
    dispatch(removeList(listId));
  };

  const handleUpdateListTitle = (listId, newTitle) => {
    dispatch(updateListTitle({ listId, newTitle }));
    setEditingListId(null);
  };

  const handleRemoveCard = (parentId, cardId) => {
    dispatch(removeCard({ parentId, cardId }));
  };

  const handleUpdateCardTitle = (parentId, cardId, newTitle) => {
    dispatch(updateCardTitle({ parentId, cardId, newTitle }));
  };

  const startEditingList = (listId, currentTitle) => {
    setEditingListId(listId);
    setEditedListTitle(currentTitle);
  };

  const cancelEditingList = () => {
    setEditingListId(null);
    setEditedListTitle("");
  };

  const saveEditedList = () => {
    if (editedListTitle.trim() !== "") {
      handleUpdateListTitle(editingListId, editedListTitle);
    }
    cancelEditingList();
  };

  return (
    <>
      {listItems.map((list) => (
        <div className="list-container-wrapper" key={list.id}>
          <div className="list-container">
            {editingListId === list.id ? (
              <div className="list-title">
                <input
                  type="text"
                  value={editedListTitle}
                  onChange={(e) => setEditedListTitle(e.target.value)}
                />
                <div className="list-edit-actions">
                  <button onClick={saveEditedList}>Save</button>
                  <button onClick={cancelEditingList}>Cancel</button>
                </div>
              </div>
            ) : (
              <div
                className="list-title"
                onClick={() => startEditingList(list.id, list.title)}
              >
                {list.title}
              </div>
            )}
            {list.children?.length > 0 &&
              list.children.map((children) => (
                <Card
                  key={children.id}
                  cardInfo={children}
                  removeCard={() => handleRemoveCard(list.id, children.id)}
                  updateCardTitle={(newTitle) =>
                    handleUpdateCardTitle(list.id, children.id, newTitle)
                  }
                />
              ))}
            <div className="card-new">
              <AddNewList type="card" parentId={list.id} />
            </div>
          </div>
          <button onClick={() => handleRemoveList(list.id)}>Remove List</button>
        </div>
      ))}

      <div className="list-add-container">
        <div className="list-add">
          <AddNewList />
        </div>
      </div>
    </>
  );
};

export default List;