import './home.css';
import Header from '../../components/header';
import LeftPanel from '../../components/leftpanel';
import Feed from '../../components/feed';
import RightPanel from '../../components/rightpanel';

export default function home() {
  return (
    <>
      <Header />
      <Feed />
      <LeftPanel />
      <RightPanel />
    </>
  );
}
