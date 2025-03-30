import { Link } from "react-router-dom"
function Header() {
  const btnclass = 'font-sans w-80 flex items-center justify-center gap-2 p-2 text-white transition-all duration-200 hover:p-4 border-t-2 hover:outline-white hover:outline-offset-2 border-b-2 bg-transparent'
  return (
    <div>
     <div style={{backgroundColor:"#26262c"}}className="flex items-center flex-col h-screen w-80">
      <div className="flex flex-col gap-6 p-4 justify-center mt-auto mb-auto">
      <Link className={`${btnclass} hover:border-t-2`} to="/Home">HOME</Link>
      <Link className={btnclass} to='/marks'>MARKS</Link>
      <Link to='/grades' className={btnclass}>GRADES</Link>
      <Link to='/cgpa' className={btnclass}>CGPA</Link>
      </div>
     </div>
    </div>
  )
}

export default Header
