const mongoose =  require('mongoose')

const connectDB = async (handler) =>{
    if(mongoose.connections[0].readyState)
    return handler(req , req)
    mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => res.status(200).json({ name: 'connected' })).catch((err) => console.log(err))
    return handler(req , req)
}
export default connectDB
