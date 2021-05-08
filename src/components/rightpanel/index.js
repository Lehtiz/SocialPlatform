import CakeIcon from '@material-ui/icons/Cake';
import OnlineFriends from '../online-friends';
import { Users } from '../../dummydata';

export default function rightpanel({ profile }) {
  const HomeRightPanel = () => (
    <>
      <div className="flex items-center pt-5 pr-5 mb-3 ">
        <CakeIcon className="mr-2" />
        <span className="text-base font-light">
          <b>Rachel Foster</b> and <b>4 other friends</b> have a birthday today
        </span>
      </div>
      <div className="w-full mb-5">
        <h2 className="text-3xl font-bold">Picture of the day</h2>
        <img
          src="./assets/posts/1.jpg"
          alt="pic of the day"
          className="object-cover w-full rounded-md max-h-96"
        />
      </div>
      <div className="w-full mb-3">
        <h4 className="mb-5 font-bold">Online Friends</h4>
        <ul className="p-0 m-0 list-none">
          {Users.map((u) => (
            <OnlineFriends key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </>
  );

  const ProfileRightPanel = () => (
    <>
      <h1 className="mb-1 text-4xl font-medium">User information title</h1>
      <div className="mb-4">
        <div className="mb-1">
          <span className="mr-2 font-medium text-gray-light">City:</span>
          <span className="font-normal">New York</span>
        </div>
        <div className="mb-1">
          <span className="mr-2 font-medium text-gray-light">From:</span>
          <span className="font-normal">Madrid</span>
        </div>
        <div className="mb-1">
          <span className="mr-2 font-medium text-gray-light">Relationship:</span>
          <span className="font-normal">Single</span>
        </div>
      </div>
      <p className="mb-1 text-4xl font-medium">User Friends</p>
      <div className="flex flex-wrap items-center">
        <div className="flex-col items-center mb-4 mr-4">
          <img
            src="./assets/avatars/11.jpg"
            alt="name"
            className="object-cover w-32 h-32 rounded-lg cursor-pointer"
          />
          <span className="text-base font-medium">Sarah Jane</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full min-h-full p-3 overflow-y-scroll">
      {profile ? <ProfileRightPanel /> : <HomeRightPanel />}
    </div>
  );
}
