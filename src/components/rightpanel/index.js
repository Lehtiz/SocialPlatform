import CakeIcon from '@material-ui/icons/Cake';
import OnlineFriends from '../online-friends';
import { Users } from '../../dummydata';

export default function rightpanel() {
  return (
    <div className="w-full min-h-full p-3 overflow-y-scroll">
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
    </div>
  );
}
