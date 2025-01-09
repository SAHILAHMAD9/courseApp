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
        fetch(`${PORT}/me`, {
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
      <div className="w-full flex flex-wrap justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <a href="/" className="text-2xl font-bold text-blue-600">
        Coursera
      </a>

      {/* Buttons Section */}
      <div className="flex flex-wrap gap-4 items-center">
        {loggedIn ? (
          <Box
            component="section"
            className="border border-dashed border-gray-400 px-4 py-1 rounded-md text-gray-700"
          >
            {username}
          </Box>
        ) : (
          ''
        )}
        {teacherLoggedIn ? (
          <Button
            variant="contained"
            onClick={clickHandler}
            className="bg-blue-500 hover:bg-[#25330f] text-white"
          >
            Add Course
          </Button>
        ) : (
          <div />
        )}
        {studentLoggedIn ? (
          <Button
            variant="contained"
            onClick={mycoursesHandler}
            className=" hover:bg-[#25330f] text-white"
          >
            My Courses
          </Button>
        ) : (
          <div />
        )}
        {loggedIn ? (
          <Button
            variant="contained"
            onClick={dashHandler}
            className=" hover:bg-[#223C63] text-white"
          >
            Dashboard
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              navigate('/register');
            }}
            className=" hover:bg-[#34685c] text-gray-800"
          >
            Register
          </Button>
        )}
        {loggedIn ? (
          <Button
            variant="contained"
            onClick={clickHandlerlogout}
            className=" hover:bg-[#A50C0A] text-white"
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={clickHandlerLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  )
}
