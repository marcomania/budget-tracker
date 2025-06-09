"use client"

import { ThemeProvider } from 'next-themes'
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '../ui/sonner'
import { toast } from 'sonner'

// ...

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast('My first toast')}>
        Give me a toast
      </button>
    </div>
  )
}

const RootProviders = ({children} : {children: ReactNode}) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          <Toaster richColors position='bottom-right'/>
          {children}
      </ThemeProvider>
      {/** <ReactQueryDevtools initialIsOpen={false} /> **/}
    </QueryClientProvider>
  )
}

export default RootProviders