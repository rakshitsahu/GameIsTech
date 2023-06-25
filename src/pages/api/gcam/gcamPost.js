import axios from "axios";
import connectDB from "../../../../middleware/ConnectDB";
import { GcamPostModel } from "@/MongoDb/Gcam/Models/GcamPost";
import mongoose from "mongoose";
import ResponseStatus from "../../../../GCAM/responseStatus";
async function handler(req , res){
    // await GcamPost( req.headers.data ).then(
    //     (result)=>{
    //         res.status(200).json({staus : 'inserted'})
    //     }
    // )

    const data = req.body
    const model = GcamPostModel
    const Post = data.post
    const Gcam = data.gcam


    await axios.post('http://localhost:3000/api/gcam/gcamcheck',Gcam).then(
        (result) =>{

            const objectID = result.data.gcamId
            
            console.log('the object id is' , objectID)
            model.collection.findOne({name : Post.name} , 
                async (error , result) => {
                if(result)
                {
                    model.collection.updateOne({ name : Post.name } , {
                        $addToSet : { gcamIds : objectID }
                    } ).catch( () =>res.status(ResponseStatus.Error_Ocurred).json({ message : "Post found but unable to fetch gcamId" }) )
                }
                else{
                    Post.gcamIds = [objectID]
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
            res.status(ResponseStatus.Sucsess).json({ message : "Post has been Published" })
        }
    ).catch(()=>{
        res.status(ResponseStatus.Database_Connection_Failed).json({ message : "Unable to publish Gcam" })
    })
    
}
export default connectDB(handler)