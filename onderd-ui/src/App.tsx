import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';
import Store from './store/Store';
import Race from './pages/Race';
import Organisation from "./pages/Organisation";
import Header from "./Header";

function App() {
  return (
    <Store>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Race} />
            <Route path="/organisation" component={Organisation} />
          </Switch>
        </BrowserRouter>
      </div>
    </Store>
  );
}

export default App;
