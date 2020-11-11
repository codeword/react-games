import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom';
import './index.css';
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <Router>
      <div>
        <nav className="nav-bar">
          <header>Games</header>
          <ul className="nav-links">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/tic-tac-toe">Tic Tac Toe</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/tic-tac-toe">
            <TicTacToe />
          </Route>
          <Route path="/">
            <h2 className="call-out">Choose a game to play!</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render( <App />, document.getElementById('root') );
