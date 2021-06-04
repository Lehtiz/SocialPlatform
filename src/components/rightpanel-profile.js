/* eslint-disable no-nested-ternary */
// import CakeIcon from '@material-ui/icons/Cake';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Add, Remove } from '@material-ui/icons';
import { PROFILES_FOLDER, DEFAULT_AVATAR } from '../constants/const';
import { AuthContext } from '../context/AuthContext';

export default function RightPanelProfile({ user }) {
  const history = useHistory();
  const [friends, setFriends] = useState([]);
  const [conversation, setConversation] = useState(null);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  // check followings state
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser.followings, user?._id]);

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
    // dont make api call without user initialized (1st render)
    if (user._id !== undefined) {
      getFriends();
    } else {
      return null;
    }
  }, [user._id]);

  // Get conversations between users
  useEffect(() => {
    // get conversation between users
    const getConversation = async () => {
      // Only check for conversations if user is initialized
      if (user !== undefined) {
        // dont get conversations if looking at own profilepage
        if (user._id !== currentUser._id) {
          try {
            // see if there exists a chat between users
            const res = await axios.get(`/conversations/find/${currentUser._id}/${user._id}`);
            // if chat between users does exist we can link to it
            // res.data is can be empty if there are no conversations between users
            setConversation(res.data?._id);
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    getConversation();
  }, [user._id, conversation]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`/user/${user._id}/unfollow`, { userId: currentUser._id });
        dispatch({ type: 'UNFOLLOW', payload: user._id });
      } else {
        await axios.put(`/user/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: 'FOLLOW', payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const chatHandler = async () => {
    if (!conversation) {
      // create a new chat between user and CurrentUser
      const createConversation = async () => {
        const reqBody = {
          senderId: currentUser._id,
          receiverId: user._id
        };
        try {
          const res = await axios.post('/conversations', reqBody);
          // Return id of the created conversation
          return res.data.savedConversation._id;
        } catch (error) {
          console.log(error);
        }
      };
      // Wait for the creation to complete
      createConversation()
        // Move user to the messengers new conversation
        .then((conversation) => {
          history.push(`/messenger/${conversation}`);
        });
    } else {
      history.push(`/messenger/${conversation}`);
    }
  };

  return (
    <>
      <div className="w-full min-h-full p-3 overflow-y-scroll">
        {user._id !== currentUser._id && (
          <div className="flex">
            <button
              type="button"
              className="flex cursor-pointer px-3 py-2 border-2 rounded-lg outline-none text-white bg-blue-medium items-center font-medium text-base"
              onClick={followHandler}
            >
              {followed ? 'Unfollow' : 'Follow'}
              {followed ? <Remove /> : <Add />}
            </button>
            <button
              type="button"
              className="flex cursor-pointer px-3 py-2 border-2 rounded-lg outline-none text-white bg-blue-medium items-center font-medium text-base"
              onClick={chatHandler}
            >
              {conversation ? 'Open chat' : 'Start a chat'}
            </button>
          </div>
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
