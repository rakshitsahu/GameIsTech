import React from 'react'
const colorMap = {
    darkRed : 'text-[#ff0000]',
    lightRed : 'text-[#ff5252]',
    darkGreen : 'text-[#4ae54a]',
    lightGreen : 'text-[#a4fba6]',
    darkYellow : 'text-[#f8ed62]',
    lightYellow : 'text-[#fff9ae]',
    darkOrange : 'text-[#f48020]',
    lightOrange:  'text-[#f09537]'

}
function getColor(value) {
    if (value > 95) {
        return colorMap.darkGreen;
    } else if (value > 90) {
        return colorMap.lightGreen;
    } else if (value > 85) {
        return colorMap.darkYellow ;
    } else if (value > 80) {
        return colorMap.lightYellow;
    } else if (value > 75) {
        return colorMap.lightOrange ;
    } else if (value > 70) {
        return colorMap.darkOrange;
    } else if (value >= 50) {
        return colorMap.lightRed;
    } else {
        return colorMap.darkRed;
    }
}
function RadicalProgressComp({value , text , radius}) {
    const color = getColor(value)
  return (
    <div className={`radial-progress progress  stroke-orange-400 ${color}
     text-center`} style={{"--value":value,"--size": `${radius}rem`
    , "--thickness": "0.4rem"}} role="progressbar">
    <font className="text-white font-semibold text-xs">{text}</font>
    </div>
  )
}

export default RadicalProgressComp