export async function fetchData() {  
    return fetch("http://localhost:5000/users")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err))

}