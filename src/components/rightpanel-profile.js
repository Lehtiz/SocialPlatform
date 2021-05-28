/* eslint-disable no-nested-ternary */
// import CakeIcon from '@material-ui/icons/Cake';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Add, Remove } from '@material-ui/icons';
import { PROFILES_FOLDER, DEFAULT_AVATAR } from '../constants/const';
import { AuthContext } from '../context/AuthContext';

export default function RightPanelProfile({ user }) {
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(null);
  const { user: currentUser } = useContext(AuthContext);

  // get friends for profile
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/user/${user._id}/friends`);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user._id]);

  // check followings state
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
    console.log(currentUser.followings);
    console.log(followed);
  }, [currentUser, user?.id]);

  const followHandler = async () => {
    console.log('clicked', user.username, currentUser.username);
    try {
      if (followed) {
        await axios.put(`/user/${user._id}/unfollow`, { userId: currentUser._id });
      } else {
        await axios.put(`/user/${user._id}/follow`, { userId: currentUser._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
    // check if following
    // friendList.includes(user._id) ? await axios.get(`/user/${user._id}/unfollow`, userId): await axios.get(`/user/${user._id}/unfollow`);
    // toggle follow
  };

  return (
    <>
      <div className="w-full min-h-full p-3 overflow-y-scroll">
        {user.username !== currentUser.username && (
          <button
            type="button"
            className="flex cursor-pointer px-3 py-2 border-2 rounded-lg outline-none text-white bg-blue-medium items-center font-medium text-base"
            onClick={followHandler}
          >
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h1 className="mb-1 text-4xl font-medium">User information</h1>
        <div className="mb-4">
          <div className="mb-1">
            <span className="mr-2 font-medium text-gray-light">City:</span>
            <span className="font-normal">{user.city !== '' ? user.city : '-'}</span>
          </div>
          <div className="mb-1">
            <span className="mr-2 font-medium text-gray-light">From:</span>
            <span className="font-normal">{user.from !== '' ? user.from : '-'}</span>
          </div>
          <div className="mb-1">
            <span className="mr-2 font-medium text-gray-light">Relationship:</span>
            <span className="font-normal">
              {user.relatioship === 0
                ? 'Complicated'
                : user.relationship === 1
                ? 'Single'
                : user.relationship === 2
                ? 'In Relationship'
                : user.relationship === 3
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <p className="mb-1 text-4xl font-medium">User Friends</p>
        <div className="flex flex-wrap items-center">
          {friends.map((friend) => (
            <Link key={friend._id} to={`/profile/${friend.username}`}>
              <div className="flex-col items-center mb-4 mr-4">
                <img
                  src={
                    friend.profilePicture
                      ? `${PROFILES_FOLDER + friend.profilePicture}`
                      : `${DEFAULT_AVATAR}`
                  }
                  alt="name"
                  className="object-cover w-32 h-32 rounded-lg cursor-pointer"
                />
                <span className="text-base font-medium">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
