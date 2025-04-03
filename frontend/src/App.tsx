import './App.css'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {AddUser, Contact, Home, NotFound, UsersOverview} from "./pages";

function App() {


  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/users'}>Users</NavLink></li>
          <li><NavLink to={'/add-user'}>Add User</NavLink></li>
          <li><NavLink to={'/contact'}>Contact</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/users'} element={<UsersOverview/>}/>
        <Route path={'/add-user'} element={<AddUser/>}/>
        <Route path={'/contact'} element={<Contact/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
