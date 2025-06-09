import React from 'react'
import Navbar from './_components/Navbar'
import ChatWidget from './_components/ChatWidget'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='relative flex h-screen w-full flex-col'>
      <Navbar/>
      <div className="w-full md:overflow-y-auto">{children}</div>
      <ChatWidget />
    </div>
  ) 
}

export default layout