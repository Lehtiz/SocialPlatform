import Share from '../share';
import Post from '../post';
import { Posts } from '../../dummydata';

export default function Feed() {
  return (
    <div className="w-full min-h-full p-3 overflow-y-scroll">
      <div className="w-full">
        <Share />
      </div>
      <div className="w-full">
        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
