import { login } from "../Context/Actions"
import { useState, useContext, useEffect} from "react"
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Input() {
    const [roll, setroll] = useState("");
    const [pass, setpass] = useState("");
    const [showpass, setshowpass] = useState(false)
    const {dispatch, islogin} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(islogin) navigate('/home')
    }, [islogin, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen" style={{backgroundColor:"#d3d3d3"}}>
      <form className="p-8 rounded-lg shadow-md w-full max-w-md bg-[#000000] text-white"onSubmit={(evt)=>{
        evt.preventDefault();
        login(roll, pass, dispatch)
      }}>
        <div className="mb-8">
        <label className="block text-sm font-semibold mb-1 mb-3">Roll no. : </label>
        <input type="text" className="w-full px-3 py-2 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2" onChange={(evt)=>setroll(evt.target.value)} name="roll" placeholder="...."/>
        </div>
        <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 mb-3">Password : </label>
        <div className="relative">
          <input type={showpass ? "text" : "password"} className='w-full px-3 py-2 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 ' onChange={(evt)=>setpass(evt.target.value)} name="pass" placeholder="..."/>
          <button type="button" onClick={()=>setshowpass(!showpass)} className="absolute right-3 top-2 text-gray-400 hover:opacity-50 mt-1">{showpass ? <FaEyeSlash/> : <FaEye/>}</button>
          </div></div>
        <button className="mt-10 w-full bg-white text-gray-900 hover:bg-gray-400 font-semibold py-2 rounded-md transition duration-200" type="submit">Login</button>
      </form>
    </div>
  )
}

export default Input
