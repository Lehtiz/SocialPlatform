import './header.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';

export default function header() {
  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <span className="headerLogo">Social</span>
      </div>
      <div className="headerCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friend, post or video" className="searchbarInput" />
        </div>
      </div>
      <div className="headerRight">
        <div className="headerLinksContainer">
          <span className="headerLink">Homepage</span>
          <span className="headerLink">Timeline</span>
        </div>
        <div className="headerIconsContainer">
          <div className="headerIconItem">
            <Person />
            <span className="headerIconBadge">1</span>
          </div>
          <div className="headerIconItem">
            <Chat />
            <span className="headerIconBadge">1</span>
          </div>
          <div className="headerIconItem">
            <Notifications />
            <span className="headerIconBadge">1</span>
          </div>
        </div>
      </div>
      <img src="./assets/avatars/1.jpg" alt="" className="headerImg" />
    </div>
  );
}
