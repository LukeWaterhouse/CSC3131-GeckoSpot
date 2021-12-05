import { React, useContext, useState, useEffect } from 'react'
import UserContext from './UserContext'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import NavigationBar from './Navbar'
import '../Css/homepage.css'
import ColoredLine from './Line'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'

import { formatPosts } from '../Utilities/utilFunctions'

function Forum() {
  const user = useContext(UserContext)
  const [postContent, setPostContent] = useState('')
  const [showPostBlank, setShowPostBlank] = useState(false)
  const [posts, setPosts] = useState([])
  let history = useHistory()

  function handlePostChange(e) {
    console.log(e.target.value)
    setPostContent(e.target.value)
  }

  useEffect(() => {
    //gets new posts on a short time interval to ensure they are up to date
    const interval = setInterval(() => {
      getPosts()
    }, 200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    //ensures the user is verified using web token, if not push them back to entry page (where they are logged out)
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((response) => {
        user.setUserName(response.data.userName)
        console.log(response.data.userName)
        getPosts()
      })
      .catch((error) => {
        console.log(error)
        history.push('/entry')
      })
  }, [])

  function logout() {
    axios
      .post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(() => user.setUserName(''))

    history.push('/entry')
  }

  function clearPosts(e) {
    e.preventDefault()

    //clears the posts by sending request, they will disspear automatically due to interval update
    axios
      .delete('http://localhost:5000/Posts', {}, { withCredentials: true })
      .then((response) => {
        console.log(response)
      })
  }

  function makePost(e) {
    e.preventDefault()

    //shows error on blank post
    if (postContent === '') {
      setShowPostBlank(true)
    } else {
      setShowPostBlank(false)
      setPostContent('')

      //gets the current date and sets name and content variables
      var userName = user.userName
      const date = new Date().toLocaleString() + ''
      var content = postContent


      //sends data to backend api then database
      const data = { userName, date, content }
      axios
        .post('http://localhost:5000/Posts', data, { withCredentials: true })
        .then((response) => {
          console.log(response.data)
        })
    }
  }

  function getPosts() {

    //function for getting posts from db using request
    //these are formatted by a function and then the state is set for mapping
    axios
      .get('http://localhost:5000/Posts', { withCredentials: true })
      .then((response) => {
        console.log(typeof response)
        setPosts(formatPosts(response))
      })
  }

  function Post(props) {
    return (
      <div style={{ marginRight: '15%', marginLeft: '15%', marginTop: '20px' }}>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent style={{ backgroundColor: '#2C2F33' }}>
              <Typography sx={{ fontSize: 14 }} color="#97A9B4" gutterBottom>
                {props.date}
              </Typography>

              <Typography sx={{ fontSize: 20 }} color="white" gutterBottom>
                {props.userName}
              </Typography>

              <Typography variant="body2" color="white">
                {props.content}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </div>
    )
  }

  return (
    <div className="rootClass">
      <NavigationBar />
      <div>
        {!!user.userName && (
          <div className="row">
            <div className="column">
              <div
                style={{
                  color: 'white',
                  fontSize: '25px',
                  alignSelf: 'start',
                  paddingTop: '10px',
                  paddingLeft: '10px'
                }}
              >
                Logged in as {user.userName}
              </div>
            </div>

            <div className="column">
              <div style={{ alignSelf: 'end', padding: '10px' }}>
                <button className="btn-1" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        {!user.userName && <div>Not Logged in</div>}
      </div>
      <ColoredLine color="white" />

      <button
        style={{ marginTop: '10px', marginLeft: '1.5%' }}
        className="btn-1"
        onClick={(e) => clearPosts(e)}
      >
        CLEAR POSTS
      </button>

      <h1
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30px',
          fontWeight: '400',
          marginBottom: '20px'
        }}
      >
        <u>Forum</u>
      </h1>

      <div>
        {posts.map((APost) => (
          <div style={{ marginBottom: '10px' }}>
            <Post
              content={APost.content}
              date={APost.date}
              userName={APost.userName}
            />
          </div>
        ))}
      </div>

      {showPostBlank && (
        <div
          style={{
            marginLeft: '15%',
            color: 'red',
            paddingTop: '30px',
            paddingBottom: '10px'
          }}
        >
          Please enter some text before posting!
        </div>
      )}

      <div style={{ marginLeft: '15%', marginRight: '15%' }}>
        <TextField
          style={{ background: 'white', color: 'black', width: '100%' }}
          value={postContent}
          onChange={handlePostChange}
          placeholder="Enter post"
          multiline
          rows={4}
          rowsMax={3}
        />
      </div>

      <button
        style={{ marginLeft: '15%', marginTop: '10px', marginBottom: '40px' }}
        className="btn-1"
        onClick={(e) => makePost(e)}
      >
        Post
      </button>
    </div>
  )
}

export default Forum
