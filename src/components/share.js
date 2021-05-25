import RoomIcon from '@material-ui/icons/Room';
import LabelIcon from '@material-ui/icons/Label';
import MoodIcon from '@material-ui/icons/Mood';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { useContext } from 'react';
import { DEFAULT_AVATAR, PROFILES_FOLDER } from '../constants/const';
import { AuthContext } from '../context/AuthContext';

export default function Share() {
  const { user } = useContext(AuthContext);

  return (
    <div className="shadow-lg h-44 rounded-xl">
      <div className="p-2">
        <div className="flex items-center mb-1">
          <img
            className="object-cover w-12 h-12 mr-3 rounded-full"
            src={
              user.profilePicture !== '' ? PROFILES_FOLDER + user.profilePicture : DEFAULT_AVATAR
            }
            alt="1.jpg"
          />
          <input
            type="text"
            placeholder={`Whats on your mind ${user.username}?`}
            className="w-4/5 outline-none"
          />
        </div>
        <hr className="m-5" />
        <div className="flex items-center justify-between">
          <div className="flex ml-5">
            <div className="flex items-center mr-4 cursor-pointer">
              <PermMediaIcon htmlColor="tomato" className="w-5 h-5 mr-1" />
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
          <div className="flex mr-5">
            <button
              className="p-2 font-medium text-white border-none rounded-md outline-none cursor-pointer bg-green-button"
              type="button"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
