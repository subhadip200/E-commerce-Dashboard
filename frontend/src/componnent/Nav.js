import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/register')
    }


    return (
        <div>
           <img 
           alt="logo"
           className="logo"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEivGnbCwAT6QkNLq7IZoWiG1hIAJiQwXkQ&usqp=CAU"/>
                {
                    auth?
                    <ul className="nav-ul">
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update product</Link></li>
                    {/* <li><Link to="/profile">Profile</Link></li> */}
                    <li><Link onClick={logout} to="/register">Log out ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                     <li><Link to="/register">Sign up</Link></li>
                     <li><Link to="/login">Log in</Link></li> 

                    </ul>
                }
           
        </div>

    )
}

export default Nav;