import { Button } from '@mui/material'
import React from 'react'
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { useNavigate } from 'react-router';
import PersonIcon from '@mui/icons-material/Person';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
//                                          ***********   ADMIN & USER ***********
export const Landing = (props) => {
  const teacherLoggedIn = localStorage.getItem('teacher') === 'true';
  const studentLoggedIn = localStorage.getItem('student') === 'true';
  const navigate = useNavigate();
  // console.log(teacherLoggedIn);
  // console.log(studentLoggedIn);

  if (teacherLoggedIn) {
    navigate('/admin/courses');
    return;
  }
  if (studentLoggedIn) {
    navigate('/user/courses');
    return;
  }
  return (
    <div className="bg-slate-300 min-h-screen max-h-[5000px] flex flex-col justify-between">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center h-screen justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Welcome to the Course Selling Platform</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Empowering Teachers and Students to Connect and Learn Seamlessly!
        </p>
        <div className="space-x-4">
          <a href="/register" className="bg-[#0369a1] text-white px-6 py-3 rounded-md text-lg hover:bg-[#082f49]">Register</a>
          <a href="/login" className="bg-gray-200 text-[#0369a1] px-6 py-3 rounded-md text-lg hover:bg-gray-300">Log In</a>
        </div>
        
      </main>
      <section className="py-12 px-6 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
          <div className="bg-[#1C0711] text-white p-6 rounded-full mb-4">
          <i className="fas fa-users"><PersonIcon/></i> 
            </div>
            <h3 className="text-xl font-semibold mb-2">For Teachers</h3>
            <p className="text-lg text-gray-600 mb-4">
              Empower yourself to teach and create engaging courses. Share your knowledge with a global audience.
            </p>
            <Button
              variant="outlined"
              color="primary"
            >
              Learn More
            </Button>
          </div>

          <div className="flex flex-col items-center text-center">
          <div className="bg-[#1C0711] text-white p-6 rounded-full mb-4">
              <i className="fas fa-users"><AutoStoriesIcon/></i> 
            </div>
            <h3 className="text-xl font-semibold mb-2">For Students</h3>
            <p className="text-lg text-gray-600 mb-4">
              Access a wide range of courses and enhance your skills with expert instructors and dynamic content.
            </p>
            <Button
              variant="outlined"
              color="primary"
            >
              Learn More
            </Button>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-[#1C0711] text-white p-6 rounded-full mb-4">
              <i className="fas fa-users"><Diversity1Icon/></i> 
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-lg text-gray-600 mb-4">
              Join a thriving community of teachers and students. Share insights, collaborate, and grow together.
            </p>
            <Button
              variant="outlined"
              color="primary"
            >
              Explore Community
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-white text-center">
        <p>&copy; {new Date().getFullYear()} Coursera. All rights reserved.</p>
      </footer>
    </div>
  )
}