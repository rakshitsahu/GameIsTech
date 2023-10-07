import mongoose from "mongoose"
const AndminSchema = new mongoose.Schema({
    name : String,
    date : {
        type : Date,
        default : Date.now
    }
})
const AdminModel = new mongoose.model('Admin Login',AndminSchema);
mongoose.models = {}

export {AdminModel}