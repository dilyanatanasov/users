import {FC, useState} from "react";
import {List} from "../components/List.tsx";
import {Button} from "../components";
import {useNavigate} from "react-router-dom";

export const UsersOverview: FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<any[]>([])

    const getUsers = async () => {
        const result = await fetch('http://localhost:3000/user');
        const data = await result.json();
        setUsers(data);
    }

    const deleteUser = async (id: number) => {
        try {
            await fetch(`http://localhost:3000/user/${id}`, {
                method: 'DELETE'
            });
            await getUsers();
        } catch (e) {
            console.error('Failed to delete user', e);
        }
    }

    const editUser = (id: number) => {
        navigate(`/users/${id}`);
    }

    return (
        <>
            <List items={users} renderItem={(user) => {
                return (
                    <>
                        <span>{user.username}</span>
                        <div className={'actions'}>
                            <Button text={'Edit'} onClick={() => editUser(user.id)}/>
                            <Button text={'Delete'} onClick={() => deleteUser(user.id)}/>
                        </div>
                    </>
                )
            }}/>
            <Button text={'Get Users'} onClick={getUsers}/>
        </>
    )
}