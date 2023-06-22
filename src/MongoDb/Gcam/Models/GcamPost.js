import { ObjectId } from "mongodb";
import mongoose from "mongoose"

const GcamPostSchema = new mongoose.Schema({
    deviceName : String,
    brand : String,
    processor : String,
    gcamIds : [ObjectId],
    date : {
        type : Date,
        default : Date.now
    }
})
const GcamPostModel = mongoose.model('Google Camera Posts',GcamPostSchema);
mongoose.models = {}

export {GcamPostModel}