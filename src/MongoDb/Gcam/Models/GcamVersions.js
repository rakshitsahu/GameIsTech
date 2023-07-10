import { ObjectId } from "mongodb";
import mongoose from "mongoose"

const GcamVersionSchema = new mongoose.Schema({
    name : String,
    gcamIds : [ObjectId],
    date : {
        type : Date,
        default : Date.now
    }
})
const GcamVersionModel = mongoose.model('Google Camera Versions',GcamVersionSchema);
mongoose.models = {}

export {GcamVersionModel}