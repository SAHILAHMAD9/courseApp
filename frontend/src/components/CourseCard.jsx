import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router';
import defaultImage from '../assets/Com.jpeg'; // Adjust the path as needed

//                                               ***********    COURSE card for both ***********
export const CourseCard = (props) => {
    const course = props.course;
    const  courseId = course._id;
    const navigate = useNavigate();

  async function clickHandler() {
    navigate(`/course/edit/${courseId}`)
    }
  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}
    className="sm:max-w-xs md:max-w-md mx-auto" >
      <CardActionArea>
      <CardMedia
      className="w-full h-36 object-cover object-center" 
  component="img"
  height="140"
  image={course.imageLink || defaultImage}
  alt={course.title || 'Course Image'}
/>

        <CardContent>
          <Typography gutterBottom variant="h5" fontSize={30} component="div">
            {course.title || 'Untitled'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6495ED' }}>
            {course.description || 'No description available.'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#AC301D' }}>
            Price: ${course.price || '0.00'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Course ID: {course._id || 'N/A'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#E2730D' }}>
            Published: {course.published ? 'true' : 'false'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={clickHandler} size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
