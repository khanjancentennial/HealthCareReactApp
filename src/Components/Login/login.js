// import React, { useState, useEffect } from 'react';
// import './login.css'

// import email_image from '../../Assets/email.png'
// import password_image from '../../Assets/padlock.png'
// import user_image from '../../Assets/user.png'

// import axios from 'axios';
// import User from '../../Model/User';

// function Login() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [user, setUser] = useState(null);

//     const [action,setAction] = useState("Login")

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//     try {
//         const response = await axios.post('https://group3-mapd713.onrender.com/auth/login', 
//             { email,
//               password },
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//               }
//             );
//         const userData = new User(response.data.user); // assuming the API response contains user data
//         setUser(userData);
//       } catch (err) {
//         setError('Login failed. Please check your credentials and try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//         if (user) {
//           setAction('Success');
//         }
//       }, [user]);

//     if (user) {
//       return(
//             <div>
//               Welcome, {user.firstName}!
//             </div>
//       );
//     }else{
//         return (

//             <div className='container'>
        
//                 <div className = 'textheaders'> 
//                     <div className='text'>{action}</div>
//                 </div>
        
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
        
//                 <form onSubmit={handleLogin}>
        
        
//                 <div className='inputs'>
        
//                     {action === "Login" ? <div></div> :
//                     <div className='input'>
//                         <img className='images'src={user_image} alt=''></img>
//                         <input type='text' placeholder='First Name'></input>
//                     </div>}
        
//                     {action === "Login" ? <div></div> :
//                     <div className='input'>
//                         <img className='images'src={user_image} alt=''></img>
//                         <input type='text' placeholder='Last Name'></input>
//                     </div>}
        
//                     <div className='input'>
//                         <img className='images'src={email_image} alt=''></img>
//                         <input type='email' 
//                         placeholder='Email Id'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         ></input>
//                     </div>
//                     <div className='input'>
//                         <img className='images'src={password_image} alt=''></img>
//                         <input type='password' 
//                         placeholder='Password'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         ></input>
//                     </div>
//                 </div>
//                 <div className='submitContainer'>
//                     <div className='submitLogin'
//                     type='submit'
//                         // onClick={()=>{setAction(action === "Login" ? "Login": "Sign Up")}}
//                         disabled={loading}
//                     >{action === "Login" ? 
//                     loading ? 'Logging in...' : 'Login'
//                     : 
//                     "Sign UP" }</div>
//                 </div>
//                 </form>
        
//                 <div className='newUser'>
//                 {action === "Login" ? "New User?": "Existing User?"}
//                     <span onClick={()=>{setAction(action === "Login" ? "Sign Up": "Login")}}>{action === "Login" ? "Sign Up Here": "Login Here"}</span>
//                      </div>
        
//             </div>
//           );
//     }

  
// }

// export default Login;


import React, { useState, useEffect } from 'react';
import './login.css';

import email_image from '../../Assets/email.png';
import password_image from '../../Assets/padlock.png';
import user_image from '../../Assets/user.png';

import axios from 'axios';
import User from '../../Model/User';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [action, setAction] = useState('Login');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://group3-mapd713.onrender.com/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const userData = new User(response.data.user); // assuming the API response contains user data
      setUser(userData);
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setAction('Success');
    }
  }, [user]);

  if (user) {
    return <div>Welcome {user.firstName}</div>;
  } else {
    return (
      <div className='container'>
        <div className='textheaders'>
          <div className='text'>{action}</div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className='inputs'>
            {action === 'Login' ? null : (
              <>
                <div className='input'>
                  <img className='images' src={user_image} alt='' />
                  <input type='text' placeholder='First Name' />
                </div>
                <div className='input'>
                  <img className='images' src={user_image} alt='' />
                  <input type='text' placeholder='Last Name' />
                </div>
              </>
            )}

            <div className='input'>
              <img className='images' src={email_image} alt='' />
              <input
                type='email'
                placeholder='Email Id'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='input'>
              <img className='images' src={password_image} alt='' />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='submitContainer'>
            <button className='submitLogin' disabled={loading} type='submit'>
              {action === 'Login'
                ? loading
                  ? 'Logging in...'
                  : 'Login'
                : 'Sign UP'}
            </button>
          </div>
        </form>

        <div className='newUser'>
          {action === 'Login' ? 'New User?' : 'Existing User?'}
          <span
            onClick={() =>
              setAction(action === 'Login' ? 'Sign Up' : 'Login')
            }
          >
            {action === 'Login' ? 'Sign Up Here' : 'Login Here'}
          </span>
        </div>
      </div>
    );
  }
}

export default Login;
