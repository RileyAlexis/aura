import { useSelector } from "react-redux";
import Login from "./components/Login/Login";

function App() {

const user = useSelector(store => store.user);
const userDisplay = JSON.stringify(user);

  return (
    <div className="App">
      Aura App skeleton <br />
      {userDisplay}
      
      <Login />
      
    </div>
  );
}

export default App;
