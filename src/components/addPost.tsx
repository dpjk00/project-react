import React from 'react';
import {useState} from 'react'

export default function AddPost(props: any) {
  const [body, setBody] = useState('');

  const handleSubmit = (e: any) => {
      e.preventDefault();
      props.addPost(body);
      setBody('');
  };    
  
  return (
      <form onSubmit={handleSubmit}>
          <div className="add-post">
              <textarea 
                  name="body" 
                  placeholder='Write your post here'
                  value={body} 
                  onChange={(e) => setBody(e.target.value)}>
              </textarea>
          </div>
          <div className='add-post-btn-container'>
            <button type="submit" className="add-post-btn-submit">Add Post</button>
          </div>
      </form>
  )
}