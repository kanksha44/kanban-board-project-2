import Board from "./Components/Board/Board";
import Description from "./Components/Description/Description";
import Navbar from "./Components/Navbar/Nav";
import store from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    // <Provider store={store}>
    // <div>
    //   <Navbar/>
    //   <div className="main-board-container">
    //   <Board />
    //   </div>
    // </div>
    // </Provider>
    <div>
      <Description/>
    </div>
  );
};

export default App;
