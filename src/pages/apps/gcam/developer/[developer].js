import GCAM_API_STATE from '@/API/API_States'
import { GCAM_GET_REQUEST } from '@/API/GET_API_Manager'
import Navbar from '@/Components/gcam/Navbar'
import Footer from '@/Components/gcam/footer'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import Head from 'next/head'
export async function getAllPathsForDeveloperPage(){
  const paths = []
  const possiblePaths = []
  const developersData = await GCAM_GET_REQUEST(GCAM_API_STATE.Developers)
  const developers = developersData.map(({ developerName }) => ({ name : developerName }))
  developers.map( (element)=>{
    // console.log(element)
    paths.push({
      params:{
      developer : element.name,
  }
})
    possiblePaths.push(encodeURIComponent(element.name))
  })
  return [paths , possiblePaths]
}
export async function getStaticPaths(){
  const developersData = await GCAM_GET_REQUEST(GCAM_API_STATE.Developers)
  const developers = developersData.map(({ developerName }) => ({ name : developerName }))
    //   console.log( 'gcam versions are', res)
  const pathsData = await getAllPathsForDeveloperPage()
      const paths = pathsData[0]
      // console.log( 'paths are' , pathsData[1] )
      return {
        paths : [],
        fallback: 'blocking'
      }
}

export async function getStaticProps(context){
    // const data = {
    //     name : 'hello'
    // }
    // console.log('working till heere')
    const developer = context.params.developer

    const [gcamData, developersData, phoneData] = await Promise.all([
      GCAM_GET_REQUEST(GCAM_API_STATE.Gcam),
      GCAM_GET_REQUEST(GCAM_API_STATE.Developers),
      GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
    ])
      .then((results) => {
        return results
      })
    
    // const gcamData = await GCAM_GET_REQUEST(GCAM_API_STATE.Gcam)

    // const developersData = await GCAM_GET_REQUEST(GCAM_API_STATE.Developers)
    // const phoneData = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
    // console.log('developer name is' , developer)
    let data = null
    Object.keys(gcamData).map(
      (element) =>{
        // console.log(gcamData[element].developerName , developer )
        if( gcamData[element].developerName === developer ){
          data = gcamData[element].data
        }
      }
    )
    if(!data)
    {
      return {
        notFound: true,
      }
    }
    const developers = developersData.map(({ developerName }) => ({ name : developerName }))
    const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))

      return {
        props :{
          data ,
            brands,
            developers,
            developer
        },
        // revalidate: 20,
      }
}
export default function Developer({data , brands, developers,developer}) {
  if(!data)
  data = []
  const GcamJson = data;
  // console.log(GcamJson)
  const description = `Download all Gcam ports made by ${developer}. We have ${GcamJson.length} Google Camera Ports that are
  made by ${developer}.`
  const title = `Gcam APK's By ${developer} | Google Camera Ports`
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
const H1 = 'font-semibold text-5xl'
const content = 'font-thin text-xl'
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={addPageInfo()}
      key="product-jsonld"
    />
  </Head>
    <Navbar brands={brands} developers = {developers}/>
    <article>
    <center>
    <h1 className={`${H1} m-8`}>{title}</h1>
    </center>
    <p className={`${content}`}>
    This page Contains all the Gcam apk&apos;s made by {developer} till date. I have listed all the Google Cameras sorted by date.
    If you are having compatibility issues with any of {developer} gcam ports, you can checkout the Generic / Stable Gcam APK&apos;s.

    </p>
    <GcamColorfulPoster gcams = {GcamJson} heading = {'developer'}/>
    </article>
    <Footer/>
    </>
  )
}
