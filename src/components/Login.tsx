import { ChangeEvent, FormEvent, useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
    };

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type='email' value={email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHandler}/>
                <br />
                <button type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;
