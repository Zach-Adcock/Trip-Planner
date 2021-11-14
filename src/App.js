import './Styles/index.css'
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './Components/SearchBar';
import Concerts from './Components/Concerts';

function App() {
  return (
    <Router>
    <div className="App">
      <SearchBar />
      <Concerts />
      <header className="content">
        <Switch>
          <Route exact patch="/">
            <Home />
          </Route>
        </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
