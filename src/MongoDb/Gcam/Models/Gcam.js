import { Double } from "mongodb";
import mongoose from "mongoose"
const GcamSchema = new mongoose.Schema({
    name : String,
    version : Number,
    developerName : String,
    downloadLink : String,
    description : String,
    releaseDate : String,
    deviceBrands : [String],
    processors : [String],
    requiredAndroid :  Number,
    xdaThread : String,
    isGeneric : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
})
const GcamModel = new mongoose.model('Google Camera',GcamSchema);
mongoose.models = {}

export {GcamModel}