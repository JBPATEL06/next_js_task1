export const BASE_URL = "http://localhost:5000";

export function editUser(email: string, userData: FormData) {
  return fetch(`${BASE_URL}/updateUser/${encodeURIComponent(email)}`, {
    method: "PUT",
    body: userData,
  });
}