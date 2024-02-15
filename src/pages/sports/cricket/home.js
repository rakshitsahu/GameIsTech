import React from 'react';
import Navbar from './_components/navbar';
import HorizontalCarousel from './_components/HorizontalCarousel';
import OptimizedHorizontalCarousel from './_components/OptimizedHorizontalCarousel';
import RankBoard from './_components/RankBoard';
import TeamLeaderboard from './_components/TeamLeaderboard';

function Cricket() {
  const headings = ['Player Name' ,'Sixes' ]
  const playersJson = [{Image :'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/210/1.png',
                        Name : 'MS Dhoni',
                        Sixes :'6',
                        Rank : 1,
                        },
                      {
                        Image :'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/210/1.png',
                        Name : 'Ishant Sharma',
                        Rank : 1,
                        Sixes :'6'
                      },
                      {Image :'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/210/1.png',
                      Name : 'MS Dhoni',
                      Sixes :'6',
                      Rank : 1,
                      },
                    {
                      Image :'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/210/1.png',
                      Name : 'Ishant Sharma',
                      Rank : 1,
                      Sixes :'6'
                    }]
  const colors = ['bg-cyan-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400'];

  return (
    <div style={{ backgroundColor: '#0d121a' }} className='h-full w-full overflow-hidden'>
      {
        <Navbar />
      }
      <article>
      <div className='grid  h-full divide-y '>
      <div className='flex p-3 items-center justify-center min-h-full '>
      <div className='flex m-3  relative w-full h-full'>
      <div className='w-full h-full flex-none grid grid-cols-3'>
      <div className='TEAM_1  object-cover flex items-center justify-center'> <img src = '/sports/cricket/ipl/rr.png' /> </div>
      <div className='VS_CONTAINER object-cover flex items-center justify-center'> <img src = '/sports/cricket/ipl/vs-logo.png' /> </div>
      <div className='TEAM_2  object-cover flex items-center justify-center' ><img src = '/sports/cricket/ipl/csk.png' /></div>
       
      </div>
        {
        //   <OptimizedHorizontalCarousel className='flex-none w-full h-full bg-cyan-500'>
        //   {colors.map((color, index) => (
        //     <div key={index} className={`flex-none ${color} w-full h-full`}></div>
        //   ))} 
        // </OptimizedHorizontalCarousel>
        }
    </div>
    
    </div>
      <div className='grid xl:grid-cols-6 lg:grid-cols-6 sm:grid-rows-3 md:grid-rows-3 p-2 gap-2'>
        <div className='sm:order-2 md:order-2 lg:order-1 xl:order-1  lg:col-span-1 xl:col-span-1  overflow-x-scroll'>
        {
          <TeamLeaderboard/>
        }
        </div>
        <div className='sm:order-1 md:order-1 lg:order-2 xl:order-2  lg:col-span-4 xl:col-span-4 overflow-x-scroll'>
        <TeamLeaderboard/>
        </div>
        <div className='sm:order-3 md:order-3 lg:order-3 xl:order-3  lg:col-span-1 xl:col-span-1 overflow-x-scroll'>
        <RankBoard headings={headings} playersJson = {playersJson}>
        </RankBoard>
        </div>
      </div>
    </div>

      </article>
      
    </div>
  );
}

export default Cricket;
