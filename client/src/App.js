import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Contact from './components/Contact';
import CreateAccount from './components/CreateAccount';
import EditPermissions from './components/EditPermissions';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import AuthContext from './context/AuthContext';

function App() {
  let currentUserData = localStorage.getItem("userData");

    if(currentUserData) {
        currentUserData = JSON.parse(currentUserData);
    }

  const [user, setUser] = useState(currentUserData);

  let admin = false;
  if(user) {
      admin = user.userData.authorities.includes("ADMIN");
  }

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <NavBar setUser={setUser}/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='login' element={<Login setUser={setUser}/>}/>
          <Route path='create_account' element={<CreateAccount/>}/>
          <Route path='edit_permissions' element={admin ? <EditPermissions/> : <Navigate to='/'/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </AuthContext.Provider>
    
  );
}

export default App;
