import Link from 'next/link';
import { FcCameraIdentification, FcInfo } from "react-icons/fc";
import { MdDateRange, MdOutlineDeveloperMode } from "react-icons/md";

export default function GcamColorfulPoster({gcams, heading , prefix , download }) {
  if(!gcams)
  gcams = []
    const colors = ['from-pink-500 to-violet-500', 'from-green-500 to-violet-500' , 'from-violet-500 to-pink-500' 
   , 'from-pink-500 to-green-500' , 'from-violet-500 to-red-500' , 'from-violet-500 to-green-500'
]
    let prefixString = ''
    if (prefix) {
            prefixString = prefix
        }
    let color = Math.floor(Math.random() * colors.length)
    const test = `flex justify-center bg-black text-5xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color]} `
  return (
    <div className=' grid lg:grid-cols-2 overflow-clip xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center w-full rounded-md p-5 shadow-2xl drop-shadow-2xl gap-14 '>
    {
        Object.keys(gcams).map(  (index) => {
        console.log ( 'the brand is ', gcams[index].developer)
        const encryptedDeveloper = encodeURIComponent(gcams[index].developer)
        const encryptedGcamName = encodeURIComponent(gcams[index].name)
        console.log(encryptedDeveloper)
          return (
            <Link key={index} value={gcams[index].name} href={`/apps/gcam/download/${encryptedDeveloper}/${encryptedGcamName}`} >
            
            <div  className='grid group/item bg-white rounded-3xl p-4'>
            <div  className={`flex justify-center  bg-black md:xl lg:text-3xl xl:text-3xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color++ % colors.length]} `}>
             {prefixString + gcams[index][heading] } 
             
             </div>
             <div className="overflow-x-auto">
             <table className="table-auto border-spacing-x-2.5">
               <tbody>
                 <tr>
                   <td className="font-mono text-2xl flex p-3 truncate">Gcam Name <FcCameraIdentification className="m-1"/></td>
                   <td className="font-mono">{gcams[index].name}</td>
                 </tr>
                 <tr>
                   <td className="font-mono text-2xl flex p-3 truncate">Developer <MdOutlineDeveloperMode className="justify-self-center m-1"/></td>
                   <td className="font-mono text-xl">{gcams[index].developer}</td>
                 </tr>
                 <tr>
                   <td className="font-mono text-2xl flex p-3 truncate">Version <FcInfo className="justify-self-center m-1"/></td>
                   <td className="font-mono text-xl">{gcams[index].version}</td>
                 </tr>
                 <tr>
                   <td className="font-mono text-2xl flex p-3 truncate">Date <MdDateRange className="text-green-500 justify-self-center m-1"/></td>
                   <td className="font-mono text-xl">{gcams[index].date}</td>
                 </tr>
               </tbody>
             </table>
           </div>
           
           
                {
                  download &&
                  <div className='m-2 grid items-center justify-items-center'>
                  <center><div className='font-mono text-2xl flex p-3'> description</div></center>
                  <div className='flex flex-grow-0 '>{gcams[index].description}</div>
                  </div>
                }
                {
                  download &&
                  <center> <button hr className='bg-purple-500 active:bg-purple-800 hover:ring-2 rounded-r-full rounded-l-full p-4 text-white'>
                  
                  <a target="_blank" class="fcc-btn" href="https://www.freecodecamp.org/">Download</a> 
                  </button> </center>     
                }        
            </div>
            </Link>

          );
        })
    }
    </div>
  )
}

 