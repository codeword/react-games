import {
  Switch,
  Link,
  Route
} from 'react-router-dom';
import _ from 'lodash'
import TicTacToe from './games/TicTacToe';
import MasterMind from './games/MastMind'

const GAMES = [
  {
    path: "/tic-tac-toe",
    title: "Tic-Tac-Toe",
    component: <TicTacToe />,
  },
  {
    path: "/MasterMind",
    title: "MasterMind",
    component: <MasterMind />,
  },
]

let makeRoute = (page) => {
  let key = page.path;
  let link = <li key={key} className="nav-item"><Link to={page.path}>{page.title}</Link></li>;
  let route = <Route key={key} exact={!!page.exact} path={page.path}>{page.component}</Route>;
  return {link, route};
};

let gameRoutes = _.map(GAMES, makeRoute);

let routes = [
  makeRoute({
    exact: true,
    path: "/",
    title: "Home",  
    component: <ul className='game-list'>{_.map(gameRoutes, 'link')}</ul>,
  })
].concat(gameRoutes);

export default function App() {
  return (
    <div>
      <nav className="nav-bar">
        <header>Games</header>
        <ul className="nav-links">{_.map(routes, 'link')}</ul>
      </nav>
      <Switch>{_.map(routes, 'route')}</Switch>
    </div>
  )
}
