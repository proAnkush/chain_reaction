import "./App.css";
import Menu from "./components/menu.js";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Pause from "./components/pause.js";
import Game from "./components/game";
import Final from "./components/final";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route exact path="/pause" component={Pause} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/final" component={Final} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
