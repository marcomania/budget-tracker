import React from 'react'
import Navbar from './_components/Navbar'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='relative flex h-screen w-full flex-col'>
      <Navbar/>
      <div className="w-full md:overflow-y-auto">{children}</div>
    </div>
  ) 
}

export default layout