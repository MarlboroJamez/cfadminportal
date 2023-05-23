import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit'

//ROUTES
import PrivateRoute from './routes/private';

//AUTHEMTICATION
import Login from './pages/auth/Login';

//DASHBORD
import Home from './pages/dashboard/Home';

function App() {
  return (
    <Router>
      <div className="App font-sans bg-gray-100 min-h-screen">
        <Switch>
          <Route exact path="/" component={Login}/>
          <PrivateRoute exact path="/dashboard" component={Home}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
