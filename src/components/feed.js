import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Share from './share';
import Post from './post';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      // if username provided, show that profile, otherwise default to current user
      const res =
        username !== undefined
          ? await axios.get(`/post/profile/${username}`)
          : await axios.get(`/post/timeline/${user._id}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="w-full min-h-full p-3 overflow-y-scroll">
      <div className="w-full">
        <Share />
      </div>
      <div className="w-full">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
