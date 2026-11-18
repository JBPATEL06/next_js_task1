'use client'
import React, { useState } from 'react'

export default function AddUserBtn() {
    const [isOpen,setFormStatus] = useState(false)
    const [formData,setFormData] = useState({})
  return (
   <>
   <button className="" onClick={()=> {setFormStatus(true)}}>Add</button>
    {isOpen && (
        <div>
        <div>form Open</div>
        <form action=""></form>
        <button onClick={()=> setFormStatus(false)}>closeForm</button>
        
        </div>
    )}

   </>
  )
}
