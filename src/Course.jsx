import { Typography, Card, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Course(){
    const {courseId} = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            return resp.json().then((data) => {
                setCourses(data.courses);
            })
        })
    }, [])

    const course = courses.find((c) => c.id === courseId);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {course ? <CourseCard course={course} /> : null}
            <UpdateCard course={course} />
        </div>
    )
}

function CourseCard(props){
    const course = props.course; 

    return (
        <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200
        }}>

            <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
            <img src={course.imageLink} style={{width: 300}}></img>
        </Card>
    )
}

function UpdateCard(props){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(""); 
    const course = props.course;

    return(
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20,
                }}>

                    <Typography>Update Course Details!</Typography>

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

                    <TextField 
                    fullWidth={true} 
                    id="outlined-basic"
                    onChange={(e) => {
                        setImage(e.target.value);
                    }}
                    
                    
                    label="Image Link" 
                    variant="outlined" />
                    <br/><br/>

                    <Button 
                    size="large" 
                    variant="contained"
                    
                    onClick={() => {
                        fetch("http://localhost:3000/admin/courses/" + course.id, {
                            method: "PUT",

                            body: JSON.stringify({
                                title: title,
                                description: description,
                                price: 3000,
                                imageLink: image,
                                published: true
                            }),

                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }

                        }).then((resp) => {
                            return resp.json().then((data) => {
                                alert("Course Updated Successfully!");
                            })
                        })
                    }}

                    >Update Course</Button>
                
                </Card>

            </div>
        
        </div>
    )
}

export default Course;