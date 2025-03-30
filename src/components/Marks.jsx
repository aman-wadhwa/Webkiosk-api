import { getMarks } from "../Context/Actions"
import { useEffect, useContext, useState } from "react"
import UserContext from "../Context/UserContext";
import Header from "./Header";
function Marks() {
    const {semesters} = useContext(UserContext)
  const [selected, setselected] = useState("All")
  const [marks, setMarks] = useState([])
  useEffect(()=>{
    change('ALL')
  },[])

  const change = async (s) =>{
    const res = await getMarks(s)
    setMarks(res)
  }

  const handleChange = (evt) => {
    evt.preventDefault()
    change(evt.target.value)
    setselected(evt.target.value)
  }
  
  return (
    <div className="flex" style={{backgroundColor:"#2f3037"}}>
      <Header/>
      <div  className="flex-col h-screen w-full justify-center mt-auto mb-auto flex-1 p-6 overflow-y-auto text-white">
        <h2 className="text-3xl mb-6 hero">Marks</h2>
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
              <td className="border border-gray-400 px-4 py-3 text-center">Event</td>
              <td className="border border-gray-400 px-4 py-3 text-center">Marks</td>
              <td className="border border-gray-400 px-4 py-3 text-center">Outof</td>
            </tr>
          </thead>
          <tbody>
            {marks.length>0 ? (
              marks.map((mark)=>{
                return (
                  <tr>
                    <td className="border border-gray-400 px-4 py-3 text-left">{mark[0]}</td>
                    <td className="border border-gray-400 px-4 py-3 text-center">{mark[1]}</td>
                    <td className="border border-gray-400 px-4 py-3 text-center">{mark[2]}</td>
                    <td className="border border-gray-400 px-4 py-3 text-center">{mark[3]}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={4} className="border border-gray-400 px-4 py-3 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )

}

export default Marks
