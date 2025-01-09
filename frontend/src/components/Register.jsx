import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Typography from '@mui/material/Typography';
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

  const validateEmail = (email) => {
    // Regex to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

  async function adminClickHandler() {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
  }
    if (!email || !password) {
      console.log("please enter something");
      toast.error("Please check if username and password are filled!");
      return;
    } else {
      const url = teacher ? `${PORT}/admin/signup` : `${PORT}/users/signup`;
      const bodyData = { username: email, password: password };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
        const data = await response.json();
        if (!response.ok) {
          console.log('Response error:', data.message || 'Invalid username or password');
          toast.error(data.message || 'Invalid username or password');
        } else {
          toast.success("Log In successful!");
          localStorage.setItem('token', data.token);
          console.log(data);
          if (teacher) {
            localStorage.setItem('teacher', 'true');
            navigate('/admin/courses');
          } else {
            localStorage.setItem('student', 'true');
            navigate('/user/courses');
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('Server Error');
      }
    }
  }
  
  if (loggedIn) {
    toast.error('Already Logged In');
    return(
        navigate('/')
    )
}
  return (
    <div className='flex flex-col mx-auto my-auto p-4 w-full items-center justify-center'>
  <Card className='flex w-full sm:max-w-sm md:max-w-lg mt-10 p-4 gap-6 items-center flex-col mx-auto'>
    <h1 className='text-xl font-semibold'>Enter your Email and Password to Sign Up</h1>
    <div>
      <FormControlLabel 
        control={<Checkbox checked={teacher} onClick={(e) => (setTeacher(e.target.checked))} />} 
        label="Log In as a teacher" 
      />
    </div>
    <TextField 
      className='w-full' 
      type='email' 
      onChange={(e) => { setEmail(e.target.value) }} 
      label="Email" 
      variant="outlined" 
    />
    <TextField 
      className='w-full' 
      type='password' 
      onChange={(e) => { setPassword(e.target.value) }} 
      label="Password" 
      variant="outlined" 
    />
    <Button 
      className='w-full' 
      variant="contained" 
      onClick={adminClickHandler}
    >
      Sign Up
    </Button>
    <div className='flex flex-col justify-center items-center gap-4 '>
    <Typography className="mt-2">
      Existing User? 
    </Typography>
      <Link href="/login" variant="body2"> Log In</Link>
    </div>
  </Card>
</div>
  )
}
