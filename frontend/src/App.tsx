import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddUser, Contact, EditUser, Home, NotFound, UsersOverview} from "./pages";
import {Navigation} from "./components";

function App() {


    return (
        <BrowserRouter>
            <Navigation/>
            <div id="container">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/users'} element={<UsersOverview/>}/>
                    <Route path={'/add-user'} element={<AddUser/>}/>
                    <Route path={'/users/:id'} element={<EditUser/>}/>
                    <Route path={'/contact'} element={<Contact/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
