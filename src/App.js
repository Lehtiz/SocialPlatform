// webkit overrides for scrollbar styling
import './pages/scrollbar.css';
import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { AuthContext } from './context/AuthContext';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Profile = lazy(() => import('./pages/profile'));
const SignUp = lazy(() => import('./pages/sign-up'));

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={ROUTES.HOME} component={user ? Home : SignUp} />
          <Route path={ROUTES.SIGN_UP} component={user ? Home : SignUp} />
          <Route path={ROUTES.LOGIN} component={user ? Home : Login} />
          <Route path={ROUTES.PROFILE} component={user ? Profile : Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
