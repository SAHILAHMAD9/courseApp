import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { PurchasedCourses } from './PurchasedCourses';
//                                          ***********   ADMIN & USER ***********
export const Navbar = (props) => {
    const navigate = useNavigate();
    // const loggedIn = props.loggedIn;
    // const setLoggedIn = props.setLoggedIn;
    const teacherLoggedIn = localStorage.getItem('teacher') === 'true';
    const studentLoggedIn = localStorage.getItem('student') === 'true';
    const loggedIn = teacherLoggedIn || studentLoggedIn ;
    const [username , setUsername] = useState("");

    useEffect(() => {
      if (loggedIn ) {
        fetch('http://localhost:3000/me', {
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res) => {
            if (!res.ok) {
              // setLoggedIn(false);
              // console.log(teacherLoggedIn);
              console.log('navjs L28');
            }
            return res.json();
          })
          .then((data) => {
            setUsername(data.username);
            console.log(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    }, [loggedIn]);

 function mycoursesHandler() {
     return (
     navigate('/user/purchases')
     )
    }
    function dashHandler() {
      if (teacherLoggedIn) {
        navigate('/admin/courses')
      }
      if (studentLoggedIn) {
        navigate('/user/courses')
      }
    }
    function clickHandler() {
      if (loggedIn) {
        navigate('/addcourse');
      } else {
        toast.error('Please Login First');
      }
    }
    function clickHandlerLogin() {
       navigate('/login') 
    }
  
    function clickHandlerlogout() {
       // setLoggedIn(false);
      // localStorage.setItem('loggedIn',"false");
      // localStorage.setItem('token',null);
      localStorage.clear();
      console.log(loggedIn);
      window.location="/";
    }
    return (
    <div className='flex w-full justify-between px-10 p-4'>
    <a href='/'><h1 className='text-2xl font-bold'>Coursera</h1></a>
    <div className='gap-4 justify-center items-center flex'>
      {
        loggedIn ? <Box component="section"  sx={{ p: 2,height:'25px',justifyContent:'center', display:'flex', alignItems:'center', border: '1px dashed grey' }}>
        {username}  
        </Box> : ''
      }
    {
      teacherLoggedIn ? (<Button variant="contained" onClick={clickHandler} >Add course</Button>) : 
      (<div/> ) 
    }
    {
      studentLoggedIn ? (<Button variant="contained" onClick={mycoursesHandler} >My Courses</Button>) :
      (<div/>)
    }
    {loggedIn ?
      <Button variant="contained" onClick={dashHandler}>DASHBOARD</Button> :////////
      <Button variant="contained" onClick={()=>{navigate('/register')}}>REGISTER</Button> 
      }
    {
      loggedIn ?
      <Button variant="contained" onClick={clickHandlerlogout}>LOG OUT</Button> :
      <Button variant="contained" onClick={clickHandlerLogin}>LOG IN</Button>
    }
    </div>
    </div>
  )
}
