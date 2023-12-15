import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './Auth.css';
import AboutAuth from './AboutAuth';
import { signUp, logIn } from '../../actions/auth';

const Auth = () => {
  
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      return alert("please enter your email and password")
    }
    if (isSignup) {
      if(!name) return alert("please enter your name")
      dispatch(signUp({name, email, password}, navigate))
    } else {
      dispatch(logIn({email, password}, navigate))
    }
  }
  
  return (
    <div>
      <section className="auth-section">
        {isSignup && <AboutAuth/>}
        <div className="auth-container-2">
          {!isSignup && <svg aria-hidden="true" className="login-logo" width="32" height="37" viewBox="0 0 32 37"><path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"/><path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"/></svg>}
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label htmlFor="name">
                <h4>Name</h4>
                <input type="name" name='name' id='name' onChange={(e) => {setName(e.target.value)}}/>
              </label>
            )}
            <label htmlFor="email">
              <h4>Email</h4>
              <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <h4>Password</h4>
                { !isSignup && <p style={{color: "#007ac6", fontSize:'13px'}} >forgot Password?</p> }
              </div>
              <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
              { isSignup && <p style={{color: "#666767", fontSize:"13px"}}>Password must contain at least eight characters, including at least 1 letter and 1 number.</p>} 
            </label>
            { isSignup && (
              <label htmlFor="check">
				<input type="checkbox" id='check'/>
				<p style={{fontSize:"13px"}}>Opt-in to receive occasional, product updates, user research invitations, company announcements, and digests</p>
              </label>
            )}
            <button type='submit' className='auth-button'>{isSignup ? 'Sign up': 'Log in'}</button>
			{ isSignup && (
              <p style={{color: "#666767", fontSize:"13px"}}>
                By clicking "Sign Up", you agree to our 
                <span style={{color: "#007ac6"}}> terms of services</span>, 
                <span style={{color: "#007ac6"}}> Privacy Policy</span> and 
                <span style={{color: "#007ac6"}}> Cookie policy</span>
              </p>
            )}
			</form>
          <p>
            { isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? 'Log In' : 'Sign Up' }</button>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Auth