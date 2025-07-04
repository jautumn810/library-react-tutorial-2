import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  const { id } = useParams();             // Get dynamic ID from the URL
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(id);

  function onSearch() {
    fetchPosts();
  }

  async function fetchPosts() {
    setLoading(true);
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${searchId || id}`);
    setPost(data);
    setLoading(false);
  }

  function onSearchKeyPress(key) {
    if (key === 'Enter') {
      onSearch();
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [searchId]); // Added searchId to the dependency array

  return (
    <>
      <Link to="/">
        <div className="post__search">
          <button>← Back</button>
        </div>
      </Link>
      <div className="post__search--container">
        <label className="post__search--label">Search by Id</label>
        <input
          type="number"
          value={searchId}
          onChange={(event) => setSearchId(event.target.value)}
          onKeyPress={(event) => onSearchKeyPress(event.key)}
        />
        <button onClick={() => onSearch()}>Enter</button>
      </div>

      {loading ? (
        <>
          {new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">Loading...</div>
              <p className="post__body">Loading...</p>
            </div>
          ))}
        </>
      ) : (
        Array.isArray(post) && post.map((post) => ( // Ensure post is an array
          <div className="post" key={post.id}>
            <div className="post__title">{post.title}</div>
            <p className="post__body">{post.body}</p>
          </div>
        ))
      )}
    </>
  );
};

export default Posts;

