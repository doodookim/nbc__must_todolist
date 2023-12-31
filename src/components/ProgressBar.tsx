import React from 'react'

type ProgressBarType = {
  total: number,
  current: number,
}

function ProgressBar({ current, total }: ProgressBarType) {

  function calculateProgress(current: number, total: number) {
    if (total <= 0) {
      return 0; 
    }

    const progress = (current / total) * 100;
    return Math.min(100, Math.max(0, progress)).toFixed(2); 
  }

  return (
    <div className='progress'>
      <div className='content'>진행률 : {`${calculateProgress(current,total)}%`}</div>
      <div className='status-bar'>
        <div className='bar' style={{ width: `${calculateProgress(current,total)}%` }}></div>
      </div>
    </div>
  )
}

export default ProgressBar