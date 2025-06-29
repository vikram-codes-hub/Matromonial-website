import React from 'react'

const Title = ({Title1,Title2}) => {
  return (
    <div className="inline-flex gap-2  items-center mb-3">
      <p className="text-gray-500">{Title1} <span className='text-gray-700 font-medium'>{Title2}</span></p>
       <p className='w-8 sm:w-12 h-[1px] sm:h[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title
