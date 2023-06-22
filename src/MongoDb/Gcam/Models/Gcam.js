import mongoose from "mongoose"
const GcamSchema = new mongoose.Schema({
    name : String,
    version : Number,
    developer : String,
    downloadLink : String,
    description : String,
    date : {
        type : Date,
        default : Date.now
    }
})
const GcamModel = new mongoose.model('Google Camera',GcamSchema);
mongoose.models = {}

export {GcamModel}