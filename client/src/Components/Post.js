import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function Post(props) {
  return (
    <div
      data-testid="data-postid"
      style={{ marginRight: '15%', marginLeft: '15%', marginTop: '20px' }}
    >
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent style={{ backgroundColor: '#2C2F33' }}>
            <Typography
              data-testid="data-postdateid"
              sx={{ fontSize: 14 }}
              color="#97A9B4"
              gutterBottom
            >
              {props.date}
            </Typography>

            <Typography
              data-testid="data-postusernameid"
              sx={{ fontSize: 20 }}
              color="white"
              gutterBottom
            >
              {props.userName}
            </Typography>

            <Typography
              variant="body2"
              color="white"
              data-testid="data-postcontentid"
            >
              {props.content}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default Post
