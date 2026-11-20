export async function adduser(data:FormData) {
      const res = await fetch("http://localhost:5000/createUser", {
        method: "POST",
        body: data,
      });
      return res;
    
}