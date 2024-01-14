import React, { useState, useEffect } from 'react';

type PostProps = {
  id: number;
  body: string;
  deletePost: (id: number) => void;
  updatePost: (id: number, updatedBody: string) => void;
};

export default function Post(props: PostProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBody, setUpdatedBody] = useState(props.body);
  const [username, setUsername] = useState<string>();

  const handleUpdate = () => {
    props.updatePost(props.id, updatedBody);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchThumbnailUrl = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${props.id}`);
      const data = await response.json();
      setThumbnailUrl(data.thumbnailUrl);
    };

    const fetchUsernames = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${props.id}`);
      const data = await response.json();
      setUsername(data.username);
    };

    fetchUsernames();
    fetchThumbnailUrl();
  }, [props.id]);

  return (
    <div className="post-card">
      <div className="user-image-container">
        <p className='user-username'>@{username || "admin"}</p>
        {thumbnailUrl && <img src={thumbnailUrl} alt="User" className="user-image" width="100" height="100" />}
      </div>
      <div className="post-card-container">
        {isEditing ? (
          <div className="post-update-container">
            <textarea value={updatedBody} onChange={(e) => setUpdatedBody(e.target.value)} />
            <div className="post-update-btn-container">
              <button className="post-btn-delete" onClick={handleUpdate}>Update</button>
            </div>
          </div>
        ) : (
          <>
            <p className="post-body">{props.body}</p>
            <div className="post-container-delete-btn">
              <button className="post-btn-delete" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="post-btn-delete" onClick={() => props.deletePost(props.id)}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
