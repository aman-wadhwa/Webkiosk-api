import { UserProvider } from "./Context/UserContext";
import UserContext from "./Context/UserContext";
import { useContext } from "react";
import Home from "./components/Home";
import Input from "./components/Input";
import Grades from "./components/Grades";
import Header from "./components/Header";
import Cgpa from "./components/Cgpa"; 
import Marks from "./components/Marks";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {

  return (

    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Input/>}/>
          <Route path='/home' element={<><Header/><Home/></>}/>
          <Route path='/marks' element={<><Header/><Marks/></>}/>
          <Route path='/grades' element={<><Header/><Grades/></>}/>
          <Route path='/cgpa' element={<><Header/><Cgpa/></>}/>
        </Routes>
      </Router>
      
    </UserProvider>
  );
}

export default App;
