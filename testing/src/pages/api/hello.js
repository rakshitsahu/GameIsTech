// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middle"
const mongoose =  require('mongoose')
function handler(req, res) {
  //connectDB(handler)
  mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('connected')).catch((err) => console.log(err))
  res.status(200).json({ name: 'John Doe' })
}
export default handler
