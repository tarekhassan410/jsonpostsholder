import React from 'react';

export const PostsContext = React.createContext();

export const PostsProvider = props => {
  const getPosts = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(result => result)
      .catch(error => console.log('error happened', error));
  };

  const getPostById = async id => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(result => result)
      .catch(error => console.log('error happened', error));
  };

  const updatePostById = async (id, newPostTitle, newPostDesc) => {
    console.log('new post title', newPostTitle);
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: newPostTitle,
        body: newPostDesc
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(error => console.log('error happened', error));
  };

  const deletePostById = async id => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(result => result)
      .catch(error => console.log('error happened', error));
  };

  return (
    <PostsContext.Provider
      value={{ getPosts, getPostById, updatePostById, deletePostById }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};
