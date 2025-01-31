import GCAM_API_STATE from '@/API/API_States'
import { GCAM_GET_REQUEST } from '@/API/GET_API_Manager'
import Navbar from '@/Components/gcam/Navbar'
import DisplayDevelopers from '@/Components/gcam/displayDevelopers'
import DisplayGcamVersions from '@/Components/gcam/displayGcamVersions'
import DisplayGenericGcams from '@/Components/gcam/displayGenericGcams'
import Footer from '@/Components/gcam/footer'
import Head from 'next/head'
import { BsCamera2, BsReddit, BsTelegram } from 'react-icons/bs'
import { SiXdadevelopers } from "react-icons/si"
export async function getAllPathsForPhoneDownloadPage(){
  const paths = []
  const possiblePaths = []
  const phoneData = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
  phoneData.map((phoneData) =>{
    phoneData.data.map(
      (phone) =>{
        const phoneName = phone.phoneName
        const phoneBrand = phoneData.phoneBrand
        
        paths.push({
          params: {
            phone : [phoneBrand, phoneName],
          },
        })
        possiblePaths.push([encodeURIComponent(phoneBrand), encodeURIComponent(phoneName)])
      }
    )
  })
  return [paths , possiblePaths]
}












export async function getServerSideProps(context){
  const phone = context.params.phone
  const pathData = await getAllPathsForPhoneDownloadPage()
  const paths = pathData[1]
  
  let phoneBrand = phone[0]
  let phoneName = phone[1]
  let result = false
  paths.forEach( (element) =>{
    if(element[0] == encodeURIComponent(phoneBrand) && element[1] == encodeURIComponent(phoneName))
    result = true
  })
  if( !result )
  {
    return {
      notFound: true,
    }
  }
  
  


  const [developersData, phoneData, genericGcams, gcamVersionsData] = await Promise.all([
    GCAM_GET_REQUEST(GCAM_API_STATE.Developers),
    GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData),
    GCAM_GET_REQUEST(GCAM_API_STATE.Generic),
    GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)
  ])
    .then((results) => {
      return results
    })

    const gcamVersions = []
  
  Object.keys(gcamVersionsData[0]).map(
  (element)=>{
    gcamVersions.push(element)
  }
  )
    const developers = developersData.map(({ developerName }) => ({ name : developerName }))
    const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))

    let phoneBrandData
    phoneData.forEach( phone => {
      if( phone.phoneBrand === phoneBrand )
      {
        phoneBrandData = phone.data;
      }
    });

    let currentPhoneData = []
    
    phoneBrandData.forEach( phone => {
      if( phone.phoneName === phoneName)
      {
        currentPhoneData = phone.source;
      }
    });
    


    return {
      props :{
          phoneBrand,
          phoneName,
          developers,
          brands,
          genericGcams,
          gcamVersions,
          currentPhoneData
      },
      
    }
}
export default function GcamDownloadForPhone({phoneBrand, phoneName , developers , brands , genericGcams, gcamVersions , currentPhoneData}) {
  
  const GcamDescription = `If you are looking for working Gcam for ${phoneName}. 
   You are at the best place. we have variety of Google Camera Ports.
   With excellent filters which will help you to find out the most compatible Google Camera for ${phoneName}
   in no time.`
   const GenericGcamDescription = `Generic Gcams are compatible with most of the devices.
    Make sure you checkout Gcam ports in ${phoneName}. 
   Before downloading, verify the compatibility from the Google Camera description with ${phoneName} features.`
   const description = `Download Gcam for ${phoneName}. We also have generic Google Camera ports which could work in ${phoneName}.`
   const title = `Gcam for ${phoneName} | Google Camera Ports`

 
  return (
    <>
    <Head>
    <title>{title}</title>
    <meta
      name={title}
      content= {description}
      key="desc"
    />

    <meta name="robots" content="index, follow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="canonical" href= {`apps/gcam/phones/${encodeURIComponent(phoneBrand)}/${encodeURIComponent(phoneName)}`} />
  </Head>
    <Navbar brands={brands} developers={developers}/>
    <article className='grid justify-items-center m-3'>
    <h1 className='text-3xl font-thin mt-3'> Download Google Camera Ports For {phoneName} </h1>
    <p className=' prose prose-xl font-thin text-xl flex flex-wrap m-3 bg-white  shadow-2xl contrast-100 brightness-90 p-3 rounded-3xl'> 
    {GcamDescription}
    </p>
    <div className='mt-3'>
    {
      Object.keys(currentPhoneData).map((source)=>{
        
        {
         return Object.keys(currentPhoneData[source]).map(
            (index)=>{
              
              const anchorText = currentPhoneData[source][index].anchorText
              const downloadLink = currentPhoneData[source][index].downloadLink
              
              
              return (
                <div key = {source} className='m-1 p-3   rounded-full'>
                { source === 'reddit' &&  <a href={downloadLink}><div className='flex items-center underline decoration-orange-400 underline-offset-2'><BsReddit className='text-orange-400' /><button >{anchorText}</button> </div> </a>  }
                { source === 'telegram' &&  <a href={downloadLink}><div className='flex items-center underline decoration-blue-400 underline-offset-2'><BsTelegram className='text-sky-400' /> <button >{anchorText}</button></div></a> }
                { source === 'xda' && <a href={downloadLink}><div className='flex items-center underline decoration-red-400 underline-offset-2'><SiXdadevelopers className='text-red-400' /> <button >{anchorText}</button></div></a> }
                { source === 'official' && <a href={downloadLink}><div className='flex items-center underline decoration-emerald-400 underline-offset-2'><BsCamera2 className='text-emerald-400' /> <button >{anchorText}</button></div></a> }
                </div>
              );
            }
          )
        }


      }
      )
    }
    </div>
    <div className='mt-3'>
    <center>
    <h2 className = 'text-3xl font-thin' >Generic Google Camera Ports Might Be Compatible For {phoneName}</h2>
    </center>
    <p className=' font-thin text-xl flex flex-wrap m-3 bg-white  shadow-2xl contrast-100 brightness-90 p-3 rounded-3xl'> 
    {GenericGcamDescription}
    </p>
    
    


    
    <div className=''>
    <center className='mt-7'>
    <font className='font-thin text-4xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Generic Google Camera APKs </font>
    </center>
    <div>
    <DisplayGenericGcams genericGcams = {genericGcams}/>
    </div>
    </div>

    </div>
    <div className='m-3 w-full'>
    <center><h3 className='text-2xl font-thin  m-3'> Download Google Camera Ports By Popular Developers</h3></center>
    {`We have wide variety of Google Camera ports. You can check them out at`} 
 
    <DisplayDevelopers developers={developers}/>
    </div>
    
    <div className='m-3 w-full'>
    <center><h3 className='text-2xl font-thin'> Download Google Camera Ports By Versions</h3></center>
    <DisplayGcamVersions gcamVersions={gcamVersions} heading = {'version'}/>
    
    </div>
    </article>
    <Footer/>
    </>
  )
}
