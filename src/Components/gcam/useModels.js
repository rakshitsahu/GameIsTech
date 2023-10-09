
const mongoose =  require('mongoose')
import { PhoneBrandsModel } from '../../MongoDb/Gcam/Models/PhoneBrands'
import { AndroidVersionModel } from '@/MongoDb/Gcam/Models/AndroidVersion'
import { ProcessorBrandsModel } from '@/MongoDb/Gcam/Models/ProcessorBrands'
import { DeveloperNamesModel } from '@/MongoDb/Gcam/Models/DeveloperNames'
import { GcamModel } from '@/MongoDb/Gcam/Models/Gcam'
import { GcamPostModel } from '@/MongoDb/Gcam/Models/GcamPost'
import { GcamVersionModel } from '@/MongoDb/Gcam/Models/GcamVersions'
const testSchema = new mongoose.Schema({
    name : {
        type: String
    },
    author : String
})
async function AlreadyExists(model , filter){
}
// const list = mongoose.model('newmodel', testSchema)
async function Androidversionrun(data){

    const model = AndroidVersionModel
    model.collection.findOne({name : data.name}, async (error , result)=>{
        if(!result)
            await model.collection.insertOne(data)
    } )

}
 async function PhoneBrandsRun(data){
    const model = PhoneBrandsModel
    model.collection.findOne({name : data.name}, async (error , result)=>{
        if(!result)
            await model.collection.insertOne(data)
    } )

}
async function ProcessorBrandsRun(data){
    const model = ProcessorBrandsModel
    model.collection.findOne({name : data.name}, async (error , result)=>{
        if(!result)
            await model.collection.insertOne(data)
    } )

}
async function DeveloperNamesRun(data){
    const model = DeveloperNamesModel
    model.collection.findOne({name : data.name}, async (error , result)=>{
        if(!result)
            await model.collection.insertOne(data)
    } )

}
async function AddGcamVersion(data){
    const model = GcamVersionModel
    model.collection.findOne({name : data.name}, async (error , result)=>{
        if(!result)
            await model.collection.insertOne(data)
    } )

}

export {Androidversionrun, PhoneBrandsRun , ProcessorBrandsRun,DeveloperNamesRun , AddGcamVersion  }
// run()


