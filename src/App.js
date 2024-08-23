import React, { useState } from 'react'
import NavBar from './Components/NavBar/navbar';
import Footer from './Components/Footer/footer';
import Home from './Components/Home/home';
import History from './Components/History/history';
import About from './Components/About/about';
import ContactUs from './Components/Contact US/contactus';
import Login from './Components/Login/login';
import Patients from './Components/Patients/patients';
import ClinicalRecords from './Components/ClinicalRecords/clinicalRecords';
import Dashboard from './Components/Dashboard/dashboard'; // Import your protected component

import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

import { AuthProvider } from './Components/AuthContext/authContext';


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const ProtectedRoute = ({ element, user }) => {
  return user ? element : <Navigate to="/login" />;
};

function App() {


  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
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
      <AuthProvider>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/clinical-records" element={<ClinicalRecords />} />
        <Route path="/protected" element={<ProtectedRoute element={<Dashboard />} user={user} />} />
      </Routes>
      <Footer/>
      </AuthProvider>
    </Router>
   
  );

}

export default App;
