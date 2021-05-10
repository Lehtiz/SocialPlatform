import Header from '../components/header';
import LeftPanel from '../components/leftpanel';
import Feed from '../components/feed';
import RightPanelProfile from '../components/rightpanel/profile';

export default function Profile() {
  return (
    <>
      <div className="flex">
        {/* Moved header absolute upwards to prevent it from being in viewport calc */}
        <div className="absolute left-0 flex w-full h-12 pt-12 -top-12">
          <Header />
        </div>
        <div className="flex justify-between w-full h-screen pt-12">
          <div className="flex w-3/12">
            <LeftPanel />
          </div>
          <div className="w-9/12">
            <div className="w-full">
              <div className="relative flex items-center justify-center w-full mb-1 h-60">
                <img
                  className="object-cover w-full rounded-b-md max-h-60"
                  src="./assets/posts/1.jpg"
                  alt="Cover"
                />
                <div className="absolute transform -translate-x-1/2 left-1/2 top-1/3 w-52 h-52">
                  <img
                    className="object-cover border-4 border-white rounded-full w-52 h-52"
                    src="./assets/avatars/1.jpg"
                    alt="Profile"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mx-20">
                <h4 className="text-4xl font-bold">Name</h4>
                <span className="font-light">
                  <i>"Motto Makes a master"</i>
                </span>
              </div>
            </div>

            <div className="flex">
              <Feed />
              <RightPanelProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
