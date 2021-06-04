import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { DEFAULT_AVATAR, PROFILES_FOLDER } from '../../constants/const';

export default function Conversation({ conversation, currentUser, setCurrentConversation }) {
  const [friend, setFriend] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // get the other users info for conversation
  useEffect(() => {
    // friends id is the one that is not currentUser's id
    const friendId = conversation?.members.find((m) => m !== currentUser._id);
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

  const handleDeleteConversation = async () => {
    const reqBody = {
      userId: currentUser._id
    };
    try {
      // api call to delete conversation
      await axios.delete(`/conversations/${conversation._id}/delete`, { data: reqBody });
    } catch (error) {
      console.log(error);
    }
    // refresh page
    window.location.reload();
  };
  const handleSelectConversation = () => {
    console.log('select convo', conversation._id);
    setCurrentConversation(conversation);
  };

  const handleMenuOpen = (event) => {
    // open menu
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    // close menu
    setAnchorEl(null);
  };
  return (
    <div className="flex w-full justify-between">
      <div
        role="button"
        tabIndex="0"
        onClick={handleSelectConversation}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSelectConversation();
          }
        }}
        className="flex w-full items-center hover:bg-blue-medium rounded-lg mb-2"
      >
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
      <div className="items-end">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          className="outline-none"
        >
          <MoreVertIcon className="w-6 h-6 mr-1 cursor-pointer" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDeleteConversation}>Delete Conversation</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
