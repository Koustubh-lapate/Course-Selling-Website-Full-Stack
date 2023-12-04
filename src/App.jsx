import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Signup";
import Appbar from "./Appbar";
import Signin from "./Signin";

function App(){
    return(
        <div style={{width: "100vw", 
        height: "100vh", 
        backgroundColor: "#eeeeee"}}>

            <Appbar />
            
            <Router>

                <Routes>
                    <Route path="/login" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            
            </Router>
        
        </div>
    )
}

export default App;