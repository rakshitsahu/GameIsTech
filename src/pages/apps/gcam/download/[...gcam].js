import GCAM_API_STATE from '@/API/API_States'
import { GCAM_GET_REQUEST } from '@/API/GET_API_Manager'
import { FindAllOperation } from '@/API/POST_API_Manager'
import Navbar from '@/Components/gcam/Navbar'
import GcamDownloadPoster from '@/Components/gcam/GcamDownloadPoster'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import Head from 'next/head'
import { encryptString } from '../../../../../GCAM/URL_MANAGER'
import Footer from '@/Components/gcam/footer'

export async function getAllPathsForGcamDownload(toFind = null){
  const gcamJson = await GCAM_GET_REQUEST(GCAM_API_STATE.Gcam)
  const stableGcamJson = await GCAM_GET_REQUEST(GCAM_API_STATE.Generic)
  // console.log(stableGcamJson)
  const paths = []
  const possiblePaths = []
  let result = null
   gcamJson.map((gcamJson) =>{
    gcamJson.data.map(

      (gcam) =>{
        
        const gcamName = gcam.name
        const developer = gcam.developer
        // console.log(gcamName , developer)
        if(toFind && gcamName === toFind[1] && developer === toFind[0] ){
          result = gcam
        }
        paths.push({
          params: {
            gcam : [developer, gcamName],
          },
        })
        possiblePaths.push([encryptString(developer), encryptString(gcamName)])
      }
    )
  })

  stableGcamJson.map((stableGcamJson) =>{
    stableGcamJson.data.map(

      (gcam) =>{
        
        const gcamName = gcam.name
        const developer = gcam.developer
        // console.log(gcamName , developer)
        // console.log(gcamName , developer)
        if(toFind && gcamName === toFind[1] && developer === toFind[0] ){
          result = gcam
        }
        paths.push({
          params: {
            gcam : [developer, gcamName],
          },
        })
        possiblePaths.push([developer, gcamName])
      }
    )
  })
  if(!toFind)
  return [paths, possiblePaths]
  return [paths, result]
}
export async function getStaticPaths(){
  const pathArray = await getAllPathsForGcamDownload()
  const paths = pathArray[0]
  console.log(pathArray[1])
  return {
    paths : [],
    fallback: 'blocking'
}

}

export async function getStaticProps(context){
  const gcamParams = context.params.gcam
  // console.log(gcamParams)
  const [pathArray, developersData, phoneData] = await Promise.all([
    getAllPathsForGcamDownload(gcamParams),
    GCAM_GET_REQUEST(GCAM_API_STATE.Developers),
    GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
  ])
    .then((results) => {
      return results
    })
    // console.log(pathArray , developersData , phoneData)

  // console.log(pathArray[0])
  const data = pathArray[1]
  
  if(data == null)
  {
    return {
      notFound: true,
    }
  }
  // console.log(data)

  const developers = developersData.map(({ developerName }) => ({ name : developerName }))
  const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))

    return {
      props :{
          data ,
          brands,
          developers,
          gcamParams
      },
      // revalidate: 20,
    }
}
export default function GcamDownload({data , brands, developers , gcamParams}) {

  const GcamJson = data;
  const developer = gcamParams[0]
  const apkName = gcamParams[1]
  const description = `Download ${apkName} APK developed by ${developer}`
  const title = `${developer} - ${apkName} | Gcam`
  function addPageInfo() {
    return {
      __html: `
      {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Google Camera Ports",
    
        "description": "${description}" ,
        "brand": {
          "@type": "Brand",
          "name": "Gcam APK"
        }
        ,
          "author": {
            "@type": "Person",
            "name": "Rakshit Sahu"
          }
      }
  `
  };
}
  return (
    <>
    <Head>
    <title>{title}</title>
    <meta
      name="description"
      content= {description}
      key="desc"
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={addPageInfo()}
      key="product-jsonld"
    />
    <meta name="robots" content="index, follow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </Head>
<article>
<Navbar brands={brands} developers = {developers}/>
<GcamDownloadPoster gcams = {[GcamJson]} heading = {'developer'}/>
</article>
<Footer/>
    </>
  )
}