import {FormProvider, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Form} from "../components/Form.tsx";

export const AddUser = () => {
    const navigation = useNavigate();
    const methods = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/user', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create user');
            }

            navigation('/users');
        } catch (e) {
            console.error('Failed to create user', e);
            alert(e.message);
        }
    }

    return (
        <>
            <h1>AddUser</h1>
            <FormProvider {...methods}>
                <Form onSubmit={onSubmit} submitButtonLabel={'Add user'}/>
            </FormProvider>
        </>
    )
}