import { Button, Card, TextField,Link, Checkbox, FormControlLabel } from '@mui/material'
import React, { useState  } from 'react'
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router'; 
import toast from 'react-hot-toast';
//                                          ***********   ADMIN & USER ***********
export const Login = (props) => {
    const [email ,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [teacher , setTeacher] = useState(false);
    const navigate = useNavigate()
    const teacherLoggedIn = localStorage.getItem('teacher') === 'true';
    const studentLoggedIn = localStorage.getItem('student') === 'true';
    const loggedIn = teacherLoggedIn || studentLoggedIn ;
    // const loggedIn = props.loggedIn;
    // const setLoggedIn = props.setLoggedIn;

    const validateEmail = (email) => {
        // Regex to check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    async function clickHandler() {
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address!");
            return;
        }
       if (!email || !password) {
        console.log("please enter something");
        toast.error("Plese check if userame and Password filled!");
        return ;
       }else{
       if (teacher == true) {
        try {
            const response = await fetch(`${PORT}/admin/login`,{
                method:"POST",
                headers:{
                    username : email,
                    password:password
                }
            })
            const data = await response.json();
            if (!response.ok) {
                console.log('Response error:', data.message || 'Invalid username or password');
                toast.error(data.message || 'Invalid username or password');                 
            } else {
                toast.success("log In successfull!")
                localStorage.setItem('token',data.token);
                console.log(data);
                localStorage.setItem('teacher','true');
                // setLoggedIn(true);
                navigate('/admin/courses');
            }
        } catch (error) {
            console.log(error);
            toast.error('Server Error');
            console.log('fetch dont work');
        }
       }else{
        try {
            const response = await fetch(`${PORT}/users/login`,{
                method:"POST",
                headers:{
                    username : email,
                    password:password
                }
            })
            const data = await response.json();
            if (!response.ok) {
                console.log('Response error:', data.message || 'Invalid username or password');
                toast.error(data.message || 'Invalid username or password');                 
            } else {
                toast.success("log In successfull!")
                localStorage.setItem('token',data.token);
                console.log(data);
                localStorage.setItem('student','true');
                // setLoggedIn(true);
                navigate('/user/courses');
            }
        } catch (error) {
            console.log(error);
            toast.error('Server Error');
            console.log('fetch dont work');
        }
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
    <h1 className='text-xl font-semibold'>Enter your Email and Password to Login</h1>
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
      onClick={clickHandler}
    >
      Log In
    </Button>
    <div className='flex flex-col justify-center items-center gap-4 '>
    <Typography className="mt-2">
      New here? 
    </Typography>
      <Link href="/register" variant="body2">Register Now</Link>
    </div>
  </Card>
</div>

  )
}
