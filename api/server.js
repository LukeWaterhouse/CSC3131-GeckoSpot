import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import Post from "./models/Post.js";

const secret = "secret123";

await mongoose.connect("mongodb://mongo:27017/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.log);

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("oks");
});

app.get("/user", (req, res) => {
  const payload = jwt.verify(req.cookies.token, secret);
  User.findById(payload.id).then((userInfo) => {
    res.json({ id: userInfo._id, email: userInfo.email });
  });
});


app.post("/Posts", (req, res) => {
  console.log("making post")
  const {userName, date, content} = req.body;

  const post = new Post({userName: userName, date: date, content: content });
  post.save().then((postInfo) => {
    console.log(postInfo)
    res.send("made a post")
  })
})

app.get("/Posts", (req, res) => {
  console.log("getting posts")
  Post.find({}, function(err, posts) {
    var postMap = {}
    posts.forEach(function(post) {
      postMap[post._id] = post;
    })

    console.log(postMap)

    res.send(postMap)

  })
  

})





app.post("/register", (req, res) => {
  console.log("restedring!!!!");
  const { email, password } = req.body;


  User.findOne({ email }).then((userInfo) => {
    console.log(userInfo)
    if (userInfo == null) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = new User({ password: hashedPassword, email });
      user.save().then((userInfo) => {
        console.log(userInfo);
        jwt.sign(
          { id: userInfo._id, email: userInfo.email },
          secret,
          (err, token) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res
                .cookie("token", token)
                .json({ id: userInfo._id, email: userInfo.email });
            }
          }
        );
      });
    }else{
      console.log("already exists!")
      res.send("emailExists")
    }
  });
});

app.post("/login", (req, res) => {
  console.log("Logging in!");
  const { email, password } = req.body;
  User.findOne({ email }).then((userInfo) => {
    if (userInfo == null) {
      console.log("doesnt exist!");
      res.send("noEmail");
    } else {
      const passOk = bcrypt.compareSync(password, userInfo.password);
      if (passOk) {
        jwt.sign({ id: userInfo._id, email }, secret, (err, token) => {
          if (err) {
            console.log("login error!");
            console.log(err);
            res.sendStatus(500);
          } else {
            res
              .cookie("token", token)
              .json({ id: userInfo._id, email: userInfo.email });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").send();
});

app.listen(5000, function () {
  console.log("Listening on port 5000");
});
