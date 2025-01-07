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