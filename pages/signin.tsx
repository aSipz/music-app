import AuthForm from '@/components/authFrom';

export default function SignIn() {

    return (
        <AuthForm mode="signin"></AuthForm>
    )
}

SignIn.authPage = true;