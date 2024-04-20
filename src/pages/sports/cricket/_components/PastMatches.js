import React from 'react'
import styles from './PastMatches.module.css'
function BattingMatchesHistory(matchHistory){
  return (
    <div className="overflow-x-auto max-h-screen">
  <table className="table ">
    {/* head */}
    <thead className='bg-blue-600'>
      <tr className={`${styles.childrenFontThin}`}>
        <th  className=''>Vs Team</th>
        <th>Runs</th>
        <th>Balls</th>
        <th>Strike Rate</th>
        <th>Match Details</th>
      </tr>
    </thead>
    <tbody className=' text-white'>
      {
        matchHistory.map((match)=>{
            return <tr key={match} className='odd:bg-gray-900  even:bg-gray-800 border-b border-gray-700 text-lg'>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{match.OutBy}</div>
                  <div className="text-sm opacity-50">Team Name</div>
                </div>
              </div>
            </td>
            <td>
              {match.Runs}
              <br/>
              <span className="badge badge-ghost badge-sm">Wicket By {match.OutBy}</span>
            </td>
            <td>{match.Balls}</td>
            <td>{match.StrikeRate}</td>
            <th>
                 <font className="p-1 rounded-xl bg-blue-600"> CSK vs SRH</font>
            </th>
          </tr>
        })
      }

    </tbody>

    <tfoot className='font-thin'>
      The above table contains the previous matches batting stats of player
    </tfoot>
    
  </table>
</div>
  )
}

function BowlingMatchesHistory(matchHistory){
  return (
    <div className="overflow-x-auto max-h-screen w-full">
  <table className="table ">
    <thead className='bg-blue-600'>
      <tr className={`${styles.childrenFontThin}`}>
        <th className=''>Wickets</th>
        <th>Runs</th>
        <th>Economy</th>
        <th>Dots</th>
        <th>Overs</th>
        <th>Match Details</th>
      </tr>
    </thead>
    <tbody className=' text-white'>
      {
        matchHistory.map((match)=>{
            return <tr key={match} className='odd:bg-gray-900  even:bg-gray-800 border-b border-gray-700 text-lg'>
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">{match.Wickets}</div>
                </div>
              </div>
            </td>
            <td>
              {match.Runs}
            </td>
            <td>{match.Economy}</td>
            <td>{match.Dots}</td>
            <td>{match.Overs}</td>
            <th>
                 <font className="p-1 rounded-xl bg-blue-600"> CSK vs SRH</font>
            </th>
          </tr>
        })
      }

    </tbody>

    <tfoot className='font-thin'>
      The above table contains the previous matches bowling stats of player
    </tfoot>
    
  </table>
</div>
  )
}
function PastMatches({matchHistory, isBowling}) {
  return !isBowling? BattingMatchesHistory(matchHistory) : BowlingMatchesHistory(matchHistory)
}

export default PastMatches