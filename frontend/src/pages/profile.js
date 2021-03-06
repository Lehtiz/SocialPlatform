import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import Navbar from '../components/navbar';
import LeftPanel from '../components/leftpanel';
import Feed from '../components/feed';
import RightPanelProfile from '../components/rightpanel-profile';
import { PROFILES_FOLDER, POSTS_FOLDER, DEFAULT_AVATAR, DEFAULT_COVER } from '../constants/const';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const { username } = useParams();

  // get user whose profile this is
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <div className="flex flex-col max-h-screen">
        {/* Moved Navbar absolute upwards to prevent it from being in viewport calc */}
        <div className="absolute left-0 flex w-full h-12 pt-12 -top-12">
          <Navbar />
        </div>
        <div className="flex justify-between w-full h-screen pt-12">
          <div className="flex w-3/12">
            <LeftPanel />
          </div>
          <div className="flex flex-col w-9/12">
            <div className="w-full">
              <div className="relative flex items-center justify-center w-full mb-1 h-60">
                {user.coverPicture === undefined ? (
                  <Skeleton count={1} width={800} height={240} className="" />
                ) : (
                  <img
                    className="object-cover w-full rounded-b-md max-h-60"
                    src={user.coverPicture ? POSTS_FOLDER + user.coverPicture : `${DEFAULT_COVER}`}
                    alt={`${user.username}'s cover`}
                  />
                )}

                <div className="absolute transform -translate-x-1/2 left-1/2 top-1/3 w-52 h-52">
                  {user.profilePicture === undefined ? (
                    <Skeleton circle width="100%" height="100%" />
                  ) : (
                    <img
                      className="object-cover border-4 border-white rounded-full w-52 h-52"
                      src={
                        user.profilePicture
                          ? `${PROFILES_FOLDER + user.profilePicture}`
                          : `${DEFAULT_AVATAR}`
                      }
                      alt={`${user.username}'s avatar`}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mx-20">
                {user.username === undefined ? (
                  <Skeleton count={1} width={300} height={30} />
                ) : (
                  <h4 className="text-4xl font-bold">{user.username}</h4>
                )}
                {user.desc === undefined ? (
                  <Skeleton count={1} width={300} height={30} />
                ) : (
                  <span className="font-light">
                    <i>{user.desc}</i>
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full h-full overflow-y-auto">
              <div className="flex w-3/5">
                <Feed username={username} />
              </div>
              <div className="flex w-2/5 h-full overflow-y-auto">
                <RightPanelProfile user={user} />
              </div>
              {
                // show edit link for authed currenuser only
                username === currentUser.username && (
                  <Link className="absolute top-64 z-10 bg-white rounded-lg p-2" to="/edit-profile">
                    Edit profile
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
