import { Button, Card, TextField,Link } from '@mui/material'
import React, { useState  } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router'; 
import toast from 'react-hot-toast';
import { Landing } from './Landing';
//                                              ***********   ADMIN COURSE ***********
export const CreateCourse = (props) => {
  const [course ,setCourse] = useState({
    title:"", description:"", price:"",imageLink:""
  });
  const [published, setPublished] = useState(false);
  const loggedIn = localStorage.getItem('teacher') === 'true';
//  const loggedIn = props.loggedIn;
 const navigate= useNavigate();

  function changeHandler(event) {
    const { name , value } = event.target;
    setCourse((prev) =>({
      ...prev ,
      [name]:value
    }))  
    console.log(loggedIn);
  };

  async function clickHandler() {
    if (!loggedIn) {
      console.log("Please Login First");
      toast.error("Unauthorized User")
    } else {
      try {
        const response = await fetch('http://localhost:3000/admin/courses',{
          method:"POST",
          body:JSON.stringify({
            title:course.title,
            description:course.description,
            price:course.price,
            imageLink:course.imageLink,
            published:published
          }),
          headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        });
        const data = await response.json();
        if (!response.ok) {
          console.log('Response error:', data.message || 'Autherization Failed');
          toast.error(data.message || 'Autherization Failed');
        }else{
          console.log(data);
          // localStorage.setItem('loggedIn','true');
          toast.success("Course Added successfully!");
          navigate('/admin/courses');
        }
      } catch (error) {
        console.log("catch me hoon");
        
      }
    }
  }
  return (
    <div>
      {
        loggedIn ? (<div className='flex flex-col mx-auto my-auto p-4 pt-5 w-full h-max items-center justify-center '>
    
          <Card
  className="flex w-full sm:max-w-sm md:max-w-lg mt-10 p-4 gap-6 items-center flex-col mx-auto"
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
  <Button
    className="w-full"
    onClick={clickHandler}
    variant="contained"
  >
    Submit
  </Button>
</Card>
</div> ):
(<Landing/> )
      }
    </div>
  )
}