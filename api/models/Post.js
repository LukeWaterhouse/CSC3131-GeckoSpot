import mongoose from 'mongoose'
const schema = mongoose.Schema({
  userName: { type: String },
  date: { type: String },
  content: { type: String }
})

const Post = mongoose.model('Post', schema)

export default Post
