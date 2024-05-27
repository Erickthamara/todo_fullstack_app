import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { checkValidEmail, checkValidString } from '../Utils';
import Error from './Error';
import Loading from '../Components/Loading';

// const axios = require('axios').default;

const CreateAccount = () => {
const [userName, setUserName] = useState('')
const [userEmail, setUserEmail] = useState('')
const [userPassword, setUserPassword] = useState('')
const [loading, setloading] = useState(false)

const checkValidUserName=(userNameParam)=>{
  if (checkValidString(userNameParam) !== true && userNameParam !== '') {
    alert('Inavlid UserName')
  }
}

const checkValidUserEmail=(userEmailParam)=>{
  if (checkValidEmail(userEmailParam) !== true && userEmailParam !== '') {
    alert('Inavlid Email')
  }
}

const checkValidUserPassword=(userPassword)=>{
  if (userPassword==='') {
    alert('Password is required');
    return
  } 
  if (userPassword.length <8 || userPassword.length>12)  {
       alert('Password must be between 8 and 12 characters long');
       return
    } 
}

const submitForm=()=>{
    checkValidUserName(userName)
    checkValidUserEmail(userEmail)
    checkValidUserPassword(userPassword)
}

const handleUserName=(e)=>{
    e.preventDefault;
    setUserName(e.target.value) 
}
const handleEmail=(e)=>{
    e.preventDefault;
    setUserEmail(e.target.value) 
}
const handlePassword=(e)=>{
    e.preventDefault;
    setUserPassword(e.target.value) 
}
useEffect(() => {
   
    setUserName(userName)
  

    setUserEmail(userEmail)
   
    setUserPassword(userPassword)
    // const testGetData=async()=>{
    //   try {
    //     const rawData=await axios.get('http://127.0.0.1:5000/users/');
    //     console.log(rawData.data.users);
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
    // testGetData()
   

}, [userName,userEmail,userPassword])

if (loading===true) return <Loading/>

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
              <button className="btn" onClick={submitForm}>Submit</button>
            </div>
        
    </div>
  )
}

export default CreateAccount

