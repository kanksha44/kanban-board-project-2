import Card from "../Card/Card";
import AddNewList from "../AddNewList/AddNewList";
import { useSelector } from "react-redux";

const List = () => {
  const listItem = useSelector((store) => store.listSlice.list);
  return (
    <>
      {listItem.map((list) => (
        <div className="list-container-wrapper" key={list.id}>
          <div className="list-container">
            <div className="list-title">{list.title}</div>
            {list.children?.length > 0 &&
              list.children.map((children) => (
                <Card key={children.id} cardInfo={children} />
              ))}
            <div className="card-new">
              <AddNewList type="card" parentId={list.id} />
            </div>
          </div>
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
