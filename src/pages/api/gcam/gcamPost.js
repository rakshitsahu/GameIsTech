import axios from "axios";
import connectDB from "../../../../middleware/ConnectDB";
import { GcamPostModel } from "@/MongoDb/Gcam/Models/GcamPost";
import { PhoneBrandsModel } from "@/MongoDb/Gcam/Models/PhoneBrands";
import { DeveloperNamesModel } from "@/MongoDb/Gcam/Models/DeveloperNames";
import mongoose from "mongoose";
import ResponseStatus from "../../../../GCAM/responseStatus";
async function handler(req , res){

    const data = req.body
    const model = GcamPostModel
    const Post = data.post
    const Gcam = data.gcam
    PhoneBrandsModel.collection.updateOne({ name : Post.brand } , {
        $addToSet : { phones : Post.name }
    } ).catch( () =>res.status(ResponseStatus.Error_Ocurred).json({ message : "Post found but unable to fetch gcamId" }) )

    await axios.post('http://localhost:3000/api/gcam/gcamcheck',Gcam).then(
        (result) =>{

            const downloadLink = result.data.downloadLink
            
            console.log('the download link is' , downloadLink)
            model.collection.findOne({name : Post.name} , 
                async (error , result) => {
                if(result)
                {
                    model.collection.updateOne({ name : Post.name } , {
                        $addToSet : { gcams : downloadLink }
                    } ).catch( () =>res.status(ResponseStatus.Error_Ocurred).json({ message : "Post found but unable to fetch gcamId" }) )
                }
                else{
                    Post.gcams = [downloadLink]
                    model.collection.insertOne(Post, (error , res)=>{
                        if(error)
                        return ;
                        else
                        {
                            console.log('gcam post done')
                            return res;
                        }
                    }).catch( () => res.status(ResponseStatus.Error_Ocurred).json( { message : "couldnt publish the post" } ) )
                }
        
            }).catch( () => res.status(ResponseStatus.Error_Ocurred).json({ message : "Error in finding the gcam Post by name" }) )

            DeveloperNamesModel.collection.updateOne({ name : Gcam.developerName } , {
                $addToSet : { gcams : downloadLink }
            } ).catch( () =>res.status(ResponseStatus.Error_Ocurred).json({ message : "Post found but unable to fetch gcamId" }) )

            res.status(ResponseStatus.Sucsess).json({ message : "Post has been Published" })
            
        }
    ).catch(()=>{
        res.status(ResponseStatus.Database_Connection_Failed).json({ message : "Unable to publish Gcam" })
    })
    
}
export default connectDB(handler)
