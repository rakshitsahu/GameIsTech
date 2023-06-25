import mongoose from "mongoose"

const DeveloperNamesSchema = new mongoose.Schema({
    name : String,
    // gcams : [String],
    date : {
        type : Date,
        default : Date.now
    }
})
const DeveloperNamesModel = new mongoose.model('Developer Names',DeveloperNamesSchema);
mongoose.models = {}

export {DeveloperNamesModel}
