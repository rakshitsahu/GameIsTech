import mongoose from "mongoose"
const AndroidVersionSchema = new mongoose.Schema({
    name : String,
    date : {
        type : Date,
        default : Date.now
    }
})
const AndroidVersionModel = new mongoose.model('Android Versions',AndroidVersionSchema);
mongoose.models = {}

export {AndroidVersionModel}