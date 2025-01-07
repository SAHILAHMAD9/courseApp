import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
//                                          ***********   USER COURSE ***********
export const UcourseCard = (props) => {
    const course = props.course;
    const  courseId = course._id;

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardActionArea>
            <img
            component="img"
            sx={{
                height: '140px',         
                objectFit: 'cover',      
                objectPosition: 'center' 
            }}
            image={course.imageLink || 'https://pixabay.com/illustrations/man-laptop-computer-male-office-8702916/'} // Fallback image
            src={course.imageLink || 'https://pixabay.com/illustrations/man-laptop-computer-male-office-8702916/'}
            alt={course.title || 'Course Image'}
            />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title || 'Untitled'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6495ED' }}>
            {course.description || 'No description available.'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'red' }}>
            Price: ${course.price || '0.00'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Course ID: {course._id || 'N/A'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Purchage
        </Button>
      </CardActions>
    </Card>
  );
};
