import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcrypt'
import cors from 'cors'

await mongoose.connect('mongodb://mongo:27017/auth', {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection;
db.on('error', console.log);

const app = express()
app.use(cookieParser())
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}))

app.get('/', (req, res) => {
    res.send('oks')
})

app.post('/register', (req, res) => {

    console.log("restedring!")
    
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = new User({password:hashedPassword, email})
    user.save().then(userInfo => {
        console.log(userInfo);
        res.send('')
    })

});

app.listen(5000, function(){
    console.log("Listening on port 5000");
})

