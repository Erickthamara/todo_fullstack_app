import {React,useState} from 'react'
import { useGlobalContext } from '../GlobalContext'
import axios from 'axios'

const Todo = () => {
    const {userEmail,userId}=useGlobalContext()
   
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')

    const handleTodoTitle=(e)=>{
         e.preventDefault();
    settitle(e.target.value) 
    
    }
       const handleTodoDescription=(e)=>{
         e.preventDefault();
    setdescription(e.target.value) 
   
    }

const submitTask=async()=>{
     try {
      const data=await axios.post('http://127.0.0.1:5000/create_task/',{  
        email:userEmail,
        password:userPassword
      })
     
      if (data.status===200)  alert(`Success`)
        navigate('Todo')  //Navigate to the todo App,to be created
       
    } catch (error) {
       console.error(`Error 404: ${error}`)
       alert ('An error occured.Backend servers might be down')
    }
}
  
  
  return (
    <div className='todo-input'>
        <h2>Todo Header</h2>
      <div className="form-row">
        <label htmlFor="header" className='form-label'>Title</label>
        <input type='text'  id="header" className='form-input' value={title} onChange={handleTodoTitle} />
    </div>
    <h3>Todo Specifics</h3>
    <div className="form-row">
        <label htmlFor="description" className='form-label'>Description</label>
        <input type='text'  id="description" className='form-input'value={description} onChange={handleTodoDescription} />
    </div>
    <div className="login-buttons">
              <button className="btn" onClick={submitTask}>Create Task</button>
            
              
            </div>
    </div>
  )
}

export default Todo
