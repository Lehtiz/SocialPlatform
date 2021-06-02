import axios from 'axios';
import { useEffect, useState } from 'react';
import { DEFAULT_AVATAR, PROFILES_FOLDER } from '../../constants/const';

export default function Conversation({ conversation, currentUser }) {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    // friends id is the onetaht is not currentUser's id
    const friendId = conversation?.members.find((m) => m !== currentUser?._id);
    // fetch and set friend so we can get name and get profile picture
    const getUser = async () => {
      try {
        const res = await axios.get(`/user/?userId=${friendId}`);
        setFriend(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="flex items-center hover:bg-blue-medium rounded-lg mb-2">
      <img
        className="h-12 w-12 rounded-full mr-2 object-cover"
        src={
          friend?.profilePicture
            ? `${PROFILES_FOLDER + friend?.profilePicture}`
            : `${DEFAULT_AVATAR}`
        }
        alt="profileImage"
      />
      <span className="font-medium">{friend?.username}</span>
    </div>
  );
}
