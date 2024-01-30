import React from 'react'
import CustomDrawer from "./CustomDrawer";


export default function UsersPage() {
  return (
    <div className="absolute top-0 left-0 overflow-y-hidden w-screen min-h-screen flex justify-center bg-yellow-100">
        header0
    <div className="fixed top-6 left-12 h-[20px] w-[30px] max-md:left-6 max-md:top-3">
        <CustomDrawer />
    </div>
    <div className="h-[auto] w-[800px]  mt-12">
        header3
      <div className="w-[auto] h-[100px] flex flex-col justify-between">
        header4
        <div className="ml-2">
            header5
        </div>
        <div className="flex items-center ml-5 mb-5">
            header6
          <p className="text-lg text-center ml-2">header7</p>
        </div>
      </div>
    </div>
  </div>
  )
}
