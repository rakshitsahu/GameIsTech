import mongoose from "mongoose"

const ProcessorBrandsSchema = new mongoose.Schema({
    name : String,
    date : {
        type : Date,
        default : Date.now
    }
})
const ProcessorBrandsModel = new mongoose.model('Processor Brand',ProcessorBrandsSchema);
mongoose.models = {}

export {ProcessorBrandsModel}
