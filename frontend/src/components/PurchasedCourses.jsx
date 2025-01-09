import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'; 
import { Button, Card, TextField,Link } from '@mui/material'
import { Landing } from './Landing';
import { useState } from 'react';
import { useEffect } from 'react';
import { CourseCard } from './CourseCard';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import defaultImage from '../assets/Com.jpeg';

export const PurchasedCourses = () => {
    const loggedIn = localStorage.getItem('student') === 'true';
    // const loggedIn = props.loggedIn;
    // const setLoggedIn = props.setLoggedIn;
    const [course , setCourse] = useState([]);
    const navigate  = useNavigate();
  
    useEffect(() => {
      console.log("Fetching courses...");
    
      fetch(`${PORT}/users/purchasedCourses`, {
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
            setCourse(data.purchasedCourses); 
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
      <div className='w-full flex flex-col p-4 flex-wrap justify-center items-center bg-slate-200 h-full' >
      { course.length > 0 ? ( <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          { course.map((course)=>{
            return (<PurchasedCourseCard key={course._id} course={course}/>)
            })
          }
        </div> 
        ) : ( <p className="text-gray-500">No courses purchased yet!.</p>)
      }
         
      </div>
    )
}

//                                     *********  COURSE CARD ********* 
const PurchasedCourseCard = (props) => {
    const course = props.course;
    const  courseId = course._id;
  return (
    <Card
    sx={{ maxWidth: 345, font:'sans' , margin: '10px' }}
    className="sm:max-w-xs md:max-w-md mx-auto" // Tailwind for responsiveness
  >
    <CardActionArea>
      {/* Responsive Image */}
      <img
        component="img"
        className="w-full h-36 object-cover object-center" // Tailwind for responsiveness
        sx={{
          height: '140px',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src={course.imageLink || defaultImage}
        alt={course.title || 'Course Image'}
      />
      {/* Card Content */}
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{color:'#1e394b'}} fontSize={30} component="div">
          {course.title || 'Untitled'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6495ED' }}>
          {course.description || 'No description available.'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#AC301D' }}>
          Price: ${course.price || '0.00'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Course ID: {course._id || 'N/A'}
        </Typography>
        <Typography variant="body2 " sx={{ color: 'text.secondary' }}>
          Puchaged: {course.published ? 'true' : 'false'}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  );
};
