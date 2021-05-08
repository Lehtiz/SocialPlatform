export default function share() {
  return (
    <div className="w-full h-44 rounded-xl bg-red-primary">
      <div className="">
        <div className="">
          {/* <img className="" src="./assets/avatars/1.jpg" alt="1.jpg" /> */}
          <input type="text" placeholder="Whats on your mind?" className="" />
        </div>
        <hr className="" />
        <div className="" />
        <div className="">
          <div className="">
            <img className="w-6 h-6" src="./assets/icons/media.svg" alt="media" />
            <span className="">photo or video</span>
          </div>
        </div>
      </div>
    </div>
  );
}
