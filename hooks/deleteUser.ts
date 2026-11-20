import { BASE_URL } from "./editUser";

export function deleteUser(email: string) {
  return fetch(`${BASE_URL}/deleteUser/${encodeURIComponent(email)}`, {
    method: "DELETE",
  });
}
