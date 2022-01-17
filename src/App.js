import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
      <Navbar/>
      <Switch>
          <Route path="/">
            <Home/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
