import {NavLink} from "react-router-dom";

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to={'/'}>Home</NavLink></li>
                <li><NavLink to={'/users'}>Users</NavLink></li>
                <li><NavLink to={'/add-user'}>Add User</NavLink></li>
                <li><NavLink to={'/contact'}>Contact</NavLink></li>
            </ul>
        </nav>
    )
}