import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'; 
import { Button, Card, TextField,Link } from '@mui/material'
import { Landing } from './Landing';
import { useState } from 'react';
import { useEffect } from 'react';
import { CourseCard } from './CourseCard';
//                                          ***********   ADMIN COURSE ***********
export const ShowCourses = (props) => {
  const loggedIn = localStorage.getItem('teacher') === 'true';
  // const loggedIn = props.loggedIn;
  // const setLoggedIn = props.setLoggedIn;
  const [course , setCourse] = useState([]);
  const navigate  = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    console.log("Fetching courses...");
  
    fetch(`${backendUrl}/admin/courses/`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token'),
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json(); 
          console.error("Error fetching courses:", errorData.message || "Unknown error");
        } else {
          const data = await res.json();
          console.log("Courses fetched successfully:", data);
          setCourse(data.courses); 
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }, []); 
  
  if (!loggedIn) {
    return(
      <div>
        <Landing/>
      </div>
    )
  }
  return (
    <div className='w-full flex flex-col p-4 flex-wrap justify-center items-center bg-slate-200 h-fit ' >
    { course.length > 0 ? ( <div className="flex flex-wrap gap-4">
        { course.map((course)=>{
          return (<CourseCard key={course._id} course={course}/>)
          })
        }
      </div> 
      ) : ( <p className="text-gray-500">No courses available.</p>)
    }
       
    </div>
  )
}
