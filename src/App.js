import "./App.css";
import Menu from "./components/menu.js";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Pause from "./components/pause.js";
import Game from "./components/game";
import Final from "./components/final";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/pause" component={Pause} />
          <Route exact path="/game/:playerCount" component={Game} />
          <Route exact path="/final" component={Final} />
          <Route path="/" component={Menu} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
