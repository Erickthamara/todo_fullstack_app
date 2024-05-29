import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { checkValidEmail, checkValidString } from '../Utils';
import axios from 'axios';

const Login = () => {
  const [userName, setUserName] = useState('')
const [userEmail, setUserEmail] = useState('')
const [userPassword, setUserPassword] = useState('')
const [loading, setloading] = useState(false)
const [buttonEnabled, setbuttonEnabled] = useState(true)
let navigate=useNavigate();


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

const handleEmail=(e)=>{
    e.preventDefault;
    setUserEmail(e.target.value) 
}
const handlePassword=(e)=>{
    e.preventDefault;
    setUserPassword(e.target.value) 
}


const submitForm=()=>{

  if (checkValidUserEmail(userEmail)!==true &&checkValidUserPassword(userPassword)!==true) {
    alert('Invalid details')
    return
  }


  const signInUser=async()=>{
    try {
      const data=await axios.post('http://127.0.0.1:5000/sign_in/',{
       
        email:userEmail,
        password:userPassword
      })
      navigate('/')
      alert('Success!')
    
    } catch (error) {
       console.error(`Error 404: ${error}`)
    }
  }
  signInUser()
   
}
  return (
    <div className='login-container'>
        
            <h2>Login</h2>
             <div className="form-row">
              <label htmlFor="email" className='form-label'>Email</label>
              <input type='email'  id="email" className='form-input' value={userEmail} onChange={handleEmail} onBlur={()=>checkValidUserEmail(userEmail)} />
            </div>
            <div className="form-row">
              <label htmlFor="password" className='form-label'>Password</label>
              <input type='password'  id="password" className='form-input' onChange={handlePassword} onBlur={()=>checkValidUserPassword(userPassword)} />
            </div>
            <div className="login-buttons">
              <button className="btn" onClick={submitForm}>Sign In</button>
              <Link to='/Create/'className="btn" >Create Account</Link>
              {/* <button className="btn">Create Account</button> */}
            </div>
        
    </div>
  )
}

export default Login