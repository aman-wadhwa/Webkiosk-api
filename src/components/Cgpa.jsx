import { useEffect, useState } from "react"
import { getCgpa } from "../Context/Actions"
import Header from "./Header"
function Cgpa() {
  const [cgpa, setCgpa] = useState([])
  useEffect(()=>{
    change()
  }, [])

  const change = async () => {
    const cg = await getCgpa()
    setCgpa(cg)
  }
  return (
    <div className="flex" style={{backgroundColor:"#2f3037"}}>
      <Header/>
      <div  className="flex-col h-screen w-full justify-center mt-auto mb-auto flex-1 p-6 overflow-y-auto text-white">
      <h2 className="text-3xl mb-6 hero">CGPA</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-none shadow-lg">
          <thead className="">
            <tr>
              <td className="border border-gray-400 px-4 py-3 text-left">Semester</td>
              <td className="border border-gray-400 px-4 py-3 text-center">SGPA</td>
              <td className="border border-gray-400 px-4 py-3 text-center">CGPA</td>
            </tr>
          </thead>
          <tbody>
            {cgpa.length>0 ? (
              cgpa.map((x)=>{
                return (
                  <tr>
                    <td className="border border-gray-400 px-4 py-3 text-left">{x[0]}</td>
                    <td className="border border-gray-400 px-4 py-3 text-center">{x[1]}</td>
                    <td className="border border-gray-400 px-4 py-3 text-center">{x[2]}</td>
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

export default Cgpa
