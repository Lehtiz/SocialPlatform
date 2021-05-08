export default function share() {
  return (
    <div className="shadow-lg h-44 rounded-xl">
      <div className="p-2">
        <div className="flex items-center mb-1">
          <img
            className="object-cover w-12 h-12 mr-3 rounded-full"
            src="./assets/avatars/1.jpg"
            alt="1.jpg"
          />
          <input type="text" placeholder="Whats on your mind?" className="w-4/5 outline-none" />
        </div>
        <hr className="m-5" />
        <div className="flex items-center justify-between" />
        <div className="flex mx-4">
          <div className="flex items-center mr-4 cursor-pointer">
            <img className="w-5 h-5 mr-1" src="./assets/icons/media.svg" alt="media" />
            <span className="">photo or video</span>
          </div>
          <div className="flex items-center mr-4 cursor-pointer">
            <img className="w-5 h-5 mr-1" src="./assets/icons/tag.svg" alt="tag" />
            <span className="">Tag</span>
          </div>
          <div className="flex items-center mr-4 cursor-pointer">
            <img className="w-5 h-5 mr-1" src="./assets/icons/location.svg" alt="location" />
            <span className="">Location</span>
          </div>
          <div className="flex items-center mr-4 cursor-pointer">
            <img className="w-5 h-5 mr-1" src="./assets/icons/emote-happy.svg" alt="emotions" />
            <span className="">Emotion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
