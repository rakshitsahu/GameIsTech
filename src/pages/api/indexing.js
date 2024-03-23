
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";
const { MongoClient, ServerApiVersion } = require('mongodb');
import MongoFind from './find';
import GCAM_URL_STATE from '@/Components/gcam/URLs/GCAM_URL_STATE';
import { GCAM_URLS } from '@/Components/gcam/URLs/GCAM_URL_MANAGER';
import { MdMan4 } from 'react-icons/md';
import axios from 'axios';
var request = require("request");
var { google } = require("googleapis");
var apkHubKey = require("./apkhub.json");
var GameIsTechKey = require("./gameistech.json");
var androidApkKey = require("./androidapk.json");
var key = {}
let paths = []
const keyMap = {
  "apkhub.mobi" : apkHubKey,
  "apkhub.mobi" : GameIsTechKey,
  "androidapkdownloads.info" : androidApkKey
}
var key = {}
const DB_NAME = "Indexing-DB"
let collection = "indexedPaths"
let domainName = ""
const defaultDomainName = "apkhub.mobi"
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
const QUOTA_LIMIT = 200
function getUrls(indexed , urlList , limit = QUOTA_LIMIT){
    const urls = []
    const map = {}

    indexed.forEach(element => {
      
        map[element] = true
    });
    let index = 0
    while( index < urlList.length && limit){
      const element = urlList[index++]
      if( !map[element] ){ 
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

        await client.close() 
      }
         )
         const data = await client.db(DB_NAME).collection(collection).find({}).toArray();

        let resultPath = []
         if(data.length == 0){
          const urlList = await GCAM_URLS(GCAM_URL_STATE.All)
          resultPath = urlList
          
          await client.db(DB_NAME).collection(collection).insertOne({paths : getUniques(urlList)}).catch((err)=>{

          })
         }
         else
         resultPath = data[0].paths
         await client.close()
         const replacedDomain = []
         resultPath.forEach((element)=>{
          const updatedURL = element.replace(defaultDomainName , domainName)
          replacedDomain.push(updatedURL)
         })

         return  replacedDomain
    } catch (error) {
      await client.close()
    }
}

async function getIndexedPaths(indexedUrls){
  const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    try {
      await client.connect().catch( async (err) => {
        await client.close()
      }
         )
         const indexedList = await client.db(DB_NAME).collection(collection).find({}).toArray();
         let resultPaths = []
         if(indexedList.length)
         resultPaths = indexedList[0].paths


         await client.close()

         return  resultPaths
    } catch (error) {
      await client.close()
    }
}

async function insertIndexedUrls(urlList){
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect()
       const currentList = await getIndexedPaths()

       
       let resultPaths = []

       const documents = await client.db(DB_NAME).collection(collection).find({}).toArray();
       const isEmptyCollection = documents.length == 0

       if( isEmptyCollection )
       {

        client.db(DB_NAME).collection(collection).insertOne({paths : urlList})
       }
       else if ( urlList.length + currentList.length >= paths.length ){
        await client.db(DB_NAME).collection(collection).drop()
       }
       else
       {
        const updateOperation = {
          $push: {
            paths: { $each: urlList }
          }
        };
        const response = await axios.post('https://apkhub.mobi/api/gcam/mongo/updateone',{
          collection : collection,
          filter : {},
          data : updateOperation
        })
       }
       await client.close()
       
  } catch (error) {
    await client.close()
  }
}
let latestIndexedUrls = []
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
    if(error)
    {
     
    }
    else if( response.statusCode === 200  )
    {
      
      latestIndexedUrls.push(url)

    }
  return response.statusCode
  });
});

}
function getUniques(array){
  const map = {}
  let unique = []
  array.forEach((element =>{
    if(!map[element]){
      map[element] = true
      unique.push(element)
    }
  }))
  
  return Object.keys(map)
}
export async function handler(req , res){

  collection = req.body.collection
  domainName = req.body.domainName
  key = keyMap[domainName]

  paths = await getUrlList()

  const indexedList = await getIndexedPaths(paths)

  const pathsToIndex = getUrls(indexedList , paths , Math.floor(QUOTA_LIMIT/ 24) )

  const indexedPaths = []
  pathsToIndex.forEach(async (element)=>{
    const statusCode = await IndexingApi(element)
  })
  setTimeout( async () => {
    await insertIndexedUrls(latestIndexedUrls).then(()=>{
      latestIndexedUrls = []
      res.json({message : 'urls inserted successfully'})
      
    }).catch( (err)=>{
      latestIndexedUrls = []
      res.json({message : 'Something went wrong'})
      
    })
  }, 200);
  

  
  // res.send({paths : pathsToIndex})


}
export default handler