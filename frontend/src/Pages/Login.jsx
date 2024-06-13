import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { checkValidEmail, checkValidString } from '../Utils';
import axios from 'axios';
import { useGlobalContext } from '../GlobalContext';

const Login = () => {
  
  const{userEmail, setUserEmail,userPassword, setUserPassword,userId, setuserId}=useGlobalContext()
 
  const [loading, setloading] = useState(false)

  let navigate=useNavigate();


const checkValidUserEmail=(userEmailParam)=>{
  if (checkValidEmail(userEmailParam) !== true || userEmailParam === '') {
    alert('Inavlid Email')
    return false
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
      const data=await axios.post('http://127.0.0.1:5000/api/sign_in/',{  
        email:userEmail,
        password:userPassword
      })
    //  console.log(data.data.userId);
      if (data.status===200)  alert(`Success`)
        //=====Set the userId========
      setuserId(data.data.userId)
        navigate('Todo')  //Navigate to the todo App,to be created
       
    } catch (error) {
       console.error(`Error 404: ${error}`)
       alert ('An error occured.Backend servers might be down')
      //  console.err();
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
              
            </div>
        
    </div>
  )
}

export default Login