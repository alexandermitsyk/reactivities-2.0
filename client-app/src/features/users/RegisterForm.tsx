import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return(
        <Formik initialValues={{
                email: '',
                password: '',
                displayName: '',
                username: '',
                error: null
            }}
            onSubmit={
                (values, {setErrors}) => userStore.register(values).catch(error => setErrors({error}))
            }
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="of">
                    <Header as='h2' content='Sign up to reactivities' color="teal" textAlign="center"/>
                    <MyTextInput name='email' placeholder="Email" />
                    <MyTextInput name='password' placeholder="Password" type='password' />
                    <MyTextInput name='displayName' placeholder="Display name" />
                    <MyTextInput name='username' placeholder="Username" />
                    <ErrorMessage 
                        name="error" render={() => <ValidationErrors errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
});