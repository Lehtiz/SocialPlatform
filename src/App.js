// webkit overrides for scrollbar styling
import './pages/scrollbar.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Profile = lazy(() => import('./pages/profile'));
const SignUp = lazy(() => import('./pages/sign-up'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.HOME} component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
