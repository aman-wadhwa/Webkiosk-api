import { UserProvider } from "./Context/UserContext";
import Home from "./components/Home";
import Input from "./components/Input";
import Grades from "./components/Grades";
import PersonalInfo from "./components/PersonalInfo";
import Cgpa from "./components/Cgpa"; 
import Marks from "./components/Marks";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {

  return (

    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Input/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/marks' element={<Marks/>}/>
          <Route path='/info' element={<PersonalInfo/>}/>
          <Route path='/grades' element={<Grades/>}/>
          <Route path='/cgpa' element={<Cgpa/>}/>
        </Routes>
      </Router>
      
    </UserProvider>
  );
}

export default App;
