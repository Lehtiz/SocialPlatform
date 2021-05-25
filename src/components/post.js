import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROFILES_FOLDER, POSTS_FOLDER, DEFAULT_AVATAR } from '../constants/const';
import { AuthContext } from '../context/AuthContext';

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // Get posts user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/post/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full mt-3 overflow-y-scroll rounded-lg shadow-lg">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? `${PROFILES_FOLDER + user.profilePicture}`
                    : `${DEFAULT_AVATAR}`
                }
                alt="profileImage"
                className="object-cover w-12 h-12 rounded-full cursor-pointer"
              />
            </Link>
            <span className="mx-2 text-base font-medium">{user.username}</span>
            <span className="mx-2 text-base opacity-70">
              Post age: {formatDistanceToNow(parseISO(post.createdAt))}
            </span>
          </div>
          <MoreVertIcon className="w-6 h-6 mr-1 cursor-pointer" />
        </div>
        <div className="my-5">
          <span className="">{post?.desc}</span>
          {post.img !== undefined ? (
            <img
              src={POSTS_FOLDER + post.img}
              alt="post"
              className="object-contain w-full mt-5 max-h-96"
            />
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isLiked
              ? post.userId !== currentUser._id && (
                  <FavoriteIcon className="w-6 h-6 mr-1 cursor-pointer" color="secondary" />
                )
              : post.userId !== currentUser._id && (
                  <FavoriteBorderIcon className="w-6 h-6 mr-1 cursor-pointer" />
                )}
            {post.userId !== currentUser._id && (
              <ExposurePlus1Icon className="w-6 h-6 mr-1 cursor-pointer" onClick={likeHandler} />
            )}
            <span className="text-sm">
              {likes} {likes === 1 ? `like` : `likes`}
            </span>
          </div>
          <div className="text-sm border-b border-dashed cursor-pointer border-gray-border">
            <span>
              {post.comments !== undefined ? post.comments.length : 'no'}{' '}
              {post.comments === 1 ? `comment` : `comments`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
