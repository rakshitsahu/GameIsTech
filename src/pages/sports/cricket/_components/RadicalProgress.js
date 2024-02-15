import React, { useState } from 'react'
import styles from './RadicalProgress.module.css'
function RadicalProgress({radius , percentage}) {
  percentage = 10
  const innerRadius = 85
  const dashArray = innerRadius * Math.PI * 2;
  const [dashOffset , setDashOffset] = useState(dashArray - (dashArray * percentage) / 100)
  return (
    <div >
    <svg width={radius} height={radius} viewBox={`0 0 ${radius} ${radius}`}>
    
    <defs>
    
    <linearGradient id="gradient">
    
    <stop offset="10%" stopColor="#12c2e9" />
    <stop offset="50%" stopColor="#c471ed" />


    </linearGradient>
    </defs>

    <circle cx={radius/2} cy={radius/2} strokeWidth='15px' r={innerRadius}
    className={styles.circleBg}/>

    <circle cx={radius/2} cy={radius/2} strokeWidth='15px' r={innerRadius}
    className={styles.circleProgress} style={{strokeDasharray : dashArray , strokeDashoffset: dashOffset}}
    transform= {`rotate(-90 ${radius/2} ${radius/2} )`}
    stroke="url(#gradient)"
    />

    <text x="50%" y="50%" dy="0.3rem" textAnchor='middle' className='text-3xl' fill='url(#gradient)' > {`${percentage}%`} </text>

    </svg>
    </div>
  )
}

export default RadicalProgress