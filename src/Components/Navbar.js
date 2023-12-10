import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const itemsCss =
    'flex h-full p-4 items-center hover:bg-blue-800 bg-blue-500 text-white overflow:visible';

  return (
    <nav className='flex h-10 bg-transparent fixed w-full z-10 text-xs sm:text-sm md:text-base'>
      <div className='w-full sm:w-auto flex flex-wrap bg-white-600 mx-auto rounded-3xl overflow-clip bg-transparent'>
        <div className={itemsCss}>
          <Link href={'/'}>Home</Link>
        </div>
        <div className={itemsCss}>
          <Link href='/terms'>Terms & Conditions</Link>
        </div>
        <div className={itemsCss}>
          <Link href='/about'>AboutUs</Link>
        </div>
        <div className={itemsCss}>
        <Link href='/contact'>ContactUs</Link>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
