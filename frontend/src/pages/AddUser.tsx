import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export const AddUser = () => {
    const navigation = useNavigate();
    const { register, handleSubmit } = useForm();

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
            <h1>AddUser</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={'text'} placeholder={'Username'} {...register('username')}/>
                <input type={'password'} placeholder={'Password'} {...register('password')}/>
                <ul>
                    <li><input type={'radio'} value={1} {...register('isActive')}/>Active</li>
                    <li><input type={'radio'} value={0} {...register('isActive')}/>Inactive</li>
                </ul>
                <button type={'submit'}>Add user</button>
            </form>
        </>
    )
}