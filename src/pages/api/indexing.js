
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
       console.log(collection)
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

async function IndexingApi(url) {
  return new Promise((resolve, reject) => {
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ["https://www.googleapis.com/auth/indexing"],
      null
    );

    jwtClient.authorize(async function (err, tokens) {
      if (err) {
        reject(501);
      }

      let options = {
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        auth: { "bearer": tokens.access_token },
        json: {
          "url": url,
          "type": "URL_UPDATED"
        }
      };

      try {
        const response = await request(options);
        console.log(url);
        resolve(response.statusCode);
      } catch (error) {
        reject(error.statusCode);
      }
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
  console.log(indexedList)
  console.log(paths)
  const pathsToIndex = getUrls(indexedList , paths , Math.floor(QUOTA_LIMIT/ 24) )
  console.log(pathsToIndex)
  const latestIndexedUrls = []
  const promises = pathsToIndex.map(async (element) => {
    try {
      await IndexingApi(element).then((status)=>{
        console.log(status);
        console.log(element);
        latestIndexedUrls.push(element);
      });
      
    } catch (error) {
      console.log("Problem occurred "+ error.message);
    }
  });
  
  // Use Promise.all to wait for all promises to resolve
  await Promise.all(promises);
  
  // Handle the insertion of indexed URLs
  try {
    console.log(latestIndexedUrls)
    await insertIndexedUrls(latestIndexedUrls);
    res.json({ message: 'Urls inserted successfully' });
  } catch (err) {
    res.json({ message: 'Something went wrong' });
  }
 
  

  
  // res.send({paths : pathsToIndex})


}
export default handler