import GCAM_API_STATE from '@/API/API_States'
import { GCAM_GET_REQUEST } from '@/API/GET_API_Manager'
import Navbar from '@/Components/gcam/Navbar'
import Footer from '@/Components/gcam/footer'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import Head from 'next/head'

export async function getAllPathsForVersionPage(){
  const paths = []
  const possiblePaths = []
  console.log('the nodeenv is ' , process.env.NODE_ENV)
  const res  = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)
  // console.log('working here ', res)
  const keys = Object.keys(res[0])
  keys.splice(0,1)
  // console.log( 'gcam versions are', keys)
  keys.forEach(element => {
    // console.log(element)
    paths.push({
      params:{
      version : element,
  },
    })
    possiblePaths.push(element)
  });
  return [paths , possiblePaths]
}
export async function getStaticPaths(){
      
      const pathsData =  await getAllPathsForVersionPage()
      const paths = pathsData[0]
      // console.log(pathsData[1] )
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
    const version = context.params.version
    // console.log(' data of static props is', version)
    const [phoneData, developersData, gcamVersions,gcamVersionsMap] = await Promise.all([
      GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData),
      GCAM_GET_REQUEST(GCAM_API_STATE.Developers),
      GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions),
      GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersionData)
    ])
      .then((results) => {
        return results
      })


    // console.log(gcamVersionsMap)
    const gcamVersionData = gcamVersionsMap.get(version)
    // console.log(gcamVersionData)
    const developers = developersData.map(({ developerName }) => ({ name : developerName }))
    const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))
    
      return {
        props :{
          gcamVersionData,
          gcamVersions,
            brands,
            developers,
            version
        },
        // revalidate: 20,
      }
}
export default function Version({gcamVersionData ,gcamVersions , brands, developers, version}) {
  const description = `Download Gcam ${version} APKs by various developer. Google Camera ${version} APK Download`
  const title = `Gcam ${version} APKs Download | Google Camera ${version} APK`

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
  </Head>
    <Navbar brands={brands} developers = {developers}/>
    <article>
    <center>
    <h1 className={`${H1} m-8`}>{title}</h1>
    </center>
    <p className={`${content}`}>
    This page Contains all the Gcam {version} apk&apos;s till date. I have listed all the Google Cameras sorted by date.
    If you are having compatibility issues with any of gcam ports, you can checkout the Generic / Stable Gcam APK&apos;s.

    </p>
    <GcamColorfulPoster gcams = {gcamVersionData} className= 'h-screen w-screen' heading = {'name'}/>
    </article>
    <Footer/>
    </>
  )
}
