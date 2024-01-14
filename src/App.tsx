import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/post';
import AddPost from './components/addPost';

type Post = {
  key: number;
  id: number;
  body: string;
};

let localId = 1000;

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await fetch(`${"https://jsonplaceholder.typicode.com/posts"}?_limit=10`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (body: string) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      body: JSON.stringify({
        id: localId,
        key: localId,
        body: body,
        userId: 10000,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();
    data.id = `${localId}`;
    localId += 1;

    setPosts((prevPosts: Post[]) => [data, ...prevPosts]);
  };

  const deletePost = async (id: number) => {
    const response = await fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok)
      setPosts((prevPosts: Post[]) => prevPosts.filter(post => post.id !== id));
  };

  const updatePost = async (id: number, updatedBody: string) => {
    const response = await fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ body: updatedBody }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (response.ok) {
      setPosts((prevPosts: Post[]) =>
        prevPosts.map(post => (post.id === id ? { ...post, body: updatedBody } : post))
      );
    }
  };

  return (
    <main>
      <header>
        <h1>twitter</h1>
      </header>
      <section className="posts-container">
        <div className="add-post-container">
          <AddPost addPost={addPost} />
        </div>
        <h2>Posts</h2>
        {posts.map((post: Post) => (
          <Post key={post.key}
                id={post.id}
                body={post.body}
                deletePost={deletePost}
                updatePost={updatePost}
          />
        ))}
      </section>
    </main>
  );
};

export default App;
