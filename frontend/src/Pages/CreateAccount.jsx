import {React,useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

// const axios = require('axios').default;

const CreateAccount = () => {
const [userName, setUserName] = useState('')
const [userEmail, setUserEmail] = useState('')
const [userPassword, setUserPassword] = useState('')

const handleUserName=(e)=>{
    e.preventDefault;
    setUserName(e.target.value) 
    console.log(userName) 
}
const handleEmail=(e)=>{
    e.preventDefault;
    setUserEmail(e.target.value) 
     console.log(userEmail) 
}
const handlePassword=(e)=>{
    e.preventDefault;
    setUserPassword(e.target.value) 
    console.log(userPassword) 
}
useEffect(() => {
    // console.log(`email is ${userEmail} and name is ${userName} and password is ${userPassword}`);
    const testGetData=async()=>{
      try {
        const rawData=await axios.get('http://127.0.0.1:5000/users/');
        console.log(rawData.data.users);
      } catch (error) {
        console.error(error)
      }
    }
    testGetData()

}, [userName,userEmail,userPassword])




  return (
    <div className='login-container'>
        
            <h2>Create Account</h2>
            <div className="form-row">
              <label htmlFor="name" className='form-label'>UserName</label>
              <input type="text"  id="name" className='form-input' value={userName} onChange={handleUserName} />
            </div>
            <div className="form-row">
              <label htmlFor="email" className='form-label'>Email</label>
              <input type='email'  id="email" className='form-input' value={userEmail} onChange={handleEmail} />
            </div>
            <div className="form-row">
              <label htmlFor="password" className='form-label'>Password</label>
              <input type='password'  id="password" className='form-input' onChange={handlePassword} />
            </div>
            <div className="login-buttons">
              <button className="btn">Submit</button>
            </div>
        
    </div>
  )
}

export default CreateAccount

