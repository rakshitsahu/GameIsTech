import GCAM_API_STATE from '@/API/API_States'
import { GCAM_GET_REQUEST } from '@/API/GET_API_Manager'
import GcamDownloadPoster from '@/Components/gcam/GcamDownloadPoster'
import Navbar from '@/Components/gcam/Navbar'
import Footer from '@/Components/gcam/footer'
import Head from 'next/head'


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
        possiblePaths.push([developer, gcamName])
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
  // console.log('static path started')
  const pathArray = await getAllPathsForGcamDownload()
  // console.log('get all path completed')
  const paths = pathArray[0]
  // console.log(pathArray[1])
  return {
    paths : [],
    fallback: 'blocking'
}

}

export async function getStaticProps(context){
  let gcamParams = context.params.gcam
  console.log('params found are' )
  gcamParams = [gcamParams[0] , gcamParams[1]]
  console.log('after decrypthon params are' , gcamParams)
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
  console.log('data is null ' , data)
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

  return (
    <>
    <Head>
    <title>{title}</title>
    <meta
      name="description"
      content= {description}
      key="desc"
    />

    <meta name="robots" content="index, follow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="canonical" href= {`https://apkhub.mobi/apps/gcam/download/${encodeURIComponent(developer)}/${apkName}`} />
  </Head>
<article>
<Navbar brands={brands} developers = {developers}/>
<GcamDownloadPoster gcams = {[GcamJson]} heading = {'developer'}/>
</article>
<Footer/>
    </>
  )
}