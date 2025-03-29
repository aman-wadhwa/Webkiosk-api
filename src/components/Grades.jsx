import { getGrades } from "../Context/Actions"
import { useEffect, useContext, useState } from "react"
import UserContext from "../Context/UserContext";
function Grades() {

  const {semesters} = useContext(UserContext)
  const [selected, setselected] = useState("All")
  const [grades, setGrades] = useState([])
  useEffect(()=>{
    setGrades(getGrades("ALL"));
  },[])

  const handleChange = (evt) => {
    evt.preventDefault()
    setGrades(getGrades(evt.target.value))
    setselected(evt.target.value)
  }
  
  return (
    <div>
      <select name='selectgrades' onChange={handleChange}>
        {semesters.map((semester, index)=>{
           return <option key={index} value={semester} selected={semester===selected}>{semester}</option>
        })}
      </select>
      <div>{grades}</div>
    </div>
  )
}

export default Grades
