import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Myblogs.css';  // Import the CSS file
import photo1 from './pexels-iriser-1379636.jpg';


const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', content: '' });

  const auth = localStorage.getItem("login");

  const callBlogs = async () => {
    try {
      console.log("Fetching blogs...");
      const result = await axios.post("http://localhost:8080/getUserBlogs", { auth });

      if (result.status === 200) {
        setBlogs(result.data.data);
        console.log(result.data.data); // Logs the fetched blogs
      } else {
        console.error("Failed to fetch blogs", result.status);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const result = await axios.delete(`http://localhost:8080/deleteBlog/${blogId}`);

      if (result.status === 200) {
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      } else {
        console.error("Failed to delete blog", result.status);
      }
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  const startEditing = (blog) => {
    setIsEditing(blog._id);
    setEditFormData({ title: blog.title, content: blog.content });
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setEditFormData({ title: '', content: '' });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const updateBlog = async (blogId) => {
    try {
      const result = await axios.put(`http://localhost:8080/updateBlog/${blogId}`, editFormData);

      if (result.status === 200) {
        const updatedBlogs = blogs.map(blog =>
          blog._id === blogId ? { ...blog, ...editFormData } : blog
        );
        setBlogs(updatedBlogs);
        setIsEditing(null);
      } else {
        console.error("Failed to update blog", result.status);
      }
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  useEffect(() => {
    callBlogs();
  });

  return (
    <div>
      <img src={photo1} className='bgphoto' alt='BG'/>
      <div className='unique-blogs-container'>
        <br />
        <br />
        <br />
        <br />
        {blogs.map((blog, index) => (
          <div key={index} className='box-folder'>
            <div className="unique-blog-box">
              {isEditing === blog._id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleUpdateChange}
                    className="unique-edit-input"
                  />
                  <textarea
                    name="content"
                    value={editFormData.content}
                    onChange={handleUpdateChange}
                    className="unique-edit-textarea"
                  />
                  <button onClick={() => updateBlog(blog._id)} className="unique-blog-button unique-blog-edit">Save</button>
                  <button onClick={cancelEditing} className="unique-blog-button">Cancel</button>
                </div>
              ) : (
                <div>
                  <h2 className="unique-blog-title">{blog.title}</h2>
                  <p className="unique-blog-content">{blog.content}</p>
                  <p className="unique-blog-author"><i>{blog.author}</i></p>
                  <p className="unique-blog-date"><strong>Updated At:</strong> {new Date(blog.updatedAt).toLocaleDateString()}</p>
                  <div>
                    <strong>Tags:</strong>
                    <ul className="unique-blog-tags">
                      {blog.tags.map((tag, tagIndex) => (
                        <li key={tagIndex}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => deleteBlog(blog._id)} className="unique-blog-button unique-blog-delete">Delete</button>
                  <button onClick={() => startEditing(blog)} className="unique-blog-button unique-blog-edit">Edit</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlog;
