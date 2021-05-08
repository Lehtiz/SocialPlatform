import Share from '../share';
import Post from '../post';

export default function feed() {
  return (
    <div className="w-full min-h-full p-3 overflow-y-scroll">
      <div className="">
        <Share />
      </div>
      <div className="">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
