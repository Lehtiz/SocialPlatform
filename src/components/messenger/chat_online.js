/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DEFAULT_AVATAR, PROFILES_FOLDER } from '../../constants/const';

export default function ChatOnline({
  onlineUsers,
  currentId,
  setCurrentConversation,
  currentConversationId
}) {
  const [friends, setFriends] = useState([]);
  const [onlinefriends, setOnlineFriends] = useState([]);

  // get friends for currentUser
  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/user/${currentId}/friends`);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentId]);

  // filter online frieds
  useEffect(() => {
    // filter from friends only users who are online via socket
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers, friends]);

  // Select active conversation
  const handleSelectConversation = async (user) => {
    try {
      // get conversation between users
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
      if (res.data._id !== currentConversationId) {
        setCurrentConversation(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {onlinefriends.map((o) => (
        <div
          key={o._id}
          className="flex w-full items-center hover:bg-blue-medium rounded-lg cursor-pointer mb-2"
          onClick={() => handleSelectConversation(o)}
        >
          <div className="relative">
            <img
              className="h-12 w-12 rounded-full mr-2 object-cover"
              src={
                o?.profilePicture ? `${PROFILES_FOLDER + o?.profilePicture}` : `${DEFAULT_AVATAR}`
              }
              alt={o?.username}
            />
            <span className="absolute top-0 right-2 w-4 h-4 border-2 border-white rounded-full bg-green-online" />
          </div>
          <span className="font-medium">{o.username}</span>
        </div>
      ))}
    </div>
  );
}
