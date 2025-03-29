import { getMarks } from "../Context/Actions"
import { useEffect, useContext, useState } from "react"
import UserContext from "../Context/UserContext";
function Marks() {
    const {semesters} = useContext(UserContext)
  const [selected, setselected] = useState("All")
  const [marks, setMarks] = useState([])
  useEffect(()=>{
    setMarks(getMarks("ALL"));
  },[])

  const handleChange = (evt) => {
    evt.preventDefault()
    setMarks(getMarks(evt.target.value))
    setselected(evt.target.value)
  }
  
  return (
    <div>
      <select name='selectgrades' onChange={handleChange}>
        {semesters.map((semester, index)=>{
           return <option key={index} value={semester} selected={semester===selected}>{semester}</option>
        })}
      </select>
      <div>{marks}</div>
    </div>
  )
}

export default Marks
