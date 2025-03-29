import { login } from "../Context/Actions"
import { useState, useContext, useEffect} from "react"
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
function Input() {
    const [roll, setroll] = useState("");
    const [pass, setpass] = useState("");
    const {dispatch, islogin} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(islogin) navigate('/home')
    }, [islogin])

  return (
    <div>
      <form onSubmit={(evt)=>{
        evt.preventDefault();
        login(roll, pass, dispatch)
      }}>
        <div><input type="text" className='text-black' onChange={(evt)=>setroll(evt.target.value)} name="roll" placeholder="Enter roll number "/></div>
        <div><input type="text" className='text-black' onChange={(evt)=>setpass(evt.target.value)} name="pass" placeholder="Enter password "/></div>
        <div className="mt-10"><button className="btn btn-ghost" type="submit">Login</button></div>
      </form>
    </div>
  )
}

export default Input
