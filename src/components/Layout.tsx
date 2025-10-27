import React from 'react'

const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className="p-6 md:p-8 lg:p-10 min-h-screen">
      <div className="max-w-10xl mx-auto">{children}</div>
    </main>
  )
}

export default Layout
