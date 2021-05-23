import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { PostsContext } from "../Context/PostsContext";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [editingMode, setEditingMode] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState(false);
  const [newPostDesc, setNewPostDesc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateError, setUpdateError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);

  const { getPostById, deletePostById, updatePostById } =
    useContext(PostsContext);

  useEffect(() => {
    getPostById(id).then((response) => {
      setPost(response);
      setLoading(false);
    });
  }, [id]);

  function updatePost() {
    if (newPostTitle.length == 0 || newPostDesc == 0) {
      setUpdateError(true);
      return;
    }
    setLoading(true);
    updatePostById(post.id, newPostTitle, newPostDesc).then((response) => {
      setPost(response);
      setUpdateError(false);
      setLoading(false);
      setEditingMode(false);
    });
  }

  function deletePost(id) {
    deletePostById(id)
      .then((response) => {
        setPostDeleted(true);
      })
      .catch((error) => {
        setDeleteError(true);
      });
  }

  return (
    <div className="pt-10">
      {" "}
      <Link to="/">
        <button className="px-3 py-2 bg-white rounded-lg mb-4 shadow-lg">
          <i className="fas fa-arrow-left mr-1" />
          Back{" "}
        </button>
      </Link>
      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
      {updateError && (
        <div className="bg-red-500 rounded-lg mb-2 p-4 text-white">
          Error happened during update
        </div>
      )}
      {postDeleted && (
        <div className="bg-green-700 rounded-lg mb-2 p-4 text-white">
          Post deleted successfully
        </div>
      )}
      {deleteError && (
        <div className="bg-red-500 rounded-lg mb-2 p-4 text-white">
          Error happened during delete
        </div>
      )}
      {editingMode == true ? (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div>
            <div>
              <label> Post title </label>
            </div>
            <input
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="title"
              className="mt-2 w-full rounded-lg border-2 border-gray-600 p-2 mb-8 outline-none"
            />
          </div>
          <div>
            <div>
              <label> Post description </label>
            </div>
            <input
              onChange={(e) => setNewPostDesc(e.target.value)}
              placeholder="description"
              className="mt-2 w-full rounded-lg border-2 border-gray-600 p-2 mb-8 outline-none"
            />
          </div>
          <div className="text-center">
            {" "}
            <button
              className="px-3 py-2 bg-green-500 mx-2 text-white rounded-lg mb-8 shadow-lg"
              onClick={() => updatePost()}
            >
              {" "}
              update{" "}
            </button>
            <button
              className="px-3 py-2 bg-gray-500 mx-2 text-white rounded-lg mb-8 shadow-lg"
              onClick={() => setEditingMode(false)}
            >
              {" "}
              cancel{" "}
            </button>{" "}
          </div>
        </div>
      ) : (
        !postDeleted &&
        !loading && (
          <div className="bg-white shadow-lg rounded-lg p-4">
            {" "}
            <div className="text-indigo-900 text-2xl font-semibold">
              <p>{post.title}</p>
            </div>
            <div className="mt-4">{post.body}</div>
            <div className="flex flex-row justify-end mt-4">
              {" "}
              <i
                onClick={() => {
                  setNewPostTitle("");
                  setNewPostDesc("");
                  setEditingMode(true);
                }}
                className="mx-2 fas fa-pen text-green-500"
              />
              <i
                onClick={() => deletePost(post.id)}
                className="mx-2 fas fa-trash text-red-500"
              />
            </div>
          </div>
        )
      )}
      <div
        className={
          id == 1
            ? "flex flex-row justify-end mt-2"
            : "flex flex-row justify-between mt-2"
        }
      >
        {id != 1 && (
          <Link
            to={"/post/" + (parseInt(id) - 1)}
            onClick={() => {
              setLoading(true);
              setPostDeleted(false);
            }}
          >
            <button className="px-3 py-2 bg-white rounded-lg mb-4 shadow-lg">
              {" "}
              <i className="fas fa-backward mr-1"></i>
              Previous post{" "}
            </button>
          </Link>
        )}
        {id != 100 && (
          <Link
            to={"/post/" + (parseInt(id) + 1)}
            onClick={() => {
              setLoading(true);
              setPostDeleted(false);
            }}
          >
            <button className="px-3 py-2 bg-white rounded-lg mb-4 shadow-lg">
              {" "}
              Next post <i className="fas fa-forward mr-1"></i>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
