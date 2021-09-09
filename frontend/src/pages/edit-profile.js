import { useContext, useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import Navbar from '../components/navbar';
import { DEFAULT_AVATAR, DEFAULT_COVER, POSTS_FOLDER, PROFILES_FOLDER } from '../constants/const';
import { AuthContext } from '../context/AuthContext';
import * as ROUTES from '../constants/routes';

export default function Editprofile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
  const [currentCoverPicture, setCurrentCoverPicture] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const username = useRef();
  const email = useRef();
  const desc = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();

  useEffect(() => {
    // get up to date data from db for user
    const getUserData = async () => {
      try {
        const res = await axios.get(`user/?userId=${currentUser._id}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    setCurrentProfilePicture(user?.profilePicture);
    setCurrentCoverPicture(user?.coverPicture);
  }, [user?.profilePicture, user?.coverPicture]);

  // only update non empty input fields values
  const postHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {};

    updatedUser.userId = currentUser._id;
    // check if username submitted
    if (username.current.value !== '') {
      // validate input
      // add key to updatedUser
      updatedUser.username = username.current.value;
    }
    if (email.current.value !== '') {
      updatedUser.email = email.current.value;
    }
    if (desc.current.value !== '') {
      updatedUser.desc = desc.current.value;
    }
    if (city.current.value !== '') {
      updatedUser.city = city.current.value;
    }
    if (from.current.value !== '') {
      updatedUser.from = from.current.value;
    }
    // if (relationship.current.value !== '') {
    //   updatedUser.relationship = relationship.current.value;
    // }

    // only submit if user info has changed
    if (Object.keys(updatedUser).length !== 0) {
      console.log('final updatedUser', updatedUser);
      // TODO api call with updatedUser
      await axios.put(`/user/${currentUser._id}`, updatedUser);
    } else {
      console.log('No changes to user');
    }
    // after changing info update authcontext

    // move user to profile page
    // useHistory.push(ROUTES.PROFILE);
  };

  const handleMenuClose = () => {
    // close menu
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const uploadProfilePicture = async () => {
    const updatedUser = {};
    if (file) {
      const data = new FormData();
      // get extension from orig image
      const fileName = `${currentUser._id}_avatar.${file.name.substring(
        file.name.lastIndexOf('.') + 1
      )}`;
      data.append('name', fileName);
      data.append('file', file);
      updatedUser.profilePicture = fileName;
      // update db first, state change after image setstate causes errors
      // needs userid foir verification
      updatedUser.userId = currentUser._id;
      try {
        // update db
        await axios.put(`/user/${currentUser._id}`, updatedUser);
      } catch (error) {
        console.log(error);
      }
      // upload image
      try {
        await axios.post('/upload', data);
      } catch (error) {
        console.log(error);
      }
      // set new profile image
      setCurrentProfilePicture(fileName);
    }
  };

  const uploadCoverPicture = async () => {
    const updatedUser = {};
    if (file) {
      const data = new FormData();
      // get extension from orig image
      const fileName = `${currentUser._id}_cover.${file.name.substring(
        file.name.lastIndexOf('.') + 1
      )}`;
      data.append('name', fileName);
      data.append('file', file);
      updatedUser.coverPicture = fileName;
      // update db first, state change after image setstate causes errors
      // needs userid foir verification
      updatedUser.userId = currentUser._id;
      try {
        // update db
        await axios.put(`/user/${currentUser._id}`, updatedUser);
      } catch (error) {
        console.log(error);
      }
      // upload image
      try {
        await axios.post('/upload', data);
      } catch (error) {
        console.log(error);
      }
      // set new profile image
      setCurrentCoverPicture(fileName);
    }
  };

  const handleChangeProfilePicture = async () => {
    // file must be selected for uploading
    if (file) {
      uploadProfilePicture();
      // clear file after upload
      setFile(null);
    }
    // close menu
    handleMenuClose();
  };

  const handleChangeCoverPicture = async () => {
    // file must be selected for uploading
    if (file) {
      uploadCoverPicture();
      // clear file after upload
      setFile(null);
    }
    // close menu
    handleMenuClose();
  };

  return (
    <>
      <div className="flex flex-col max-h-screen">
        {/* Moved Navbar absolute upwards to prevent it from being in viewport calc */}
        <div className="absolute left-0 flex w-full h-12 pt-12 -top-12">
          <Navbar />
        </div>
        <div className="flex justify-between w-full h-screen pt-12">
          <div className="flex w-3/12">
            <p>menu</p>
          </div>
          <div className="flex flex-col w-9/12">
            <div className="w-full">
              <div className="relative flex items-center justify-center w-full mb-1 h-60">
                <div className="absolute top-0 right-0 bg-white rounded-full">
                  <form className="absolute top-0 right-0 bg-white rounded-full" method="POST">
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(e) => {
                        setAnchorEl2(e.currentTarget);
                      }}
                      className="outline-none"
                    >
                      <MoreVertIcon className="w-6 h-6 mr-1 cursor-pointer" />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl2}
                      keepMounted
                      open={Boolean(anchorEl2)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem>
                        <label htmlFor="file" className="flex items-center cursor-pointer">
                          <input
                            style={{ display: 'none' }}
                            type="file"
                            id="file"
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          Change cover image
                        </label>
                      </MenuItem>
                      <MenuItem disabled={!file} onClick={handleChangeCoverPicture}>
                        <button type="submit" className="outline-none">
                          Confirm
                        </button>
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>Close</MenuItem>
                    </Menu>
                  </form>
                </div>
                {user?.coverPicture === undefined ? (
                  <Skeleton count={1} width={800} height={240} className="" />
                ) : (
                  <img
                    className="object-cover w-full rounded-b-md max-h-60"
                    src={
                      user?.coverPicture ? POSTS_FOLDER + currentCoverPicture : `${DEFAULT_COVER}`
                    }
                    alt={`${user?.username}'s cover`}
                  />
                )}

                <div className="absolute transform -translate-x-1/2 left-1/2 top-1/3 w-52 h-52">
                  <form className="absolute top-0 right-0 bg-white rounded-full" method="POST">
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                      }}
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
                      <MenuItem>
                        <label htmlFor="file" className="flex items-center cursor-pointer">
                          <input
                            style={{ display: 'none' }}
                            type="file"
                            id="file"
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          Change profile image
                        </label>
                      </MenuItem>
                      <MenuItem disabled={!file} onClick={handleChangeProfilePicture}>
                        <button type="submit" className="outline-none">
                          Confirm
                        </button>
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>Close</MenuItem>
                    </Menu>
                  </form>
                  {user?.profilePicture === undefined ? (
                    <Skeleton circle width="100%" height="100%" />
                  ) : (
                    <img
                      className="object-cover border-4 border-white rounded-full w-52 h-52"
                      src={
                        user?.profilePicture
                          ? `${PROFILES_FOLDER + currentProfilePicture}`
                          : `${DEFAULT_AVATAR}`
                      }
                      alt={`${user?.username}'s avatar`}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mx-20">
                {user?.username === undefined ? (
                  <Skeleton count={1} width={300} height={30} />
                ) : (
                  <h4 className="text-4xl font-bold">{user?.username}</h4>
                )}
                {user?.desc === undefined ? (
                  <Skeleton count={1} width={300} height={30} />
                ) : (
                  <span className="font-light">
                    <i>{user?.desc}</i>
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full h-full overflow-y-auto">
              <form className="flex flex-col w-3/5 p-2" onSubmit={postHandler} method="POST">
                <h1 className="text-4xl font-medium mt-2 mb-4">Fill values you want to change</h1>
                <label
                  htmlFor="username"
                  aria-label="username"
                  className="mb-2 font-medium text-xl"
                >
                  Name:
                  <input
                    ref={username}
                    name="username"
                    id="username"
                    type="text"
                    placeholder={currentUser.username}
                    className="ml-2 outline-none"
                  />
                </label>
                <label htmlFor="desc" aria-label="desc" className="mb-2 font-medium text-xl">
                  Email:
                  <input
                    ref={email}
                    name="desc"
                    id="desc"
                    type="text"
                    placeholder={currentUser.desc === '' ? 'Empty' : currentUser.email}
                    className="ml-2 outline-none"
                  />
                </label>
                <label htmlFor="desc" aria-label="desc" className="mb-2 font-medium text-xl">
                  Description:
                  <input
                    ref={desc}
                    name="desc"
                    id="desc"
                    type="text"
                    placeholder={currentUser.desc === '' ? 'Empty' : currentUser.desc}
                    className="ml-2 outline-none"
                  />
                </label>
                <label htmlFor="city" aria-label="city" className="mb-2 font-medium text-xl">
                  City:
                  <input
                    ref={city}
                    name="city"
                    id="city"
                    type="text"
                    placeholder={currentUser.city === '' ? 'Empty' : currentUser.city}
                    className="ml-2 outline-none"
                  />
                </label>
                <label htmlFor="from" aria-label="from" className="mb-2 font-medium text-xl">
                  From:
                  <input
                    ref={from}
                    name="from"
                    id="from"
                    type="text"
                    placeholder={currentUser.from === '' ? 'Empty' : currentUser.from}
                    className="ml-2 outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="border text-white bg-green-button rounded-lg outline-none"
                >
                  Submit
                </button>
              </form>
              <div className="flex w-2/5 h-full overflow-y-auto">
                <span>temp2</span>
              </div>
            </div>
            <span>Some changes require you to re-login to take effect</span>
          </div>
        </div>
      </div>
    </>
  );
}
