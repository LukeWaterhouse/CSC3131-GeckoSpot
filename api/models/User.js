import mongoose from 'mongoose'
const schema = mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String }
})

const User = mongoose.model('User', schema)

export default User
