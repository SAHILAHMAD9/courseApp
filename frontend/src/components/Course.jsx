import React, { useState } from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, TextField,Link } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import defaultImage from '../assets/Com.jpeg';
//                                          ***********   ADMIN EDIT COURSE ***********
export const Course = () => {
    const loggedIn = localStorage.getItem('teacher') === 'true';
    const [courses , setCourses] = useState([]);
    const [course ,setCourse] = useState({
      title:"", description:"", price:"",imageLink:""
    });
    const [published, setPublished] = useState(false);
    const {courseId} = useParams();
    const navigate = useNavigate();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

    function changeHandler(event) {
      const { name , value } = event.target;
      setCourse((prev) =>({
        ...prev ,
        [name]:value
      }))  
      console.log(loggedIn);
    };
    
    useEffect(() => {
            if (!loggedIn) {
              toast.error('Login FIrst');
              navigate('/login'); 
              return;
            }
        console.log("Fetching courses...");
        fetch(`${backendUrl}/admin/courses`, {
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
              setCourses(data.courses); 
            }
          })
          .catch((error) => {
            console.error("Network error:", error);
          });
      }, [courseId]); 

      async function submitHandler() {
        try {
          const response = await fetch(`${backendUrl}/admin/courses/${courseId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body:JSON.stringify({
            title:course.title,
            description:course.description,
            price:course.price,
            imageLink:course.imageLink,
            published:published
          }),
          });
          const data = await response.json();
          if (!response.ok) {
            console.error('Response error:', data.message || 'Authorization Failed');
            toast.error(data.message || 'Authorization Failed');
          } else {
            toast.success("Course Updated successfully!");
            navigate('/admin/courses');
          }
        } catch (error) {
          console.error("Error deleting course:", error);
          toast.error("Failed to Upload the course. Please try again.");
        }
      }
      
      async function deleteHandler() {
        try {
          const response = await fetch(`${backendUrl}/admin/delete/${courseId}`, {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });
          const data = await response.json();
          if (!response.ok) {
            console.error('Response error:', data.message || 'Authorization Failed');
            toast.error(data.message || 'Authorization Failed');
          } else {
            toast.success("Course Deleted Successfully!");
            navigate('/admin/courses');
          }
        } catch (error) {
          console.error("Error deleting course:", error);
          toast.error("Failed to Delete the Course. Please try Again.");
        }
      }
    
      const c = courses.find((c) => c._id === courseId);
      if (!c) {
        return <div>Course not found</div>;
      }

  return (
    <div className='w-full flex flex-col p-4 flex-wrap justify-center items-center bg-slate-200 h-full' >
        {course ? (<div className='flex flex-col justify-center items-center p-4'>
          <Card
  sx={{ maxWidth: 345, margin: '1px' }}
  className="sm:max-w-xs md:max-w-md mx-auto" >
  <CardActionArea>
    {/* Responsive Image */}
    <img
      component="img"
      className="w-full h-36 object-cover object-center" 
      sx={{
        height: '140px',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
      image={course.imageLink || defaultImage}
      alt={c.title || 'Course Image'}
    />
    {/* Card Content */}
    <CardContent>
      <Typography gutterBottom variant="h5" fontSize={30} component="div">
        {c.title || 'Untitled'}
      </Typography>
      <Typography variant="body2" sx={{ color: '#6495ED' }}>
        {c.description || 'No description available.'}
      </Typography>
      <Typography variant="body2" sx={{ color: '#AC301D' }}>
        Price: ${c.price || '0.00'}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Course ID: {c._id || 'N/A'}
      </Typography>
      <Typography variant="body2" sx={{ color: '#E2730D' }}>
        Published: {c.published ? 'true' : 'false'}
      </Typography>
    </CardContent>
  </CardActionArea>
  {/* Card Actions */}
  <CardActions className="flex justify-end">
    <Chip
      label="Delete this Course"
      onClick={deleteHandler}
      deleteIcon={<DeleteIcon />}
      variant="outlined"
    />
  </CardActions>
</Card>

{/* Add Course Card */}
<Card
  className="flex w-full sm:max-w-sm md:max-w-lg mt-10 p-4 gap-4 items-center flex-col mx-auto"
>
  <h1 className="text-xl font-semibold">Add your Course</h1>
  <TextField
    className="w-full"
    type="text"
    onChange={changeHandler}
    value={course.title}
    name="title"
    label="Title"
    variant="outlined"
  />
  <TextField
    className="w-full"
    type="text"
    onChange={changeHandler}
    value={course.description}
    name="description"
    label="Description"
    variant="outlined"
  />
  <TextField
    className="w-full"
    type="text"
    onChange={changeHandler}
    value={course.imageLink}
    name="imageLink"
    label="Image URL"
    variant="outlined"
  />
  <TextField
    className="w-full"
    type="number"
    onChange={changeHandler}
    value={course.price}
    name="price"
    label="Price"
    variant="outlined"
  />
  <div className="flex items-center w-full">
    <p className="mr-2">Published</p>
    <Checkbox
      checked={published}
      onClick={(e) => setPublished(e.target.checked)}
    />
  </div>
  <Button className="w-full" variant="contained" onClick={submitHandler}>
    Submit
  </Button>
</Card>

        </div>) : (<div>Course not found</div>)}
    </div>    
  )
}
