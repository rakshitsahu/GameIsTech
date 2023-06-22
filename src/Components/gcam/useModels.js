
const mongoose =  require('mongoose')
import { PhoneBrandsModel } from '../../MongoDb/Gcam/Models/PhoneBrands'
import { AndroidVersionModel } from '@/MongoDb/Gcam/Models/AndroidVersion'
import { ProcessorBrandsModel } from '@/MongoDb/Gcam/Models/ProcessorBrands'
import { DeveloperNamesModel } from '@/MongoDb/Gcam/Models/DeveloperNames'
import { GcamModel } from '@/MongoDb/Gcam/Models/Gcam'
import { GcamPostModel } from '@/MongoDb/Gcam/Models/GcamPost'
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
    // console.log(data)
    
    console.log('inserted')
}
 async function PhoneBrandsRun(data){
    const model = PhoneBrandsModel
    model.collection.findOne({name : data.name}, async (error , result)=>{
        if(!result)
            await model.collection.insertOne(data)
    } )

    console.log('inserted')
}
async function ProcessorBrandsRun(data){
    const model = ProcessorBrandsModel
    model.collection.findOne({name : data.name}, async (error , result)=>{
        if(!result)
            await model.collection.insertOne(data)
    } )
    console.log('inserted')
}
async function DeveloperNamesRun(data){
    const model = DeveloperNamesModel
    model.collection.findOne({name : data.name}, async (error , result)=>{
        if(!result)
            await model.collection.insertOne(data)
    } )

    console.log('inserted')
}

async function GcamCheck(data){
    data = JSON.parse(data)
    const model = GcamModel
    model.collection.findOne({downloadLink : data.downloadLink} , async (error , result) =>{
        if(!result)
        return ;
        await model.collection.insertOne(data ,(error , result) =>{
            if(error)
            return ;
            console.log('the id is ' , data._id)
            return data._id

        });
    } )
}
// async function GcamPost(data){
//     data = JSON.parse(data)
//     const model = GcamPostModel
//     const Post = data.post
//     const Gcam = data.gcam
//     const objectID = GcamCheck(Gcam)
//     model.collection.findOne({name : Post.name} , 
//         async (error , result) => {
//         if(result)
//         {
//             model.collection.updateOne({ name : Post.name } , {
//                 $addToSet : { gcamIds : objectID }
//             } )
//         }
//         else{
//             model.collection.insertOne(Post, (error , res)=>{
//                 if(error)
//                 return ;
//                 else
//                 return res;
//             })
//         }

//     }
//      )
// }
export {Androidversionrun, PhoneBrandsRun , ProcessorBrandsRun,DeveloperNamesRun , GcamCheck  }
// run()


