import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Share from './share';
import Post from './post';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      // if username provided, show that profile, otherwise default to current currentUser
      const res =
        username !== undefined
          ? await axios.get(`/post/profile/${username}`)
          : await axios.get(`/post/timeline/${currentUser._id}`);
      setPosts(res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
    };
    fetchPosts();
  }, [username, currentUser._id]);

  return (
    <div className="w-full min-h-full p-3 overflow-y-scroll">
      {
        // show share component on home page and own profile page
        (!username || currentUser.username === username) && (
          <div className="w-full">
            <Share />
          </div>
        )
      }

      <div className="w-full">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
