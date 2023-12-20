import { Typography, Card, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Course(){
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses/" + courseId, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            return resp.json().then((data) => {
                setCourse(data.course);
            })
        })
    }, []);

    if(!course){
        return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            Loading...
        </div>
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <CourseCard course={course} />
            <UpdateCard course={course} setCourse={setCourse} />
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
            <Typography textAlign={"center"} variant="h5">{course.price}</Typography>
        </Card>
    )
}

function UpdateCard({course, setCourse}){
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [image, setImage] = useState(course.image); 
    const [price, setPrice] = useState(course.price);

    return(
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20,
                }}>

                    <Typography textAlign={"center"} variant="h5">Update Course Details!</Typography>

                    <TextField 
                    fullWidth={true}
                    value={title} 
                    id="outlined-basic" 
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}

                    label="Title" 
                    variant="outlined" />
                    <br/><br/>
                    
                    <TextField 
                    fullWidth={true} 
                    value={description}
                    id="outlined-basic"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    
                    
                    label="Description" 
                    variant="outlined" />
                    <br/><br/>

                    <TextField 
                    fullWidth={true} 
                    value={image}
                    id="outlined-basic"
                    onChange={(e) => {
                        setImage(e.target.value);
                    }}
                    
                    
                    label="Image Link" 
                    variant="outlined" />
                    <br/><br/>

                    <TextField 
                    fullWidth={true} 
                    value={price}
                    id="outlined-basic"
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    
                    
                    label="Price" 
                    variant="outlined" />
                    <br/><br/>

                    <Button 
                    size="large" 
                    variant="contained"
                    
                    onClick={() => {
                        fetch("http://localhost:3000/admin/courses/" + course._id, {
                            method: "PUT",

                            body: JSON.stringify({
                                title: title,
                                description: description,
                                price: price,
                                imageLink: image,
                                published: true
                            }),

                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }

                        }).then((resp) => {
                            return resp.json().then((data) => {
                                
                                let updateCourse = {
                                    _id: course._id,
                                    title: title,
                                    description: description,
                                    imageLink: image,
                                    price: price
                                }

                                setCourse(updateCourse);

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