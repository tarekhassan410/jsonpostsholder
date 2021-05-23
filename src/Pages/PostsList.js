import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { PostsContext } from "../Context/PostsContext";

export default function PostsList() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getPosts } = useContext(PostsContext);
  const isFirstRun = useRef(true);

  useEffect(() => {
    setLoading(true);
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const timeoutID = window.setTimeout(() => {
      let filteredPosts = [...allPosts];
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.includes(searchKeyword.toLowerCase()) ||
          post.body.includes(searchKeyword.toLowerCase())
      );
      setLoading(false);
      setPosts(filteredPosts);
    }, 500);

    return () => window.clearTimeout(timeoutID);
  }, [searchKeyword]);

  useEffect(() => {
    getPosts().then((response) => {
      setAllPosts(response);
      setPosts(response);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-10">
      <input
        type="text"
        className="w-full rounded-lg border-2 border-indigo-600 p-2 mb-4 outline-none"
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="search posts"
      />

      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {posts.map((post) => (
        <div
          className="shadow-lg bg-white rounded-lg my-3 mt-1 p-4"
          key={post.id}
        >
          {" "}
          <Link to={"/post/" + post.id}>
            <p className="text-indigo-900 text-2xl font-semibold">
              {post.title}
            </p>
            <p className="text-indigo-700 text-sm mt-2">{post.body}</p>
          </Link>{" "}
        </div>
      ))}
    </div>
  );
}
