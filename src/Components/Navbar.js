import React from 'react';

const Navbar = () => {
  const itemsCss =
    'flex h-full p-4 items-center hover:bg-blue-800 bg-blue-500 text-white overflow:visible';

  return (
    <nav className='flex h-10 bg-transparent fixed w-full z-10 text-xs sm:text-sm md:text-base'>
      <div className='w-full sm:w-auto flex flex-wrap bg-white-600 mx-auto rounded-3xl overflow-clip bg-transparent'>
        <div className={itemsCss}>
          <a href='#'>Home</a>
        </div>
        <div className={itemsCss}>
          <a href='#'>Terms & Conditions</a>
        </div>
        <div className={itemsCss}>
          <a href='#'>Privacy & Policy</a>
        </div>
        <div className={itemsCss}>
          <a href='#'>About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
