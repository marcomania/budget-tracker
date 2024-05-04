import React from 'react'
import Navbar from './_components/Navbar'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='relative flex h-screen w-full flex-col'>
        <div className="w-full ">
            <Navbar/>
            <div className="w-full">{children}</div>
        </div>
    </div>
  ) 
}

export default layout