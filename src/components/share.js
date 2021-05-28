import RoomIcon from '@material-ui/icons/Room';
import LabelIcon from '@material-ui/icons/Label';
import MoodIcon from '@material-ui/icons/Mood';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { Cancel } from '@material-ui/icons';
import { DEFAULT_AVATAR, PROFILES_FOLDER } from '../constants/const';
import { AuthContext } from '../context/AuthContext';

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    };

    // file upload to api
    if (file) {
      const data = new FormData();
      const fileName = `${user._id}_${Date.now()}_${file.name}`;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;
      try {
        await axios.post('/upload', data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post('/post', newPost);
      // refresh after post
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-lg rounded-xl">
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
            ref={desc}
          />
        </div>
        <hr className="m-5" />
        {file && (
          <div className="relative px-5 pb-2 w-full">
            <img src={URL.createObjectURL(file)} alt="" className="object-cover" />
            <Cancel
              className="absolute top-0 right-5 cursor-pointer text-white opacity-75"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="flex items-center justify-between" onSubmit={handleSubmit}>
          <div className="flex ml-5">
            <label htmlFor="file" className="flex items-center mr-4 cursor-pointer">
              <PermMediaIcon htmlColor="tomato" className="w-5 h-5 mr-1" />
              <span className="">photo or video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
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
              type="submit"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
