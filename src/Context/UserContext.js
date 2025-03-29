import { createContext } from "react";
import { useEffect, useReducer} from "react";
import { fetchUser } from "./Actions";
import UserReducer from "./UserReducer";
const UserContext = createContext()

export const UserProvider = ({children}) => {
    
    const initialstate = {islogin : false, semesters : []}
    const [state, dispatch] = useReducer(UserReducer, initialstate)

    useEffect(()=>{
        fetchUser()
    }, [])

    return <UserContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext