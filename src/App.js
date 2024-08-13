import React, { useState } from 'react'
import NavBar from './Components/NavBar/navbar';
import Home from './Components/Home/home';
import History from './Components/History/history';
import About from './Components/About/about';
import ContactUs from './Components/Contact US/contactus';
import Login from './Components/Login/login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  const [user, setUser] = useState(null); // Manage user state globally

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
  };
  // let component
  // switch (window.location.pathname){
  //   case '/':
  //     component = <Home />
  //     break
  //   case '/about':
  //     component = <About />
  //     break 
  //   case '/history':
  //     component = <History />
  //     break   
  //   case '/contactus':
  //     component = <ContactUs />
  //     break     
  //   case '/login':
  //     component = <Login setUser={setUser} />;
  //     break 
  //   default:
  //     component = <Home />;
  // }

  // return (
  //     <div>
  //     <NavBar user={user} onLogout={handleLogout}/>
  //     {component}

  //     {/* <Router>
  //               <Routes>
  //                   <Route exact path="/" element={<Home />} />
  //                   <Route exact path="/about" element={<About />} />
                    
  //               </Routes>
  //     </Router> */}
  //   </div>
  // );
  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );

}

export default App;
