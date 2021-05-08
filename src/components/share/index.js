import RoomIcon from '@material-ui/icons/Room';
import LabelIcon from '@material-ui/icons/Label';
import MoodIcon from '@material-ui/icons/Mood';
import PermMediaIcon from '@material-ui/icons/PermMedia';

export default function share() {
  return (
    <div className="shadow-lg h-44 rounded-xl">
      <div className="p-2">
        <div className="flex items-center mb-1">
          <img
            className="object-cover w-12 h-12 mr-3 rounded-full"
            src="./assets/avatars/1.jpg"
            alt="1.jpg"
          />
          <input type="text" placeholder="Whats on your mind?" className="w-4/5 outline-none" />
        </div>
        <hr className="m-5" />
        <div className="flex items-center justify-between" />
        <div className="flex mx-4">
          <div className="flex items-center mr-4 cursor-pointer">
            <PermMediaIcon className="w-5 h-5 mr-1" />
            <span className="">photo or video</span>
          </div>
          <div className="flex items-center mr-4 cursor-pointer">
            <LabelIcon htmlColor="blue" className="w-6 h-6 mr-1" />
            <span className="">Tag</span>
          </div>
          <div className="flex items-center mr-4 cursor-pointer">
            <RoomIcon htmlColor="green" className="w-6 h-6 mr-1" />
            <span className="">Location</span>
          </div>
          <div className="flex items-center mr-4 cursor-pointer">
            <MoodIcon className="w-5 h-5 mr-1" />
            <span className="">Emotion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
