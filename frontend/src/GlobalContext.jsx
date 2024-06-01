import { createContext, useContext ,useState} from "react";

const GlobalContext=createContext()

export  const useGlobalContext=()=>useContext(GlobalContext)

const AppContext=(props)=>{
     const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userId, setuserId] = useState(null)

    return <GlobalContext.Provider value={{userEmail,setUserEmail,userPassword,setUserPassword,userId,setuserId}}>
        {props.children}
    </GlobalContext.Provider>
}

export default AppContext