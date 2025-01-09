import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router';
import defaultImage from '../assets/Com.jpeg';

//                                          ***********   USER COURSE ***********
export const UcourseCard = (props) => {
    const course = props.course;
    const  courseId = course._id;
    const [purchased , setPurchased] = useState([]);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
      console.log("Fetching courses...");
      fetch(`${backendUrl}/users/purchasedCourses`, {
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
            setPurchased(data.purchasedCourses); 
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
    }, []); 

    async function purchageHandler() {
      const isPurchased = purchased.some((p) => p._id === courseId);
    if (isPurchased) {
      toast.error(['Course Already Purchased']);
      return ;
    } else {
      try {
        const response = await fetch(`${backendUrl}/users/courses/${courseId}`, {
          method:"POST",
          headers: {
              Authorization: "Bearer " + localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        if (!response.ok) {
          console.error('Response error:', data.message || 'Authorization Failed');
          toast.error(data.message || 'Authorization Failed');
        } else {
          toast.success("Course Purchaged successfully!");
          navigate('/user/purchases');
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        toast.error("Failed to Purchage this course. Please try again.");
      }
    }
  }
  return (
    <Card
    sx={{ maxWidth: 345, margin: '10px' }}
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
        <Typography gutterBottom variant="h5" fontSize={30} component="div">
          {course.title || 'Untitled'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6495ED' }}>
          {course.description || 'No description available.'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#AC301D' }}>
          Price: ${course.price || '0.00'}
        </Typography>
        <Typography variant="body2">
          Course ID: {course._id || 'N/A'}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
          <Button size="small"  onClick={purchageHandler} color="primary">
            Purchage
          </Button>
        </CardActions>
  </Card>
  );
};
