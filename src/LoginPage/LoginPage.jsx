import React from "react";
import App from "../App";
import {useDispatch} from "react-redux";
import {createSessionThunk} from "../redux/actions/loginAction";

const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch();

    const [emailDirty, setEmailDirty] = React.useState(false)
    const [passwordDirty, setPasswordDirty] = React.useState(false)

    const [emailError, setEmailError] = React.useState('Email is required')
    const [passwordError, setPasswordError] = React.useState('Password is required')

    const [formValid, setFormValid] = React.useState(false)

    React.useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else setFormValid(true)
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!filter.test(e.target.value.toLowerCase())) {
            setEmailError('Email is not valid')
        } else {
            setEmailError('')
        }
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 6) {
            setPasswordError('Password must be longer then 6 symbols')
        } else {
            setPasswordError('')
        }
    }
    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break;
            case 'password':
                setPasswordDirty(true)
                break;
        }

    }
    const onSubmitFormLoginHandle = async e => {
        e.preventDefault();
        await dispatch(createSessionThunk({
            "email": email,
            "password": password
        }))
    }
    return (
        <div className="login">
            <form onSubmit={onSubmitFormLoginHandle}>
                <h1>Login</h1>
                <div className="form-inline">
                    <label>Email:</label>
                    <input onChange={(e) => emailHandler(e)} onBlur={(e) => blurHandle(e)} name="email" type="text"/>
                    {(emailDirty && emailError) && <div>{emailError}</div>}
                </div>
                <div className="form-inline">
                    <label>Password:</label>
                    <input onChange={(e => passwordHandler(e))} onBlur={(e) => blurHandle(e)} name="password" type="password"/>
                    {(passwordDirty && passwordError) && <div>{passwordError}</div>}
                </div>
                <button disabled={!formValid} className={'button'} type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;