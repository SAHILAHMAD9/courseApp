import { Button } from '@mui/material'
import React from 'react'
//                                          ***********   ADMIN & USER ***********
export const Landing = (props) => {
  const teacherLoggedIn = localStorage.getItem('teacher') === 'true';
  const studentLoggedIn = localStorage.getItem('student') === 'true';
  // console.log(teacherLoggedIn);
  // console.log(studentLoggedIn);
  
  
  return (
    <div className='flex w-full items-center my-20 gap-20 justify-center flex-col'>
       <h1 className='font-extrabold text-4xl'>Welcome to course selling website!</h1>
       <div className='flex flex-col gap-5 w-[300px] '>
       <Button variant="outlined" href="/register" className='h-[5 0px]'>REGISTER</Button>
       <Button variant="outlined" href="/login"  >LOG IN</Button>
       </div>
    </div>
  )
}