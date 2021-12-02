import mongoose from 'mongoose'
var schema = mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String }
})

var User = mongoose.model('User', schema)

export default User
