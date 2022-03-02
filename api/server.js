import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import Post from './models/Post.js'

const secret = 'secret123'

//connect to mongoose
await mongoose.connect('mongodb://mongo:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

//console log any database errors
db.on('error', console.log)

const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//handles cross policy origin
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)

//test endpoint
app.get('/', (req, res) => {
  res.send('okasds')
})

//verifies webtoken in cookie and sends user info back
app.get('/user', (req, res) => {
  const payload = jwt.verify(req.cookies.token, secret)
  User.findById(payload.id).then((userInfo) => {
    res.json({ id: userInfo._id, userName: userInfo.userName })
  })
})

//Adds new post to database
app.post('/Posts', (req, res) => {
  console.log('making post reload?')
  const { userName, date, content } = req.body

  const post = new Post({ userName: userName, date: date, content: content })
  post.save().then((postInfo) => {
    console.log(postInfo)
    res.send('made a post reload?')
  })
})

//returns all posts from database
app.get('/Posts', (req, res) => {
  Post.find({}, function (err, posts) {
    var postMap = {}
    posts.forEach(function (post) {
      postMap[post._id] = post
    })
    res.send(postMap)
  })
})

//deletes all posts in database
app.delete('/Posts', (req, res) => {
  Post.remove({}.callback).then((deleteInfo) => {
    res.send('deleted posts')
  })
})

//Registers a new user
app.post('/register', (req, res) => {
  console.log('Registering!')

  //destructures request body
  const { userName, password } = req.body

  User.findOne({ userName }).then((userInfo) => {
    console.log(userInfo)
    if (userInfo == null) {
      //if no user yet hashes password and stores in database
      const hashedPassword = bcrypt.hashSync(password, 10)
      const user = new User({ password: hashedPassword, userName })
      user.save().then((userInfo) => {
        console.log(userInfo)
        //sign webtoken with user info to send to client
        jwt.sign(
          { id: userInfo._id, userName: userInfo.userName },
          secret,
          (err, token) => {
            if (err) {
              console.log(err)
              res.sendStatus(500)
            } else {
              res
                .cookie('token', token)
                .json({ id: userInfo._id, userName: userInfo.userName })
            }
          }
        )
      })
    } else {
      console.log('user already exists!')
      //notify client user exists already
      res.send('userNameExists')
    }
  })
})

//Logs in user
app.post('/login', (req, res) => {
  console.log('Logging in!')
  const { userName, password } = req.body

  User.findOne({ userName }).then((userInfo) => {
    if (userInfo == null) {
      //if user doesn't exist notify client
      console.log("doesn't exist!")
      res.send('noUserName')
    } else {
      //compare encrypted passwords
      const passOk = bcrypt.compareSync(password, userInfo.password)
      if (passOk) {
        //if the same sign webtoken and send to front end in cookie
        jwt.sign({ id: userInfo._id, userName }, secret, (err, token) => {
          if (err) {
            console.log('login error!')
            console.log(err)
            res.sendStatus(500)
          } else {
            res
              .cookie('token', token)
              .json({ id: userInfo._id, userName: userInfo.userName })
          }
        })
      } else {
        res.sendStatus(401)
      }
    }
  })
})

//logs user out by removing cookie information
app.post('/logout', (req, res) => {
  res.cookie('token', '').send()
})

app.listen(5000, function () {
  console.log('Demonstrating hot reload')
})
