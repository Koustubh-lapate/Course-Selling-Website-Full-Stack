import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Signup";
import Appbar from "./Appbar";
import Signin from "./Signin";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";

function App(){
    return(
        <div style={{width: "100vw", 
        height: "100vh", 
        backgroundColor: "#eeeeee"}}>
            
            <Router>

                <Appbar />
                
                <Routes>
                    <Route path="/login" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/addcourse" element={<AddCourse />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path='/courses/:courseId' element={<Course />} />
                </Routes>
            
            </Router>
        
        </div>
    )
}

export default App;