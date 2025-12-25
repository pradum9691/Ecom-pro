import React, { useState } from 'react'
import Login from '../pages/Login'
import Ragister from '../pages/Register'

const AuthLayout = () => {
    const [toggle, setToggle] = useState(true)
  return (
   <div className="h-screen w-full flex justify-center items-center">
      {toggle ? (
        <Login setToggle={setToggle} />
      ) : (
        <Ragister setToggle={setToggle} />
      )}
    </div>
  )
}

export default AuthLayout