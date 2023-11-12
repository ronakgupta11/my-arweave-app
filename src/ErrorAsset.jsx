import React from 'react'

function ErrorAsset() {
  return (
    <div className='flex flex-col w-full mt-24 items-center justify-center space-y-4'>
        <p className='font-bold text-4xl'>404</p>
        <p className='text-xl color-gray-700'>
            No Asset found For Given Transaction Id
        </p>
    </div>
  )
}

export default ErrorAsset