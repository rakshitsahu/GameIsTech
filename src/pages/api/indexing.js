
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";
const { MongoClient, ServerApiVersion } = require('mongodb');
import MongoFind from './gcam/mongo/find';
import GCAM_URL_STATE from '@/Components/gcam/URLs/GCAM_URL_STATE';
import { GCAM_URLS } from '@/Components/gcam/URLs/GCAM_URL_MANAGER';
var request = require("request");
var { google } = require("googleapis");
var key = require("./service_account.json");


const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
const QUOTA_LIMIT = 24
function getUrls(indexed , urlList , limit = QUOTA_LIMIT){
    const urls = []
    const map = new Map()
    console.log(limit)
    indexed.forEach(element => {
      
        map.set(element , true)
    });
    let index = 0
    while( index < urlList.length && limit){
      const element = urlList[index++]
      if( !map.get(element) ){ 
        urls.push(element)
        limit--;
    }
    }

    return urls
}

async function getUrlList(){
  const collection = "urlPaths"
  const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    try {
      await client.connect().catch( async (err) => { 
        console.log('the error occurred is', err)
        await client.close() 
      }
         )
         const data = await client.db('Webscrap-GCAM').collection(collection).find({}).toArray();
        //  console.log('list of collection is', data)
        let resultPath = []
         if(data.length == 0){
          const urlList = await GCAM_URLS(GCAM_URL_STATE.All)
          resultPath = urlList
          // console.log(urlList)
          await client.db('Webscrap-GCAM').collection(collection).insertOne({paths :urlList}).catch((err)=>{
            console.log(err)
          })
         }
         else
         resultPath = data[0].paths
         await client.close()
         console.log(resultPath)
         return  resultPath
    } catch (error) {
      await client.close()
    }
}

async function getIndexedPaths(indexedUrls){
  const collection = "indexedPaths"
  const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    try {
      await client.connect().catch( async (err) => {
        console.log('the error occurred is', err)
        await client.close()
      }
         )
         const indexedList = await client.db('Webscrap-GCAM').collection(collection).find({}).toArray();
         let resultPaths = []
         console.log(indexedList.length)
         if(indexedList.length)
         resultPaths = indexedList[0].paths
        //  console.log('list of collection is', data)

         await client.close()
        //  console.log(resultPaths)
         return  resultPaths
    } catch (error) {
      await client.close()
    }
}

async function insertIndexedUrls(urlList){
  const collection = "indexedPaths"
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  console.log('function called')
  try {
    await client.connect().catch( async (err) => {
      console.log('the error occurred is', err)
      await client.close()
    }
       )
       const currentList = await getIndexedPaths()
       const indexedList = await client.db('Webscrap-GCAM').collection(collection).find({}).toArray();
       console.log('the indexedList is', indexedList)
       
       let resultPaths = []
       if(indexedList.length > 0)
       {
        resultPaths = indexedList[0].paths
        await client.db('Webscrap-GCAM').collection(collection).drop()
       }
       if(urlList.length > 0)
       await client.db('Webscrap-GCAM').collection(collection).insertOne({paths : [...resultPaths , ...urlList]});
       await client.close()
      //  console.log(resultPaths)
       
  } catch (error) {
    await client.close()
  }
}
const latestIndexedUrls = []
async function IndexingApi(url){
  const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  null
);
jwtClient.authorize(function(err, tokens) {
  if (err) {
    // console.log(err);
    return;
  }
  let options = {
    url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
    method: "POST",
    // Your options, which must include the Content-Type and auth headers
    headers: {
      "Content-Type": "application/json"
    },
    auth: { "bearer": tokens.access_token },
    // Define contents here. The structure of the content is described in the next step.
    json: {
      "url": url,
      "type": "URL_UPDATED"
    }
  };
  request(options, function (error, response, body) {
    // Handle the response
    if(error)
    console.log("error occured")
    else if( response.statusCode === 200  )
    latestIndexedUrls.push(url)
  return response.statusCode
  });
});

}

export async function handler(req , res){
  const paths = await getUrlList()
  // console.log(paths)
  const indexedList = await getIndexedPaths(paths)
  // console.log(indexedList)
  const pathsToIndex = getUrls(indexedList , paths , Math.floor(QUOTA_LIMIT/ 24) )
  // console.log(pathsToIndex)
  const indexedPaths = []
  pathsToIndex.forEach(async (element)=>{
    const statusCode = await IndexingApi(element)
    // console.log("status code found is" , statusCode)
  })
  setTimeout( async () => {
    await insertIndexedUrls(latestIndexedUrls).then(()=>{
      // console.log(paths)
      res.json({message : 'urls inserted successfully'})
    }).catch( (err)=>{
      res.json({message : 'Something went wrong'})
    })
  }, 2000);
  

  
  // res.send({paths : pathsToIndex})


}
export default handler