import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { checkValidEmail, checkValidString } from '../Utils';
import Error from './Error';
import Loading from '../Components/Loading';
// import useHistory from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// const axios = require('axios').default;

const CreateAccount = () => {
const [userName, setUserName] = useState('')
const [userEmail, setUserEmail] = useState('')
const [userPassword, setUserPassword] = useState('')
const [loading, setloading] = useState(false)
const [buttonEnabled, setbuttonEnabled] = useState(true)

let navigate=useNavigate();

const checkValidUserName=(userNameParam)=>{
  
  if (checkValidString(userNameParam) !== true || userNameParam === '') {
    alert('Inavlid UserName')
    return
  }
  return true
}

const checkValidUserEmail=(userEmailParam)=>{
  if (checkValidEmail(userEmailParam) !== true || userEmailParam === '') {
    alert('Inavlid Email')
    return
  }
  return true
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
  return true
}

const submitForm=()=>{
console.log('works');
  if (checkValidUserName(userName)!==true &&checkValidUserEmail(userEmail)!==true &&checkValidUserPassword(userPassword)!==true) {
    alert('Invalid details')
    return
  }
  setbuttonEnabled(false)

  const createUser=async()=>{
    try {
      const data=await axios.post('http://127.0.0.1:5000/create_user/',{
        userName:userName,
        email:userEmail,
        password:userPassword
      })
      navigate('/')
      alert('User Successfully created')
    
    } catch (error) {
       console.error(`Error 404: ${error}`)
    }
  }
  createUser()
   
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
  
}, [userName,userEmail,userPassword])

if (loading===true) return <Loading/>

  return (
    <div className='login-container'>
        
            <h2>Create Account</h2>
            <div className="form-row">
              <label htmlFor="name" className='form-label'>UserName</label>
              <input type="text"  id="name" className='form-input' value={userName} onChange={handleUserName} onBlur={()=>checkValidUserName(userName)}  />
            </div>
            <div className="form-row">
              <label htmlFor="email" className='form-label'>Email</label>
              <input type='email'  id="email" className='form-input' value={userEmail} onChange={handleEmail} onBlur={()=>checkValidUserEmail(userEmail)} />
            </div>
            <div className="form-row">
              <label htmlFor="password" className='form-label'>Password</label>
              <input type='password'  id="password" className='form-input' onChange={handlePassword} onBlur={()=>checkValidUserPassword(userPassword)} />
            </div>
            
            <div className="login-buttons">
              {buttonEnabled? <button className="btn" onClick={submitForm}  >Submit</button>:<button className="btn"  >Loading......</button>}
              
            </div>
        
    </div>
  )
}

export default CreateAccount

