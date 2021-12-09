import './Styles/index.css'
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './Components/SearchBar';
import Concerts from './Components/Concerts';
import Header from './Components/Header';


function App() {
  return (
    

    <div className="App">
      <Router>
        <Header />
        <Home />
        {/* <header className="content">
          <Switch>
            <Route exact patch="/">
              
            </Route>
          </Switch>
        </header> */}
      </Router>
    </div>
    
  );
}

export default App;
