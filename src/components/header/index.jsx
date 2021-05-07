// import { Search, Person, Chat, Notifications } from '@material-ui/icons';

export default function header() {
  return (
    <div className="flex items-center sticky top-0 bg-blue-medium w-full h-12">
      <div className="flex w-3/12">
        <span className="ml-5 text-white text-2xl font-bold cursor-pointer">Social</span>
      </div>
      <div className="flex w-5/12">
        <div className="flex w-full h-8 bg-white rounded-lg items-center justify-center">
          <img src="./assets/icons/search.svg" alt="search" className="h-6" />
          <input
            placeholder="Search for friend, post or video"
            className="border-none w-11/12 outline-none"
          />
        </div>
      </div>
      <div className="flex w-4/12 items-center justify-around text-white">
        <div className="flex">
          <span className="mr-3 text-lg cursor-pointer">Homepage</span>
          <span className="mr-3 text-lg cursor-pointer">Timeline</span>
        </div>
        <div className="flex">
          <div className="mr-4 cursor-pointer relative">
            <img src="./assets/icons/user.svg" alt="user" className="h-6" />
            <span className="flex items-center justify-center w-4 h-4 bg-red-primary text-xs text-white absolute -top-1 -right-1 rounded-full">
              1
            </span>
          </div>
          <div className="mr-4 cursor-pointer relative">
            <img src="./assets/icons/chat.svg" alt="chat" className="h-6" />
            <span className="flex items-center justify-center w-4 h-4 bg-red-primary text-xs text-white absolute -top-1 -right-1 rounded-full">
              1
            </span>
          </div>
          <div className="mr-4 cursor-pointer relative">
            <img src="./assets/icons/notification.svg" alt="search" className="h-6" />
            <span className="flex items-center justify-center w-4 h-4 bg-red-primary text-xs text-white absolute -top-1 -right-1 rounded-full">
              1
            </span>
          </div>
        </div>
      </div>
      <img
        src="./assets/avatars/1.jpg"
        alt=""
        className="h-8 w-8 border-none rounded-2xl object-cover cursor-pointer mr-3"
      />
    </div>
  );
}
