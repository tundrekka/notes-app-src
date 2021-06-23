import React from 'react';
import validator from 'validator'
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const { loading ,msgError } = useSelector(state => state.ui)

    const initialFormState = {
        name: '',
        email: '',
        password: '',
        password2: '',
    }
    const [ formValues , handleInputChange ] = useForm(initialFormState)
    const { name, email, password, password2 } = formValues

    const handleRegister = (e) => {
        e.preventDefault()
        if( isFormValid() ) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {

        if( name.trim().length === 0 ) {
            dispatch( setError('Invalid Name') )
            return false
        } else if ( !validator.isEmail( email )) {
            dispatch( setError('Invalid Email') )
            return false
        } else if ( password !== password2 || password.length < 5) {
            dispatch( setError('password is to short or does not match') )
            return false
        } else if ( name.trim().length > 40 ) {
            dispatch( setError('Name is too long') )
            return false
        }
        dispatch( removeError() )
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
            {
                msgError && 
                <div className="auth__alert-error">
                    {msgError}
                </div>
            }
                

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    disabled={loading}
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
