import { useState, useEffect } from 'react'

function ProgressBar({ value, max, label, className = '' }) {
  const [width, setWidth] = useState(0)
  
  useEffect(() => {
    // Animate the progress bar
    const timer = setTimeout(() => {
      setWidth((value / max) * 100)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [value, max])
  
  return (
    <div className={`w-full ${className}`}>
      {label && <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value}/{max}</span>
      </div>}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
