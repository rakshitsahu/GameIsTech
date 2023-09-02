import GCAM_API_STATE from '@/Components/API/API_States'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import { FindAllOperation } from '@/Components/API/POST_API_Manager'
import Navbar from '@/Components/gcam/Navbar'
import DisplayPhoneBrandGcams from '@/Components/gcam/displayPhoneBrandGcams'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import Head from 'next/head'
export async function getStaticPaths(){
  // console.log('working till heere')
    const res  = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
    // console.log( 'gcam versions are', res)
      const paths = res.map( (element)=>{
        return {
            params:{
            phone : element.phoneBrand,
        },
    }
      })
      // console.log( 'paths are' , paths )
      return {
        paths : [] ,
        fallback: 'blocking'
      }
}

export async function getStaticProps(context){
    // const data = {
    //     name : 'hello'
    // }
    // console.log('working till heere')
    const phone = context.params.phone
    // console.log(' data of static props is', phone)
    const [data, developersData, phoneData] = await Promise.all([
      FindAllOperation (GCAM_DB_COLLECTION.Phone_Data , { phoneBrand : phone }).catch( err => {return {}} ),
      GCAM_GET_REQUEST(GCAM_API_STATE.Developers),
      GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
    ])
      .then((results) => {
        return results
      })



    // console.log('the is of this page', data)
    if(data.length == 0)
    {
      return {
        notFound: true,
      }
    }
    // console.log('the new data is', data)


      const developers = developersData.map(({ developerName }) => ({ name : developerName }))
      const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))
      // console.log('the data is ',data)

      return {
        props :{
            data, 
            phone,
            brands,
            developers
        },
        revalidate: 20,
      }
}
export default function Phones({data, phone , brands, developers}) {
    const GcamJson = data;
    // console.log( 'post data is' , GcamJson)
    const description = `Download Gcam for ${phone} Devices. We have so many Google Camera ports for almost every ${phone} Device`
    const title = `Gcam for ${phone} Devices | Google Camera Ports`
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
    <meta name="robots" content="index, follow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </Head>
    <Navbar brands={brands} developers = {developers}/>
    <center><h1 className='text-3xl font-thin'> Download Google Camera Ports for {phone} Devices</h1></center>
    <DisplayPhoneBrandGcams phoneData = {GcamJson} />
    {console.log(GcamJson)}
    {phone}
    
    </>
  )
}
