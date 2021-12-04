import mongoose from 'mongoose'
var schema = mongoose.Schema({
  userName: { type: String },
  date: { type: String },
  content: { type: String }
})

var Post = mongoose.model('Post', schema)

export default Post
