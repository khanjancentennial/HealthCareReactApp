import React from 'react'
import NavBar from './Components/NavBar/navbar';
import Home from './Components/Home/home';
import History from './Components/History/history';
import About from './Components/About/about';
import ContactUs from './Components/Contact US/contactus';
import Login from './Components/Login/login';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  let component
  switch (window.location.pathname){
    case '/':
      component = <Home />
      break
    case '/about':
      component = <About />
      break 
    case '/history':
      component = <History />
      break   
    case '/contactus':
      component = <ContactUs />
      break     
    case '/login':
      component = <Login />
      break 
  }

  return (
      <div>
      <NavBar />
      {component}

      {/* <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    
                </Routes>
      </Router> */}
    </div>
  );
}

export default App;
