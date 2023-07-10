import ResponseStatus from "../../../../GCAM/responseStatus";
import connectDB from "../../../../middleware/ConnectDB";
import { ProcessorBrandsModel } from "@/MongoDb/Gcam/Models/ProcessorBrands";
import { AndroidVersionModel } from "@/MongoDb/Gcam/Models/AndroidVersion";
import { PhoneBrandsModel } from "@/MongoDb/Gcam/Models/PhoneBrands";
import { DeveloperNamesModel } from "@/MongoDb/Gcam/Models/DeveloperNames";

export async function handler(req , res){

   const {option ,deletedList} = req.body
   console.log( 'current option is '+ option , deletedList)
    const ModelMap = {
        'Android Versions' : AndroidVersionModel,
        'Phone Brands' : PhoneBrandsModel,
        'Processor Brands' : ProcessorBrandsModel,
        'Developer Names' : DeveloperNamesModel
      }
      const currentModel = ModelMap[option]
      try {
        deletedList.forEach(async (element) => {
          
          const filter = {name : element.name}
          console.log(filter)
          await currentModel.collection.deleteOne(filter)
        });
        // currentModel.collection.deleteMany(deletedList)
        res.status(ResponseStatus.Sucsess).json({message :'success'})
      } catch (error) {
        res.status(ResponseStatus.Error_Ocurred).json({message :'Failed'})
      }

}
export default connectDB(handler)