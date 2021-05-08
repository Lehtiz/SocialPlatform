export default function AllUsers({ user }) {
  return (
    <li className="flex items-center mb-4">
      <img
        src={user.profilePicture}
        alt={user.username}
        className="object-cover w-8 h-8 mr-2 rounded-full"
      />
      <span className="">{user.username}</span>
    </li>
  );
}
