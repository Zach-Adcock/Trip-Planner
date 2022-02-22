import './Styles/index.css'
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './Components/SearchBar';
import Concerts from './Components/Concerts';
import Header from './Components/Header';
import styled from 'styled-components';


function App() {
  return (
    

    <Container className="App">
      <Router>
        <Home />
        {/* <header className="content">
          <Switch>
            <Route exact patch="/">
              
            </Route>
          </Switch>
        </header> */}
      </Router>
    </Container>
    
  );
}


const Container = styled.div`
  max-width: 100vw;
  width: 100vw;
  overflow-x: clip;
`;

export default App;
