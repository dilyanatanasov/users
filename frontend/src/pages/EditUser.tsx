import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

export const EditUser = () => {
    const navigation = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();

    const [user, setUser] = useState<any>(null);

    const getUser = async (id: string) => {
        const response = await fetch(`http://localhost:3000/user/${id}`)
        const data = await response.json();
        const formattedUser = {
            username: data.username,
            password: data.password,
            isActive: data.is_active ? "1" : "0"
        }
        reset(formattedUser);
        setUser(data);
    }

    useEffect(() => {
        (async () => {
            await getUser(id);
        })()
    }, []);

    const onSubmit = async (data) => {
        try {
            await fetch('http://localhost:3000/user', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            navigation('/users');
        } catch (e) {
            console.error('Failed to create user', e);
        }
    }

    return (
        <>
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={'text'} placeholder={'Username'} {...register('username')}/>
                <input type={'password'} placeholder={'Password'} {...register('password')}/>
                <ul>
                    <li><input type={'radio'} value={1} {...register('isActive')}/>Active</li>
                    <li><input type={'radio'} value={0} {...register('isActive')}/>Inactive</li>
                </ul>
                <button type={'submit'}>Edit user</button>
            </form>
        </>
    )
}