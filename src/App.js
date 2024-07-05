import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import { Toaster } from 'react-hot-toast';
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import UserScreen from './components/Dashboard.jsx';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/Home.jsx';
const AppState = createContext();
function App() {
  function updateAuth(){
    const userToken = Cookies.get('user');
    setLogin(userToken);
    console.log(JSON.stringify(userToken))
  }
  function EditUser(user,modal){
    setEditUser(user);
    setIsAddModal(modal);
  }
  function fetchUserList(){
    setUserListUpdated(!userlistUpdated);
  }
  const [login,setLogin] = useState('');
  const [editedUser,setEditUser] = useState('');
  const [isAddModal, setIsAddModal] = useState(false);
  const [user,setUser] = useState('');
  const [userlistUpdated,setUserListUpdated] = useState(false);
  const [userInfo,setUserInfo] = useState('');
  useEffect(()=>{
    updateAuth();
    if(login){
      console.log('App se login hua!');
    }
  },[login])
  function setUserDetails(info){
    setUserInfo(info);
    console.log(info);
  }
  return (
    <AppState.Provider value={{login,updateAuth,editedUser,EditUser,isAddModal,setIsAddModal,user,setUser,userlistUpdated,fetchUserList,userInfo,setUserDetails}}>
      <div className="App">
      <Toaster/>
     <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={login?(userInfo.role==="Admin"?<Dashboard/>:<Home/>):<Login/>}/>
     </Routes>
     </BrowserRouter>
    </div>
    </AppState.Provider>
  );
}
export {AppState};
export default App;
