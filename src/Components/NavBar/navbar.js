import React from 'react'
import './navbar.css'

function NavBar({ user, onLogout }) {
  return (
    <div className="navbar">
        <div className="logo">
            <h1>
                KClinic
            </h1>
        </div>
        <ul className="navbar-menu">
          
            <li> 
              <a href='/' className= {window.location.pathname === "/" ?'navbar-menu active' :'navbar-menu'}>Home</a>
              </li>
              <li> 
              <a href='/about' className= {window.location.pathname === "/about" ?'navbar-menu active' :'navbar-menu'}>About</a>
              </li>
              <li> 
              <a href='history' className= {window.location.pathname === "/history" ?'navbar-menu active' :'navbar-menu'}>History</a>
              </li>
              <li> 
              <a href='/contactus' className= {window.location.pathname === "/contactus" ?'navbar-menu active' :'navbar-menu'}>Contact US</a>
              </li>
              {user ? (
          <li>
            <a href="#" onClick={onLogout}>Logout</a>
          </li>
        ) : (
          <li>
            <Link to="/login" className={window.location.pathname === "/login" ? 'navbar-menu active' : 'navbar-menu'}>Login</Link>
          </li>
        )}
              
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