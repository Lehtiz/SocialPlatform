import { fromUnixTime, formatDistanceToNow } from 'date-fns';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import { useState } from 'react';
import { Users } from '../../dummydata';

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

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
              src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
              alt="profileImage"
              className="object-cover w-12 h-12 rounded-full"
            />
            <span className="mx-2 text-base">
              {Users.filter((u) => u.id === post.userId)[0].username}
            </span>
            <span className="mx-2 text-base opacity-70">
              Post age: {formatDistanceToNow(fromUnixTime(post.date))}
            </span>
          </div>
          <MoreVertIcon className="w-6 h-6 mr-1 cursor-pointer" />
        </div>
        <div className="my-5">
          <span className="">{post?.desc}</span>
          <img src={post.photo} alt="post" className="object-contain w-full mt-5 max-h-96" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FavoriteBorderIcon className="w-6 h-6 mr-1 cursor-pointer" />
            <ExposurePlus1Icon className="w-6 h-6 mr-1 cursor-pointer" onClick={likeHandler} />
            <span className="text-sm">
              {likes} {likes === 1 ? `like` : `likes`}
            </span>
          </div>
          <div className="text-sm border-b border-dashed cursor-pointer border-gray-border">
            <span>
              {post.comments} {post.comments === 1 ? `comment` : `comments`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
