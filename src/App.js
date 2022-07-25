import "./App.css";
import Menu from "./components/menu.js";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Game from "./components/game";
import Final from "./components/final";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/game/:playerCount">
            <Game />
          </Route>
          <Route exact path="/final">
            <Final />
          </Route>
          <Route path="/">
            <Menu />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
