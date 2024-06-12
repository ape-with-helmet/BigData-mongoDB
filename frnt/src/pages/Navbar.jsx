import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const login = localStorage.getItem('login');
    const logout = (e) =>{
        e.preventDefault();
        localStorage.clear();
        navigate('/')
    }

    return (
        <>
        {login ?
            <div className="navbar">
                <div className="left-nav">
                    <div className="Home" onClick={()=>navigate('/main')}>Home</div>
                    <div className="create-post" onClick={()=>navigate('/post')}>Write blog</div>
                    <div className="create-post" onClick={()=>navigate('/edit')}>My Blogs</div>
                    {/* <div className="about-us" onClick={()=>navigate('/about')}>About Us</div> */}
                </div>
                <div className="right-nav">
                    {/* <div className="search">
                        <input type='text' placeholder='Enter Keywords...'/>
                        <button type='submit'>Search</button>
                    </div> */}
                    <div className="logout" onClick={logout}>Logout</div>
                </div>
            </div>
            :<></>
        }
        </>
    )
}

export default Navbar