import GCAM_API_STATE from '@/Components/API/API_States'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import { FindAllOperation } from '@/Components/API/POST_API_Manager'
import Navbar from '@/Components/gcam/Navbar'
import GcamDownloadPoster from '@/Components/gcam/GcamDownloadPoster'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import Head from 'next/head'

async function getAllPaths(toFind = null){
  const gcamJson = await GCAM_GET_REQUEST(GCAM_API_STATE.Gcam)
  const paths = []
  const possiblePaths = []
  let result = null
   gcamJson.map((gcamJson) =>{
    gcamJson.data.map(

      (gcam) =>{
        
        const gcamName = gcam.name.replaceAll(" ", "-")
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
        possiblePaths.push([developer, gcamName])
      }
    )
  })
  return [paths, result]
}
export async function getStaticPaths(){
  const pathArray = await getAllPaths()
  const paths = pathArray[0]
  // console.log(paths)
  return {
    paths : paths,
    fallback: true
}

}

export async function getStaticProps(context){
  const gcamParams = context.params.gcam
  const pathArray = await getAllPaths(gcamParams)
  console.log(pathArray[0])
  const data = pathArray[1]
  
  if(data == null)
  {
    return {
      notFound: true,
    }
  }
  console.log(data)
  const developersData = await GCAM_GET_REQUEST(GCAM_API_STATE.Developers)
  const phoneData = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
  const developers = developersData.map(({ developerName }) => ({ name : developerName }))
  const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))

    return {
      props :{
          data ,
          brands,
          developers,
          gcamParams
      },
      revalidate: 20,
    }
}
export default function GcamDownload({data , brands, developers , gcamParams}) {

  const GcamJson = data;
  const developer = gcamParams ? gcamParams[0].replaceAll('-', ' '):''
  const apkName = gcamParams[1]
  const description = `Download ${apkName} APK developed by ${developer}`
  const title = `${developer} - ${apkName} | Google Camera Ports`
  function addPageInfo() {
    return {
      __html: `
      {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Google Camera Ports",
    
        "description": ${description} ,
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
  </Head>
    <Navbar brands={brands} developers = {developers}/>
    Hello there page has been loaded successfully
    <GcamDownloadPoster gcams = {[GcamJson]} heading = {'developer'}/>
    </>
  )
}