import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './Pages/Login'
import Error from './Pages/Error'
import CreateAccount from './Pages/CreateAccount'
import Todo from './Pages/Todo'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Create/' element={<CreateAccount/>}/>
            <Route path='/Todo/' element={<Todo/>}/>
            <Route path='*' element={<Error/>}/>

        </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
