try {
            fetch('http://localhost:3000/admin/login',{
                method:"POST",
                headers:{
                    username:email,
                    password:password
                }
            }
            ).then((res)=>{
                res.json().then((data)=>{
                    localStorage.setItem('token',data.token)
                    navigate('/');
                    toast.success('log In Successfull!');
                    console.log(data);
                    console.log(token);
                })
            });
        } catch (error) {
            console.log(error);
            toast.error("fetch didn't work.")
            console.log("fetch nhi huwa");
            
        }

        async () => {
            const response = await fetch(`http://localhost:3000/admin/courses/${courseId}`, {
              method: 'GET',
              headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
              },
            })
          const data = await response.json();
          if (!response.ok) {
            console.log("eoorror aya");
          } else {
            console.log(data);
            setCourses(data.setCourses);
          }
          }
          console.log(courses);

          async function adminClickHandler() {
            if (!email || !password) {
              console.log("please enter something");
              toast.error("Plese check if userame and Password filled!");
              return ;
             }else{
             if (teacher == true) {
              try {
                  const response = await fetch('http://localhost:3000/admin/signup',{
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
                  const response = await fetch('http://localhost:3000/users/signup',{
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
          <Card
  sx={{ maxWidth: 345, margin: '10px' }}
  className="sm:max-w-xs md:max-w-md mx-auto" // Tailwind for responsiveness
>
  <CardActionArea>
    {/* Responsive Image */}
    <img
      component="img"
      className="w-full h-36 object-cover object-center" // Tailwind for responsiveness
      sx={{
        height: '140px',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
      image={
        course.imageLink ||
        'https://pixabay.com/illustrations/man-laptop-computer-male-office-8702916/'
      }
      src={
        course.imageLink ||
        'https://pixabay.com/illustrations/man-laptop-computer-male-office-8702916/'
      }
      alt={course.title || 'Course Image'}
    />
    {/* Card Content */}
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {course.title || 'Untitled'}
      </Typography>
      <Typography variant="body2">
        {course.description || 'No description available.'}
      </Typography>
      <Typography variant="body2">
        Price: ${course.price || '0.00'}
      </Typography>
      <Typography variant="body2">
        Course ID: {course._id || 'N/A'}
      </Typography>
      <Typography variant="body2">
        Published: {course.published ? 'true' : 'false'}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>