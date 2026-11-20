import { BASE_URL } from "./editUser"
export function deleteUser(email){
return fetch(`${BASE_URL}/deleteUser/${encodeURIComponent(email)}`,{
        method: "DELETE"
    })
}

