import "./Card.css";

const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <input type="text" placeholder="todo" />
        <div className="dots-button">...</div>
      </div>
      <div className="card-body">{/* card description component*/}</div>
      <div className="card-footer">
        <button>+ Add a card</button>
      </div>
    </div>
  );
};

export default Card;
