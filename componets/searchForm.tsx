import React from 'react'

export default async function SearchForm() {

  async function search(formData:FormData) {
    "use server"
  }
  return (
    <> 
     <form action={search}></form>
    <input type="search" name="search" id="search" />
    <button type="submit">search</button></>
  )
}

