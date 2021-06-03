import { Link } from 'react-router-dom';
import { DEFAULT_AVATAR, PROFILES_FOLDER } from '../constants/const';

export default function AllUsers({ user }) {
  return (
    <Link to={`/profile/${user.username}`}>
      <li className="flex items-center hover:bg-blue-medium hover:text-white rounded-lg py-2">
        <img
          src={
            user.profilePicture ? `${PROFILES_FOLDER + user.profilePicture}` : `${DEFAULT_AVATAR}`
          }
          alt={user.username}
          className="object-cover w-8 h-8 mr-2 rounded-full"
        />
        <span className="font-medium">{user.username}</span>
      </li>
    </Link>
  );
}
