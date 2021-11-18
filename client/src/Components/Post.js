import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Post(props) {


    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );


  return (
    <div style={{marginRight: '15%', marginLeft: '15%', marginTop: '20px'}}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent style={{backgroundColor: '#2C2F33'}}>

          <Typography
              sx={{ fontSize: 14 }}
              color="#97A9B4"
              gutterBottom
            >
              {props.date}
            </Typography>

            <Typography
              sx={{ fontSize: 20 }}
              color="white"
              gutterBottom
            >
              {props.userName}
            </Typography>
           
            <Typography variant="body2" color="white">
            {props.content}
             
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default Post;
