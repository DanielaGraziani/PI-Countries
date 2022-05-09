import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CardsDetails from './components/CardsDetails';
import NavBar from './components/NavBar';
import CreateForm from './components/CreateForm';
// import Error from './components/Error';

function App() {
  return (
    <BrowserRouter>   
    <div className="App">
    <Route path="/countries" component={NavBar}/>
    <Route exact path="/countries" component={Home}/>
    <Route exact path="/countries/:id" component={CardsDetails} />
    <Route exact path="/" component={LandingPage}/>
    <Route exact path="/activity" component={CreateForm}/>
    {/* <Route path="*" component={Error}/>  */}
    </div>
    </BrowserRouter>
  );
}

export default App;
