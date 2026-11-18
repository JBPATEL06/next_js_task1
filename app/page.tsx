import Image from "next/image";

export default function Home() {
  "use client"
  async function search(formData:FormData) {
    
  }
  return (
    <>
    <form action={search}></form>
    <input type="search" name="search" id="search" />
    <button type="submit">search</button>
    </>
  );
}
