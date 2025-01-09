import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'; 
import { Button, Card, TextField,Link } from '@mui/material'
import { Landing } from './Landing';
import { useState } from 'react';
import { useEffect } from 'react';
import { UcourseCard } from './UcourseCard';
//                                          ***********   USER COURSE ***********
export const UserCourses = (props) => {
  const loggedIn = localStorage.getItem('student') === 'true';
  // const loggedIn = props.loggedIn;
  // const setLoggedIn = props.setLoggedIn;
  const [course , setCourse] = useState([]);
  const navigate  = useNavigate();
console.log([course]);

  useEffect(() => {
    console.log("Fetching courses...");
    fetch(`${PORT}/users/courses`, {
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

  if (course==null) {
    navigate('/')
  }
  return (
    <div className='w-full flex flex-col p-4 flex-wrap justify-center items-center bg-slate-200 h-full' >
    { course.length > 0 ? ( <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        { course.map((course)=>{
          return (<UcourseCard key={course._id} course={course}/>)
          })
        }
      </div> 
      ) : ( <p className="text-gray-500">No courses available.</p>)
    }

       
    </div>
  )
}