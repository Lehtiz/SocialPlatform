import { PF } from '../../constants/const';

export default function OnlineFriends({ user }) {
  return (
    <li className="flex items-center mb-4">
      <div className="relative flex items-center mr-2">
        <img
          className="object-cover w-12 h-12 mr-1 rounded-full"
          src={`${PF}${user.profilePicture}`}
          alt={user.username}
        />
        <span className="absolute w-4 h-4 border-2 border-white rounded-full -top-1 right-1 bg-green-online" />
      </div>
      <span className="font-medium">{user.username}</span>
    </li>
  );
}
