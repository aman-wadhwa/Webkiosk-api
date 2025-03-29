import { useContext, useEffect, useState } from "react"
import UserContext from "../Context/UserContext"
import { getCgpa } from "../Context/Actions"
function Cgpa() {
  const {semesters} = useContext(UserContext)
  const [cgpa, setCgpa] = useState([])
  useEffect(()=>{
    setCgpa(getCgpa())
  }, [])
  return (
    <div>
      cgpa
      <div>{cgpa}</div>
    </div>
  )
}

export default Cgpa
