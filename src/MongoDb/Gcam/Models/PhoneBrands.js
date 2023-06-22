import mongoose from "mongoose"

const PhoneBrandsSchema = new mongoose.Schema({
    name : String,
    date : {
        type : Date,
        default : Date.now
    }
})
const PhoneBrandsModel = mongoose.model('Phone Brands',PhoneBrandsSchema);
mongoose.models = {}

export {PhoneBrandsModel}