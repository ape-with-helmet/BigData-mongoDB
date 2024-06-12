import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Main.css';
import photo1 from './pexels-iriser-1379636.jpg';

const Main = () => {
    const [blogs, setBlogs] = useState([]);

    const callBlogs = async () => {
        try {
            console.log("Fetching blogs...");
            const result = await axios.get("http://localhost:8080/getBlogs");

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

    useEffect(() => {
        callBlogs();
    }, []);

    return (
        <div>
            <img src={photo1} className='bgphoto' alt='BG'/>
            <div className='blogs'>
                <br/>
                <br/>
                <br/>
                <br/>
                {blogs.map((blog, index) => (
                    <div key={index} className='box-folder'>
                        <div className="blog-box">
                            <h2>{blog.title}</h2>
                            <p>{blog.content}</p>
                            <p><i>{blog.author}</i></p>
                            <p><strong>Updated At:</strong> {new Date(blog.updatedAt).toLocaleDateString()}</p>
                            {/* <div>
                                <strong>Tags:</strong>
                                <ul>
                                    {blog.tags.map((tag, tagIndex) => (
                                        <li key={tagIndex}>{tag}</li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
