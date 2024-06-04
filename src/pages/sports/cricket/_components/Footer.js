import React from 'react'
function FooterSection() {
    const config = {
        heading: "Quick Links",
        data: [
            { anchorText: "Privacy & Policy" },
            { anchorText: "Terms & Conditions" },
            { anchorText: "About Us" }
        ]
    };

    return (
        <div className='flex grid-flow-col bg-cyan-300'>
        <div>
        <center>
        <h1>{config.heading}</h1>
        </center>
        </div>
        <div className='flex'>
        {config.data.map((element, index) => {
            return (
                <div key={index} className='col-span-1'>
                    {element.anchorText}
                </div>
            );
        })}
        </div>
        </div>
    );
}

function Footer() {
  return (
    <div className='w-full p-4'>
    <div className='grid grid-rows-10'>
    <div className='grid row-span-[80%] bg-cyan-300'>
    {FooterSection()}
    </div>
    <div className='row-span-[20%] bg-red-300'>
    Fourth
    </div>
    </div>
    </div>
  )
}

export default Footer