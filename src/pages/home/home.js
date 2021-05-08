// webkit overrides for scrollbar styling
import './home.css';
import Header from '../../components/header';
import LeftPanel from '../../components/leftpanel';
import Feed from '../../components/feed';
import RightPanel from '../../components/rightpanel';

export default function home() {
  return (
    <>
      <div className="flex">
        {/* Moved header absolute upwards to prevent it from being in viewport calc */}
        <div className="absolute left-0 flex w-full h-12 pt-12 -top-12">
          <Header />
        </div>
        <div className="flex justify-between w-full h-screen pt-12 ">
          <LeftPanel />
          <Feed />
          <RightPanel />
        </div>
      </div>
    </>
  );
}
