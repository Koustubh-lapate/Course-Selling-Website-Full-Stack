import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

function Signup(){
    return(
        <div>
            <div style={{
                paddingTop: 100,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>

                <Typography variant="h6">
                <b>Welcome to Course Khazana! Sign Up below</b>
                </Typography>

            </div>

            <div style={{display: "flex", justifyContent: "center"}}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20,
                }}>
                    <TextField fullWidth={true} id="email" label="Email" variant="outlined" />
                    <br/><br/>
                    <TextField fullWidth={true} id="password" label="Password" variant="outlined" type="password" />
                    <br/><br/>


                    <Button 
                    size="large" 
                    variant="contained"
                    
                    onClick={() => {
                        let emailID = document.getElementById("email").value;
                        let pass = document.getElementById("password").value;

                        fetch("http://localhost:3000/admin/signup", {
                            method: POST,
                            
                            body: JSON.stringify({
                                emailID,
                                pass
                            }),

                            headers: {
                                "Content-type": "application/json"
                            }
                        })
                    }}
                    
                    >Sign Up</Button>
                
                </Card>

            </div>
        
        </div>
    )
}

export default Signup;