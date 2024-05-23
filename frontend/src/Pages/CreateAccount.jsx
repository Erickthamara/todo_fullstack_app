import {React,useState} from 'react'
import PropTypes from 'prop-types'


const CreateAccount = () => {
const [userName, setuserName] = useState('')

const handleUserName=(e)=>{
    e.preventDefault;
    console.log(e.target.value);
}
  return (
    <div className='login-container'>
        
            <h2>Create Account</h2>
            <div className="form-row">
              <label htmlFor="name" className='form-label'>UserName</label>
              <input type="text"  id="name" className='form-input' onChange={handleUserName} />
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
              <button className="btn">Submit</button>
            </div>
        
    </div>
  )
}

export default CreateAccount

