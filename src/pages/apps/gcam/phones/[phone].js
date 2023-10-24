import GCAM_API_STATE from '@/API/API_States'
import { GCAM_GET_REQUEST } from '@/API/GET_API_Manager'
import { FindAllOperation } from '@/API/POST_API_Manager'
import Navbar from '@/Components/gcam/Navbar'
import DisplayPhoneBrandGcams from '@/Components/gcam/displayPhoneBrandGcams'
import Footer from '@/Components/gcam/footer'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import Head from 'next/head'
import Link from 'next/link'

export async function getAllPathsForPhonePage(){
  const paths = []
  const possiblePaths = []
  const res  = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
  
  res.map( (element)=>{
    paths.push({
      params:{
      phone : element.phoneBrand,
  },
  }
  )
  possiblePaths.push(encodeURIComponent(element.phoneBrand))
    })
  return [paths , possiblePaths]
}
// export async function getStaticPaths(){

//     const pathData = await getAllPathsForPhonePage()
//     const paths = pathData[0]

//       return {
//         paths : [] ,
//         fallback: false
//       }
// }
export async function getServerSideProps(context){

    const phone = context.params.phone
    const pathData = await getAllPathsForPhonePage()
    const paths = pathData[1]
    if( !paths.includes(encodeURIComponent(phone)))
    {
      return {
        notFound: true,
      }
    }
    
    const [data, developersData, phoneData] = await Promise.all([
      FindAllOperation (GCAM_DB_COLLECTION.Phone_Data , { phoneBrand : phone }).catch( err => {return {}} ),
      GCAM_GET_REQUEST(GCAM_API_STATE.Developers),
      GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
    ])
      .then((results) => {
        return results
      })


      const developers = developersData.map(({ developerName }) => ({ name : developerName }))
      const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))
      

      return {
        props :{
            data, 
            phone,
            brands,
            developers
        },
        
      }
}
export default function Phones({data, phone , brands, developers}) {
    const GcamJson = data;
    
    const description = `Download Gcam for ${phone} Devices. We have so many Google Camera ports for almost every ${phone} Device`
    const title = `Gcam for ${phone} Devices | Google Camera Ports`
    const H1 = 'font-semibold text-5xl'
    const content = 'font-thin text-xl m-3'
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
    <link rel="canonical" href= {`https://${process.env.HOST}/apps/gcam/phones/${encodeURIComponent(phone)}`} />
  </Head>
    <Navbar brands={brands} developers = {developers}/>
    <article>
    <center>
    <h1 className={`${H1} m-8`}>{title}</h1>
    </center>
    <p className={`${content}`}>
    Looking for the Google Camera for your {phone} device. I hope you will get it on this page. If in case you don&apos;t find your device on this page.
    Dont worry you can checkout the collection of <Link href='/apps/gcam' className='underline underline-offset-2 decoration-emerald-500'>
    generic / stable google cameras
 </Link>, These gcams are compatible with most of the devices.


    </p>
    <DisplayPhoneBrandGcams phoneData = {GcamJson[0]} />
    </article>
    <Footer/>
    
    </>
  )
}
