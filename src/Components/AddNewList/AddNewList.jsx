import { useState } from "react";
import { addList, addCard } from "../../store/listSlice";
import { useDispatch } from "react-redux";

const AddNewList = ({ type, parentId }) => {
  const [inputVal, setInputVal] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  // console.log("type", type);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (type) {
      dispatch(
        addCard({ id: Math.random(), title: inputVal, parentId: parentId })
      );
    } else {
      dispatch(addList({ id: Math.random(), title: inputVal }));
    }
    // console.log("inputVal", inputVal);
    hideForm();
    setInputVal("");
  };

  const updateInput = (e) => {
    setInputVal(e.target.value);
  };
  const openForm = () => {
    setIsFormVisible(true);
  };
  const hideForm = () => {
    setIsFormVisible(false);
  };

  const buttonName = type ? "Add new card" : "Add new list";

  return (
    <div>
      <button onClick={openForm}>
        {type ? "" : ""}
        {buttonName}
      </button>
      {isFormVisible && (
        <form onSubmit={submitHandler} className="form-container">
          <input
            type="text"
            value={inputVal}
            onChange={updateInput}
            placeholder={type ? "Enter Card Name" : "Enter List Name"}
          />
          <div className="mt-3">
            <button onClick={submitHandler} className="save-btn">
              save
            </button>
            <button onClick={hideForm} className="cancel-btn">
              cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNewList;
