import Link from 'next/link'
import React from 'react'
import GcamColorfulPoster from './gcamColorfulPoster';
export default function DisplayGenericGcams({genericGcams}) {

  return (
   <div className='text-xl font-thin mt-3'>
   Below given Gcams are the most stable Google Camera ports. Therefore there are high chances that few of them might be compatible for your device before downloading make sure that the Gcam APK is compatible for your Android version.
{
    Object.keys(genericGcams).map(  (index) => {
        return (
            <div key={index} >
            <center><h4 className='text-3xl font-bold mt-3'> Download Stable Gcam APK's for {genericGcams[index].requiredAndroidVersion} </h4>
            <div className='my-6 font-2xl'> {genericGcams[index].gcamSummary} </div>
            </center>
            <div className='mt-3'>
            
            <GcamColorfulPoster  gcams = {genericGcams[index].data} heading = {'info'} />
            </div>
            
            </div>
            

        );
      })
}
   
   </div>
  )
  }
