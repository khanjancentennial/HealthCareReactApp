import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Components/AuthContext/authContext'; // Adjust the import path as necessary



function NavBar() {
  const { user, onLogout } = useAuth();
  return (
    <div className="navbar">
        <div className="logo">
            <h1>
                KClinic
            </h1>
        </div>
        <ul className="navbar-menu">
          
            <li> 
              <NavLink to='/' className={({ isActive }) => (isActive ? 'navbar-menu active' : 'navbar-menu')}>
              
              Home</NavLink>
              </li>
              <li> 
              <NavLink to='/about' className={({ isActive }) => (isActive ? 'navbar-menu active' : 'navbar-menu')}>About</NavLink>
              </li>
              <li> 
              <NavLink to='history' className={({ isActive }) => (isActive ? 'navbar-menu active' : 'navbar-menu')}>History</NavLink>
              </li>
              <li> 
              <NavLink to='/contactus' className={({ isActive }) => (isActive ? 'navbar-menu active' : 'navbar-menu')}>Contact US</NavLink>
              </li>
              {user ? (
           <>
           <li>
             <NavLink
               to='/patients'
               className={({ isActive }) => (isActive ? 'navbar-menu active' : 'navbar-menu')}
             >
               Patients
             </NavLink>
           </li>
           <li>
             <NavLink
               to='/#'
               className={({ isActive }) => (isActive ? 'navbar-menu active' : 'navbar-menu')}
               onClick={onLogout}
             >
               Logout
             </NavLink>
           </li>
         </>
        ) :(
              <li> 
              <NavLink to='/login' className={({ isActive }) => (isActive ? 'navbar-menu active' : 'navbar-menu')}>Login</NavLink>
              </li>)}

              {/* <Link to="/" className= {window.location.pathname === "/" ?'navbar-menu active' :'navbar-menu'}> Home </Link></li>
            <li> <Link to="/about"className={location.pathname === "/about" ?'navbar-menu active' :'navbar-menu'}> About </Link></li>
            <li> <Link to="/history"className={location.pathname === "/history" ?'navbar-menu active' :'navbar-menu'}> History </Link></li>
            <li> <Link to="/contactus"className={location.pathname === "/contactus" ?'navbar-menu active' :'navbar-menu'}> Contact Us</Link></li>
            <li> <Link to="/login"className={location.pathname === "/login" ?'navbar-menu active' :'navbar-menu'}> Login </Link></li> */}
        </ul>
    
    </div>
  );
}

export default NavBar;