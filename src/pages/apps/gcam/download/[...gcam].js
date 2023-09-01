import GCAM_API_STATE from '@/Components/API/API_States'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import { FindAllOperation } from '@/Components/API/POST_API_Manager'
import Navbar from '@/Components/gcam/Navbar'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import Head from 'next/head'
export async function getStaticPaths(){
  const gcamJson = await GCAM_GET_REQUEST(GCAM_API_STATE.Gcam)
  const paths = []
   gcamJson.map((gcamJson) =>{
    gcamJson.data.map(

      (gcam) =>{
        
        const gcamName = gcam.name.replaceAll(" ", "-")
        const developer = gcam.developer
        // console.log(gcamName , developer)
        paths.push({
          params: {
            gcam : [developer, gcamName],
          },
        })
       
      }
    )
  })
  // console.log(paths)
  return {
    paths : paths,
    fallback: true
}

}

export async function getStaticProps(context){
  const gcamParams = context.params.gcam
  console.log('the gcam params are',gcamParams)
  const data = await FindAllOperation (GCAM_DB_COLLECTION.Gcam , {developerName: gcamParams[0], name : gcamParams[1] }).catch( err => {return {}} )
  console.log('the new data is', data)
  if(data.length == 0)
  {
    return {
      notFound: true,
    }
  }

    const developers = await GCAM_GET_REQUEST(GCAM_API_STATE.DeveloperNames)
    const brands = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneBrands)

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
  const apkName = gcamParams ? gcamParams[1].replaceAll('-', ' '):''
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
    {console.log(GcamJson)}
    <GcamColorfulPoster gcams = {GcamJson} heading = {'developerName'}/>
    </>
  )
}