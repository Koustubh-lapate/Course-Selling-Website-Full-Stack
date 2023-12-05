import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useState } from "react";

function AddCourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return(
        <div>
            <div style={{
                paddingTop: 100,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>

                <Typography variant="h6">
                <b>Add Course below!</b>
                </Typography>

            </div>

            <div style={{display: "flex", justifyContent: "center"}}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20,
                }}>
                    <TextField 
                    fullWidth={true} 
                    id="outlined-basic" 
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}

                    label="Title" 
                    variant="outlined" />
                    <br/><br/>
                    
                    <TextField 
                    fullWidth={true} 
                    id="outlined-basic"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    
                    
                    label="Description" 
                    variant="outlined" />
                    <br/><br/>

                    <Button 
                    size="large" 
                    variant="contained"
                    
                    onClick={() => {
                        fetch("http://localhost:3000/admin/courses", {
                            method: "POST",

                            body: {
                                title: title,
                                description: description,
                                imageLink: "",
                                published: "YES"
                            },

                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem(token)
                            }
                        })
                    }}

                    >Submit</Button>
                
                </Card>

            </div>
        
        </div>
    )
}

export default AddCourse;