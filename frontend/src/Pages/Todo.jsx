import {React,useState,useEffect} from 'react'
import { useGlobalContext } from '../GlobalContext'
import axios from 'axios'
import { FaCheck,FaTrash  } from "react-icons/fa";



const Todo = () => {
    const {userEmail,userId}=useGlobalContext()
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [items, setitems] = useState([])
    const [complete, setcomplete] = useState(false)

    const handleTodoTitle=(e)=>{
         e.preventDefault();
    settitle(e.target.value) 
    
    }
       const handleTodoDescription=(e)=>{
         e.preventDefault();
    setdescription(e.target.value) 
   
    }
    useEffect(() => {

        async function getTasks() {
             try {
               // console.log(`user id is ${userId}`);
                  const data=await axios.get(`http://127.0.0.1:5000/tasks/${1}`,{ })

            // if (data.status===200)  alert(`Success`)
          
          //  console.log(`data is ${JSON.stringify(data.data.tasks)}`);

             let newTasks=data.data.tasks
            // console.log(newTasks);
    
             setitems(newTasks)
            // console.log(items);
            // setitems(data.data)

            } catch (error) {
            console.error(`Error 404: ${error}`)
            alert ('Backend servers might be down')
            }
        }
        getTasks()
         
   
    }, [])
    

const submitTask=async()=>{
    //console.error(`${title} and ${description} and ${userId}`);
    if (userId===null) console.log(`UserID not found`); 
     try {
      const data=await axios.post('http://127.0.0.1:5000/create_task/',{  
        title:title,
        description:description,
        userId:userId
      })
     
      if (data.status===201)  alert(`Success`)
      //  navigate('Todo')  //Navigate to the todo App,to be created
       
    } catch (error) {
       console.error(`Error 404: ${error}`)
       alert ('An error occured.Backend servers might be down')
    }
}

const deleteTask=(taskId)=>{
  async function deleteItem(taskid) {
     try {
      const data=await axios.delete(`http://127.0.0.1:5000/delete_task/${taskid}`,{})
     
      if (data.status===200)  alert(`Success.TASK DELETED`)
      //  navigate('Todo')  //Navigate to the todo App,to be created
       
    } catch (error) {
       console.error(`Error 404: ${error}`)
       alert ('An error occured.Backend servers might be down')
       return
    }
    
  }
  deleteItem(taskId)
  let aftereDeletedItems=items.filter((item)=>{
    return item.id!==taskId
  })
 setitems(aftereDeletedItems)


}
  
  
  return (
    <>
    <div className='todo-input'>
        <h2>Todo Header</h2>
      <div className="form-row">
        <label htmlFor="header" className='form-label'>Title</label>
        <input type='text'  id="header" className='form-input' value={title} onChange={handleTodoTitle} />
    </div>
    
    <div className="form-row">
        <label htmlFor="description" className='form-label'>Description</label>
        <input type='text'  id="description" className='description-input'value={description} onChange={handleTodoDescription} />
    </div>
    <div className="login-buttons">
              <button className="btn" onClick={submitTask}>Create Task</button>
            </div>
           
             <div className="todos">
                 <h2>Todos</h2>
                 {items.length<1? '' : <>
                { items.map((task)=>{
                    const{id,title,description}=task
                    return  <div className="item" key={id}>
                        <button onClick={()=>setcomplete(!complete)}><FaCheck /></button>
                       
                       <div className="task" key={id}> 
                             {/* <h3 >{title}</h3> */}
                              <h3 style={complete?{ textDecoration: 'line-through' }:{ textDecoration: 'none' }}>{title}</h3>
                            <h4 style={complete?{ textDecoration: 'line-through' }:{ textDecoration: 'none' }}>{description}</h4>
                         
                        </div> 
                            <button onClick={()=>deleteTask(id)}><FaTrash/></button>
                        
                             </div>
                    
                })}
                 </>}
             
    
    </div>
    </div>

   
    </>
  )
}

export default Todo
