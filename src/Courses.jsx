import { useEffect } from "react";
import { useState } from "react";

function Courses(){
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
                setCourses(data)
            })
        })
    }, [])

    return (
        <div>
            {JSON.stringify(courses)}
        </div>
    )
}

export default Courses;