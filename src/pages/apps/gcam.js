import GCAM_API_STATE from '@/API/API_States'
import { GCAM_GET_REQUEST } from '@/API/GET_API_Manager'
// import Navbar from '@/Components/gcam/Navbar'
import DeviceBrands from '@/Components/gcam/deviceBrands'
import DisplayDevelopers from '@/Components/gcam/displayDevelopers'
import DisplayGcamVersions from '@/Components/gcam/displayGcamVersions'
import DisplayGenericGcams from '@/Components/gcam/displayGenericGcams'
import Footer from '@/Components/gcam/footer'
import Head from 'next/head'
import Navbar from '@/Components/gcam/Navbar'
export async function  getServerSideProps() {

  const [developersData, gcamVersionsData, phoneData, genericGcams] = await Promise.all([
    GCAM_GET_REQUEST(GCAM_API_STATE.Developers),
    GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions),
    GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData),
    GCAM_GET_REQUEST(GCAM_API_STATE.Generic),
  ])
    .then((results) => {
      return results
    }).catch((e)=>console.log("Error has been encountered " + e))

const gcamVersions = []

Object.keys(gcamVersionsData[0]).map(
  (element)=>{
    gcamVersions.push(element)
  }
)
gcamVersions.splice(0 , 1)

const developers = developersData.map(({ developerName }) => ({ name : developerName }))
const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))

  return {
    props: {
      brands,
      developers,
      gcamVersions,
      genericGcams
    },
  }
}
export default function home({ brands, developers, gcamVersions, genericGcams }) {
  const description = ` We are the best place to download Gcam APKS. 
  We have clean and best UI with powerful fiters which helps you to find Google Camera Port 
  in no time
  `
  return (
    <>
    <Head>
    <title> Gcam APK&apos;s | Stable Google Camera Ports</title>
    <meta
      name="description"
      content= {description}
      key="desc"
    />
    <meta name="robots" content="index, follow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="canonical" href= {`https://gameistech.com/apps/gcam`} />

  </Head>
      <Navbar brands={brands} developers = {developers} className="w-full h-full"/>
      <article className='grid m-3 gap-5'>

      <center><h1 className='font-semibold text-5xl'>Download Gcam APK&apos;s For your device | Google Camera Ports</h1></center>
      <p className = 'font-thin text-xl'>
      Google Camera has been incredibly popular and useful in the realm of photography. It has always been challenging to find the best-working Gcam APK for a device. 
      Even users new users gets confused which gcam APK to download for a device from celsoazevedo,
       which is the origin of Google Camera Ports.
       I have organized all the Gcam APKs that celsoazevedo and XDA developers has, along with UI improvements, which will help you find the Google Camera Port for your device in no time.
      </p>
      
      <p className='p-3 bg-green-300 rounded-2xl'>Don&apos;t worry. You will always receive updated content here on any Gcam-related page because my website (GCAM section) employs a smart algorithm.
       This algorithm fetches and verifies the authenticity of the Google Camera Port from popular websites such as celsoazevedo, XDA Developers, Reddit, etc.
       </p>

       <p className='p-3 bg-red-300 rounded-2xl'>
       Known Issue: Unfortunately, algorithm struggles to identify the correct Gcam version.
        Therefore, please ensure that you verify the Gcam version in the Gcam APK name. I hope to resolve this issue in the future.
       </p>
      <center className='mt-7'>
      <font className='font-thin text-3xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Phone brands that supports Google Camera Port </font>
      </center>
      
    <div className=''><DeviceBrands brands={brands}/></div>

    <div className=''>
    <center className='mt-7'>
    <font className='font-thin text-4xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Generic Google Camera APKs </font>
    </center>
    <div>
    <DisplayGenericGcams className ='' genericGcams = {genericGcams}/>
    </div>
    </div>
    
    <center className='mt-7'>
    <font className='font-thin text-3xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Popular Google Camera Port Developers </font>
    </center>

    <div className='m-3'>
    <DisplayDevelopers developers={developers}/>
    
    </div>

    <center className='mt-7'>
    <font className='font-thin text-3xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Download Google Camera Port by Versions </font>
    </center>

    <div class=" m-3">
    <DisplayGcamVersions gcamVersions={gcamVersions} />
   </div>


    <center className='mt-7'>
    </center>
    </article>
    <Footer/>
    
    </>
    
  )
}