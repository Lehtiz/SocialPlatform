import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import { useEffect, useState } from 'react';
import { PF } from '../../constants/const';

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`user/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const likeHandler = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full mt-3 overflow-y-scroll rounded-lg shadow-lg">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <img
              src={
                user.profilePicture !== ''
                  ? PF + user.profilePicture
                  : `${PF}default_profile_image.jpg`
              }
              alt="profileImage"
              className="object-cover w-12 h-12 rounded-full"
            />
            <span className="mx-2 text-base">{user.username}</span>
            <span className="mx-2 text-base opacity-70">
              Post age: {formatDistanceToNow(parseISO(post.updatedAt))}
            </span>
          </div>
          <MoreVertIcon className="w-6 h-6 mr-1 cursor-pointer" />
        </div>
        <div className="my-5">
          <span className="">{post?.desc}</span>
          {post.img !== undefined ? (
            <img src={PF + post.img} alt="post" className="object-contain w-full mt-5 max-h-96" />
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FavoriteBorderIcon className="w-6 h-6 mr-1 cursor-pointer" />
            <ExposurePlus1Icon className="w-6 h-6 mr-1 cursor-pointer" onClick={likeHandler} />
            <span className="text-sm">
              {likes.length} {likes.length === 1 ? `like` : `likes`}
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
