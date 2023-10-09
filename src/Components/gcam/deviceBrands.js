import Image from 'next/image';
import Link from 'next/link';
function DeviceBrands({brands}) {
  return (
    <div className='grid grid-cols-6 lg: rounded-md p-5 shadow-2xl drop-shadow-2xl  gap-3 font-thin'>
    {
        Object.keys(brands).map(  (index) => {
          return (
            
            <div key={index} className=' h-auto w-auto rounded-lg shadow-2xl drop-shadow-2xl overflow-clip'>
            <Link  className='bg-black' value={brands[index].name} href={`/apps/gcam/phones/${brands[index].name}`}>
            <Image className='hover:scale-125 transition-all duration-500 cursor-pointer object-fill w-full h-full'
             src= { `/gcam/phonebrands/${brands[index].name.toLowerCase()}.jpg` } width={200} height={200}
             alt={`${brands[index].name}`}
             quality={40} />
            </Link>
            </div>
          );
        })
    }

    </div>
  )
}

export default DeviceBrands