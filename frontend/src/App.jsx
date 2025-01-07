import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router } from 'react-router'
import { Route, Routes } from 'react-router'
import { Landing } from './components/Landing'
import { ShowCourses } from './components/ShowCourses'
import { CreateCourse } from './components/CreateCourse'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Navbar } from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router';
import { CourseCard } from './components/CourseCard'
import { Course } from './components/Course'
import { UserCourses } from './components/UserCourses'
import { PurchasedCourses } from './components/PurchasedCourses'


function App() {
// const [loggedIn , setLoggedIn] = useState(false);
  const teacherLoggedIn = localStorage.getItem('teacher') === 'true';
  const studentLoggedIn = localStorage.getItem('student') === 'true';

if (teacherLoggedIn) {
  console.log("Teacher LogedIn is true nice");
} else {
    localStorage.setItem('teacher','false');
}
if (studentLoggedIn) {
  console.log("Student LogedIn is true nice");
} else {
  localStorage.setItem('student','false');
}

  return (
   <div id='app' className='w-full md:h-screen sm:h-screen md:w-full sm:w-full h-screen mb-0  bg-slate-200'>
    <Router>
    <Toaster/>
   <Navbar />
    <Routes>
      <Route path='/' element={<Landing/>}/> 
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/course/edit/:courseId' element={<Course />}/>
      <Route path='/addcourse' element={<CreateCourse />}/>
      <Route path='/admin/courses' element={<ShowCourses />}/>
      <Route path='/user/courses' element={<UserCourses />}/>
      <Route path='/user/purchases' element={<PurchasedCourses />}/>
    </Routes>
   </Router>
   </div>
  )
}

export default App
