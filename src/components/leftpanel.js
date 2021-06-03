import RssFeedIcon from '@material-ui/icons/RssFeed';
import ChatIcon from '@material-ui/icons/Chat';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import GroupIcon from '@material-ui/icons/Group';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import HelpIcon from '@material-ui/icons/Help';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import SchoolIcon from '@material-ui/icons/School';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AllUsers from './all-users';
import { AuthContext } from '../context/AuthContext';

export default function Leftpanel() {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      // get all users from api
      try {
        const res = await axios.get('/user/all');
        const users = res.data;
        // filter currentuser out of the array
        setUsers(users.filter((user) => user?._id !== currentUser._id));
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="w-full overflow-y-scroll">
      <div className="p-5">
        <ul className="p-0 m-0 list-none">
          <li className="flex items-center mb-5">
            <RssFeedIcon className="h-6 mr-4" />
            <span className="">Feed</span>
          </li>
          <li className="flex items-center mb-5">
            <ChatIcon className="h-6 mr-4" />
            <span className="">Chat</span>
          </li>
          <li className="flex items-center mb-5">
            <PlayCircleFilledIcon className="h-6 mr-4" />
            <span className="">Videos</span>
          </li>
          <li className="flex items-center mb-5">
            <GroupIcon className="h-6 mr-4" />
            <span className="">Groups</span>
          </li>
          <li className="flex items-center mb-5">
            <BookmarksIcon className="h-6 mr-4" />
            <span className="">Bookmarks</span>
          </li>
          <li className="flex items-center mb-5">
            <HelpIcon className="h-6 mr-4" />
            <span className="">Questions</span>
          </li>
          <li className="flex items-center mb-5">
            <WorkIcon className="h-6 mr-4" />
            <span className="">Jobs</span>
          </li>
          <li className="flex items-center mb-5">
            <EventIcon className="h-6 mr-4" />
            <span className="">Events</span>
          </li>
          <li className="flex items-center mb-5">
            <SchoolIcon className="h-6 mr-4" />
            <span className="">Courses</span>
          </li>
        </ul>
        <button className="w-40 p-2 font-medium border-none rounded-md" type="submit">
          Show more
        </button>
        <hr className="my-5" />
        <ul className="p-0 m-0 list-none">
          {users.map((u) => (
            <AllUsers key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
