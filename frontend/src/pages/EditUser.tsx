import {useNavigate, useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useEffect} from "react";
import {Form} from "../components/Form.tsx";

export const EditUser = () => {
    const navigation = useNavigate();
    const methods = useForm();
    const { reset } = methods;
    const { id } = useParams();

    const getUser = async (id: string) => {
        const response = await fetch(`http://localhost:3000/user/${id}`)
        const data = await response.json();
        const formattedUser = {
            username: data.username,
            password: data.password,
            isActive: data.is_active ? "1" : "0"
        }
        reset(formattedUser);
    }

    useEffect(() => {
        (async () => {
            await getUser(id!);
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
            <FormProvider {...methods}>
                <Form onSubmit={onSubmit} submitButtonLabel={'Edit user'}/>
            </FormProvider>
        </>
    )
}