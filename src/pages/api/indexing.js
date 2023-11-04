
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";
const { MongoClient, ServerApiVersion } = require('mongodb');
import { connectToMongo } from "@/MongoDb/MongoDB";
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
let domainName = ""
const keyMap = {
  "apkhub.mobi" : apkHubKey,
  "gameistech.com" : GameIsTechKey,
  "androidapkdownloads.info" : androidApkKey
}
var key = {}
const DB_NAME = "Indexing-DB"
let collection = "indexedPaths"
const client = await connectToMongo(process.env.INDEXING_DB_NAME)
const defaultDomainName = "gameistech.com"
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

    try {

         const data = await client.collection(collection).find({}).toArray();

        let resultPath = []
         if(data.length == 0){
          const urlList = await GCAM_URLS(GCAM_URL_STATE.All)
          resultPath = urlList
          
          await client.collection(collection).insertOne({paths : getUniques(urlList)}).catch((err)=>{

          })
         }
         else
         resultPath = data[0].paths
         const replacedDomain = []
         resultPath.forEach((element)=>{
          const updatedURL = element.replace(defaultDomainName , domainName)
          replacedDomain.push(updatedURL)
         })

         return  replacedDomain
    } catch (error) {
    }
}

async function getIndexedPaths(indexedUrls){

    try {

         const indexedList = await client.collection(collection).find({}).toArray();
         let resultPaths = []
         if(indexedList.length)
         resultPaths = indexedList[0].paths

         return  resultPaths
    } catch (error) {
    }
}

async function insertIndexedUrls(urlList){


  try {
    
       const currentList = await getIndexedPaths()

       
       let resultPaths = []

       const documents = await client.collection(collection).find({}).toArray();
       const isEmptyCollection = documents.length == 0

       if( isEmptyCollection )
       {

        client.collection(collection).insertOne({paths : urlList})
       }
       else if ( urlList.length + currentList.length >= paths.length ){
        await client.collection(collection).drop()
       }
       else
       {
        const updateOperation = {
          $push: {
            paths: { $each: urlList }
          }
        };
        const response = await axios.post(`https://${process.env.HOST}/api/gcam/mongo/updateone`,{
          collection : collection,
          filter : {},
          data : updateOperation
        })
       
       }

       
       
  } catch (error) {

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
      console.log("success url is "+ url)
      latestIndexedUrls.push(url)

    }
    else
    {
      console.log("failed url is "+ url)
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
  console.log(domainName)
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
  }, 1500);
  

  
  // res.send({paths : pathsToIndex})


}
export default handler