import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';

export default function index() {
  return (
    <div className="w-full mt-3 overflow-y-scroll rounded-lg shadow-lg">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <img
              src="./assets/avatars/2.jpg"
              alt="profileImage"
              className="object-cover w-12 h-12 rounded-full"
            />
            <span className="mx-2 text-base">Username</span>
            <span className="mx-2 text-base opacity-70">5 mins ago</span>
          </div>
          <div className="">
            <MoreVertIcon className="w-6 h-6 mr-1 cursor-pointer" />
          </div>
        </div>
        <div className="my-5">
          <span className="">Heeeyyyy! it's my 1st post :)</span>
          <img
            src="./assets/posts/1.jpg"
            alt="post"
            className="object-contain w-full mt-5 max-h-96"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FavoriteBorderIcon className="w-6 h-6 mr-1 cursor-pointer" />
            <ExposurePlus1Icon className="w-6 h-6 mr-1 cursor-pointer" />
            <span className="text-sm">34 likes</span>
          </div>
          <div className="text-sm border-b border-dashed cursor-pointer border-gray-border">
            <span>9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
