import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './CreateBlog.css';
import photo1 from './pexels-iriser-1379636.jpg';

function CreateBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author: localStorage.getItem('login'),
    title: '',
    content: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...prevFormData.tags, tagInput]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (event) => {
    if (!formData.title || !formData.content || !formData.tags){
      alert("Not all fields are filled!")
    }
    event.preventDefault();
    const res = await axios.post("http://localhost:8080/createBlog", formData);

    if (res.status === 201) {
      navigate('/main');
    }
    else{
      alert(res.data.message)
    }
    console.log(res);
  };

  return (
    <div>
      <img src={photo1} className='bgphoto' alt='BG' />
      <br />
      <br />
      <br />
      <br />
      <div className="blog-post-writing-container">
        <h1>Write a post!</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label><br />
          <input className="blog-title" type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} rows="1" required /><br />

          <label htmlFor="content">Message:</label><br />
          <textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows="4" required /><br />

          <label htmlFor="tags">Tags:</label><br />
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button type="button" onClick={handleAddTag}>Add Tag</button><br />
          <div className="tags-list">
            {formData.tags.map((tag, index) => (
              <div key={index} className="tag-item">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(index)}>x</button>
              </div>
            ))}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
