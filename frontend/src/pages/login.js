import { useContext, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { loginCall } from '../constants/api-calls';
import { AuthContext } from '../context/AuthContext';
import * as ROUTES from '../constants/routes';

export default function Login() {
  // Fields required for login
  const email = useRef();
  const password = useRef();
  const { isFetching, error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    history.push(ROUTES.HOME);
  };
  return (
    <div className="w-screen h-screen p-10 bg-gray-bg">
      <div className="flex w-3/4 mx-auto h-3/4">
        <div className="flex flex-col justify-center flex-1 pr-10">
          <h3 className="mb-3 text-5xl font-black text-blue-login">Social App</h3>
          <span className="text-xl font-medium">
            Connect and meet new people from all around the world.
          </span>
        </div>
        <div className="flex flex-col justify-center flex-1">
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form
            className="flex flex-col justify-between p-5 bg-white rounded-lg h-80"
            onSubmit={handleClick}
            method="POST"
          >
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="h-12 pl-5 text-lg border rounded-lg outline-none border-gray-light"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              ref={password}
              className="h-12 pl-5 text-lg border rounded-lg outline-none border-gray-light"
            />
            <button
              type="submit"
              disabled={isFetching}
              className={`self-center w-1/2 h-12 mb-2 text-xl font-medium text-white border-none rounded-lg outline-none cursor-pointer bg-blue-login ${
                isFetching && 'cursor-not-allowed'
              }`}
            >
              {isFetching ? <CircularProgress color="secondary" size="20px" /> : 'Log In'}
            </button>
            <span className="font-medium text-center cursor-pointer text-blue-login">
              Forgot Password?
            </span>
            <div className="flex flex-col text-center">
              <Link to="/sign-up">
                <button
                  type="button"
                  disabled={isFetching}
                  className={`self-center w-1/2 h-12 mb-2 text-xl font-medium text-white border-none rounded-lg outline-none cursor-pointer bg-green-register ${
                    isFetching && 'cursor-not-allowed'
                  }`}
                >
                  {isFetching ? (
                    <CircularProgress color="secondary" size="20px" />
                  ) : (
                    'Create a new account'
                  )}
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
