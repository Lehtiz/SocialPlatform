import axios from 'axios';
import { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';

export default function SignUp() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };
      try {
        await axios.post('/auth/register', user);
        history.push('login');
      } catch (error) {
        console.log(error);
      }
    }
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
          <form
            className="flex flex-col justify-between p-5 bg-white rounded-lg h-80"
            onSubmit={handleClick}
            method="POST"
          >
            <input
              placeholder="Username"
              type="username"
              required
              minLength="2"
              ref={username}
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              ref={password}
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <input
              placeholder="Confirm Password"
              type="password"
              required
              minLength="6"
              ref={passwordAgain}
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <button
              className="self-center w-1/2 h-12 mb-2 text-xl font-medium text-white border-none rounded-lg outline-none cursor-pointer bg-green-register"
              type="submit"
            >
              Sign up
            </button>
            <div className="flex flex-col text-center">
              <span className="font-medium text-center">Already have an account?</span>
              <Link to="/login">
                <button
                  className="self-center w-1/2 h-12 mb-2 text-xl font-medium text-white border-none rounded-lg outline-none cursor-pointer bg-blue-login"
                  type="button"
                >
                  Log In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
