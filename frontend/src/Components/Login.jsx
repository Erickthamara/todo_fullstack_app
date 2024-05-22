import React from 'react'

const Login = () => {
  return (
    <div className='login-container'>
        
            <h2>Logins</h2>
            <div className="form-row">
              <label htmlFor="name" className='form-label'>UserName</label>
              <input type="text"  id="name" className='form-input' />
            </div>
            <div className="form-row">
              <label htmlFor="email" className='form-label'>Email</label>
              <input type='email'  id="email" className='form-input' />
            </div>
            <div className="form-row">
              <label htmlFor="password" className='form-label'>Password</label>
              <input type='password'  id="password" className='form-input' />
            </div>
            <div className="login-buttons">
              <button className="btn">Sign In</button>
              <button className="btn">Create Account</button>
            </div>
        
    </div>
  )
}

export default Login