import React from 'react'
import Image from 'next/image'
type userdata = {
    name :string,
    email:string,
    phoneNumber :number;
    image: string
}
export default function userData({name ,email,phoneNumber,image} : userdata) {
  return (
    <div>
        <span>{name}</span>
        <span>{email}</span>
        <span>{phoneNumber}</span>
        <Image src={image} height={500} width={500} alt={name}/>

    </div>

  )
}
