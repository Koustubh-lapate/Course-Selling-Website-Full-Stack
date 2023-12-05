import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Appbar(){
    const navigate = useNavigate();

    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4
    }}>
        <div style={{marginLeft: 10}}>
            <Typography variant="h6"><b>Course Khazana</b></Typography>
        </div>
        
        <div style={{display: "flex"}}>
            
            <div style={{marginRight: 10}}>
                <Button 
                variant="contained"
                onClick={() => {
                    navigate("/signup");
                }}
                
                >Sign Up</Button>
            </div>

            <div>
                <Button 
                variant="contained"
                onClick={() => {
                    navigate("/login");
                }}

                >Sign In</Button>
            </div>
            
        </div>

    </div>
}

export default Appbar;