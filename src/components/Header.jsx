import { Link } from "react-router-dom"
function Header() {
  const btnclass = 'font-sans w-80 flex items-center justify-center gap-2 p-2 text-white transition-all duration-200 hover:p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-2 outline outline-1'
  return (
    <div>
     <div style={{backgroundColor:"rgb(56,34,15, 0.8)"}}className="flex items-center flex-col h-screen w-80">
      <div className="flex flex-col gap-6 p-4 justify-center mt-auto mb-auto">
      <Link className={btnclass} to="/Home">HOME</Link>
      <Link className={btnclass} to='/marks'>MARKS</Link>
      <Link to='/grades' className={btnclass}>GRADES</Link>
      <Link to='/cgpa' className={btnclass}>CGPA</Link>
      </div>
     </div>
    </div>
  )
}

export default Header
