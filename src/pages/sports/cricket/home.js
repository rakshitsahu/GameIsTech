import React from 'react';
import Navbar from './_components/navbar';
import HorizontalCarousel from './_components/HorizontalCarousel';
import OptimizedHorizontalCarousel from './_components/OptimizedHorizontalCarousel';
import RankBoard from './_components/RankBoard';

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
    <div style={{ backgroundColor: '#0d121a' }} className='h-full w-full'>
      <Navbar />
      <article>
      <div className='grid grid-rows-2 h-full divide-y '>
      {
        <div className='flex row-span-1  p-3 items-center justify-center min-h-full'>
        <div id='2' className='flex h-96 w-[90rem] bg-black '>
          <OptimizedHorizontalCarousel itemHeight={96} itemWidth={90}>
            {colors.map((color, index) => (
              <div key={index} className={`flex-none ${color} h-96 w-[90rem]`}></div>
            ))}
          </OptimizedHorizontalCarousel>
        </div>
      </div>
      }
      <div className='grid grid-cols-6 p-2 gap-2'>
        <div className='sm:order-2 md:order-2 lg:order1 order-1 sm:col-span-6 md:col-span-6 lg:col-span-1 col-span-1 bg-red-400 '>
          ewfergeg
        </div>
        <div className='sm:order-1 md:order-1 lg:order-2 order-2 sm:col-span-6 md:col-span-6 lg:col-span-4 col-span-4  bg-white'>

        </div>
        <div className='sm:order-3 md:order-3 lg:order-3 order-3 sm:col-span-6 md:col-span-6 lg:col-span-1 col-span-1  bg-blue-400'>
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
