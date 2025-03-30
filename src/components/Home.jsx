import Header from "./Header"
import image from './assets/image.png'
function Home() {
  return (
    
    <div className='flex' style={{backgroundColor:"#2f3037"}} >
      <Header/>
        <div className="flex items-center justify-center h-screen w-full"><img src={image} alt='img' className="w-80 h-100"/></div>
    </div>
  )
}

export default Home
