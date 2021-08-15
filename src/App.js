// webkit overrides for scrollbar styling
import './pages/scrollbar.css';
import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/navbar';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Profile = lazy(() => import('./pages/profile'));
const EditProfile = lazy(() => import('./pages/edit-profile'));
const Messenger = lazy(() => import('./pages/messenger'));
const SignUp = lazy(() => import('./pages/sign-up'));

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex flex-col max-h-screen">
            <div className="absolute left-0 flex w-full h-12 pt-12 -top-12">
              <Navbar />
            </div>
            <div className="pt-12">Loading...</div>
          </div>
        }
      >
        <Switch>
          <Route exact path={ROUTES.HOME} component={user ? Home : Login} />
          <Route path={ROUTES.SIGN_UP} component={user ? Home : SignUp} />
          <Route path={ROUTES.LOGIN} component={user ? Home : Login} />
          <Route path={ROUTES.PROFILE} component={user ? Profile : Login} />
          <Route path={ROUTES.EDITPROFILE} component={user ? EditProfile : Login} />
          <Route path={ROUTES.MESSENGER} component={user ? Messenger : Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
