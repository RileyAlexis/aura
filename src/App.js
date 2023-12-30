import { useSelector } from "react-redux";

function App() {

const user = useSelector(store => store.user);
const userDisplay = JSON.stringify(user);

  return (
    <div className="App">
      Aura App skeleton
      {userDisplay}
    </div>
  );
}

export default App;
