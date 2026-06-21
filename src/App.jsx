import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';

export default function App() {
  if (window.location.pathname === '/users') {
    return <Users />;
  }

  return <Home />;
}
