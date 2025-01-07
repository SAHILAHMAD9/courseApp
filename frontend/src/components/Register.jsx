import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'; 
import { Button, Card, TextField,Link, Checkbox, FormControlLabel } from '@mui/material'
//                                          ***********   ADMIN & USER ***********
export const Register = (props) => {
  const [email,setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [teacher , setTeacher] = useState(false);
  const teacherLoggedIn = localStorage.getItem('teacher') === 'true';
  const studentLoggedIn = localStorage.getItem('student') === 'true';
  const loggedIn = teacherLoggedIn || studentLoggedIn ;
  const navigate = useNavigate();
  // const loggedIn = props.loggedIn;
  // const setLoggedIn = props.setLoggedIn;

  async function adminClickHandler() {
    if (!email || !password) {
      console.log("please enter something");
      toast.error("Plese enter userame and Password")
    } else {
      try {
        if (teacher) {
          const response =await fetch("http://localhost:3000/admin/signup",{
            method:"POST",
            body:JSON.stringify({
              username:email,
              password:password
            }),
            headers:{
              'content-type':"application/json"
            }
          })
          if (!response.ok) {
            console.log(response.json());
            localStorage.setItem('teacher','false');
            toast.error("Admin already exist");
            console.log("Admin already exist");
          } else {
            const data = await response.json();
            localStorage.setItem('token',data.token);
              toast.success('Successfully registered!')
              console.log(data);
              localStorage.setItem('teacher','true');
              // setLoggedIn(true);
              navigate('/admin/courses')
          }
        } else {
          const response =await fetch("http://localhost:3000/user/signup",{
            method:"POST",
            body:JSON.stringify({
              username:email,
              password:password
            }),
            headers:{
              'content-type':"application/json"
            }
          })
          if (!response.ok) {
            console.log(response.json());
            localStorage.setItem('student','false');
            toast.error("User already exist");
            console.log("User already exist");
          } else {
            const data = await response.json();
            localStorage.setItem('token',data.token);
              toast.success('Successfully registered!')
              console.log(data);
              localStorage.setItem('student','true');
              // setLoggedIn(true);
              navigate('/user/courses')
          }
        }
        } catch (error) {
        console.log(error);
        toast.error("fetch didn't work.")
        console.log(" in fetching link");
      }
    }
  }
  if (loggedIn) {
    return(
        navigate('/')
    )
}
  return (
    <div className='flex flex-col mx-auto my-auto p-4 w-full md:w-auto items-center justify-center '>
    <Card className='flex w-[500px] mt-[150px] p-4 gap-10 items-center justify-center flex-col'>
    <h1 className='text-xl font-medium '>Enter your Email and Password to Register as Admin</h1>
    <FormControlLabel control={<Checkbox checked={teacher} onClick={(e)=>(setTeacher(e.target.checked))}/>} label="Register as a teacher" />
    <TextField className='w-full' type='email' onChange={(e)=>{setEmail(e.target.value)}} label="Email" variant="outlined" />
    <TextField className='w-full' type='password' onChange={(e)=>{setPassword(e.target.value)}} label="Password" variant="outlined" />
    <Button className='w-full' variant="contained" onClick={adminClickHandler} >Register</Button>
    Already a user? 
    <Link href="/login" className=' font-bold text-4xl ' variant="body2">Log In</Link>
    </Card>
</div>
  )
}
