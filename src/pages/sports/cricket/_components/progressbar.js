
import React from 'react'
function getColor(percent){


}
function progressbar({progress}) {
    let radicalProgress = <div class="radial-progress" style={`--value:${progress.percent};`} role="progressbar">{progress.percent}%</div>
    let progressBar = <progress class="progress progress-[##FFFF00] w-full" value={progress.percent} role="progressbar" max="100"></progress>

  return progress.radical ? radicalProgress : progressBar
}

export default progressbar