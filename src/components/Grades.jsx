import { getGrades } from "../Context/Actions"
import { useEffect, useContext, useState } from "react"
import UserContext from "../Context/UserContext";
import Header from "./Header";
function Grades() {

  const {semesters} = useContext(UserContext)
  const [selected, setselected] = useState("ALL")
  const [grades, setGrades] = useState([])
  useEffect(()=>{
    change('ALL')
  },[])

  const change = async (s) =>{
    const gradess = await getGrades(s)
    setGrades(gradess)
  }

  const handleChange = (evt) => {
    evt.preventDefault()
    setselected(evt.target.value)
  }
  
  return (
    <div className="flex" style={{backgroundColor:"#2f3037"}}>
      <Header/>
      <div  className="flex-col h-screen w-full justify-center mt-auto mb-auto flex-1 p-6 overflow-y-auto text-white">
        <h2 className="text-3xl mb-6 hero">Grades</h2>
        <div className="mb-4">
          <label htmlFor="selectgrades" className="font-semibold mr-2 ">Select semester : </label>
      <select id="selectgrades" name='selectgrades' onChange={handleChange} className="p-2 text-black border border-gray-600 rounded">
        {semesters.map((semester, index)=>{
           return <option key={index} value={semester} selected={semester===selected}>{semester}</option>
        })}
      </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-none shadow-lg">
          <thead className="">
            <tr>
              <td className="border border-gray-400 px-4 py-3 text-left">Subject</td>
              <td className="border border-gray-400 px-4 py-3 text-center">Marks</td>
              <td className="border border-gray-400 px-4 py-3 text-center">Grades</td>
            </tr>
          </thead>
          <tbody>
            {grades.length>0 ? (
              grades.filter((grade)=>(selected==='ALL' || grade[0]===selected)).map((grade)=>{
                return (
                  <tr>
                    <td className="border border-gray-400 px-4 py-3 text-left">{grade[1]}</td>
                    <td className="border border-gray-400 px-4 py-3 text-center">{grade[2]}</td>
                    <td className="border border-gray-400 px-4 py-3 text-center">{grade[3]}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={3} className="border border-gray-400 px-4 py-3 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default Grades
