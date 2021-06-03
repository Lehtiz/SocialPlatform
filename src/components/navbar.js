import { NavLink, Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import { useContext } from 'react';
import { ExitToApp } from '@material-ui/icons';
import { PROFILES_FOLDER, DEFAULT_AVATAR } from '../constants/const';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="sticky top-0 flex items-center w-full h-12 bg-blue-medium">
      <div className="flex w-3/12">
        <Link to="/">
          <span className="ml-5 text-2xl font-bold text-white cursor-pointer">Social</span>
        </Link>
      </div>
      <div className="flex w-5/12">
        <div className="flex items-center justify-center w-full h-8 bg-white rounded-lg">
          <SearchIcon className="h-6" />
          <input
            placeholder="Search for friend, post or video"
            className="w-11/12 border-none outline-none"
          />
        </div>
      </div>
      <div className="flex items-center justify-around w-4/12 text-white">
        <div className="flex">
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            <span className="mr-3 text-lg cursor-pointer">Homepage</span>
          </NavLink>
          <NavLink
            to={`/profile/${user?.username}`}
            activeStyle={{
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            <span className="mr-3 text-lg cursor-pointer">Timeline</span>
          </NavLink>
        </div>
        <div className="flex">
          <div className="relative mr-4 cursor-pointer">
            <PersonIcon className="h-6" />
            <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full bg-red-primary -top-1 -right-1">
              1
            </span>
          </div>
          <div className="relative mr-4 cursor-pointer">
            <Link to="/messenger">
              <ChatIcon className="h-6" />
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full bg-red-primary -top-1 -right-1">
                1
              </span>
            </Link>
          </div>
          <div className="relative mr-4 cursor-pointer">
            <NotificationsIcon className="h-6" />
            <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full bg-red-primary -top-1 -right-1">
              1
            </span>
          </div>
        </div>
      </div>
      <div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? `${PROFILES_FOLDER + user.profilePicture}`
                : `${DEFAULT_AVATAR}`
            }
            alt="avatar"
            className="object-cover w-8 h-8 mr-3 border-none cursor-pointer rounded-2xl"
          />
        </Link>
      </div>
      <button
        type="button"
        className="mr-2"
        onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
      >
        <ExitToApp color="primary" />
      </button>
    </div>
  );
}
