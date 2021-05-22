import { useEffect, useState } from 'react';
import axios from 'axios';
import Share from '../share';
import Post from '../post';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('post/timeline/609450ac1daeaf3b74f56c38');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full min-h-full p-3 overflow-y-scroll">
      <div className="w-full">
        <Share />
      </div>
      <div className="w-full">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
