"use server";

export async function search(formData: FormData) {
  const query = formData.get("search");
  const res = fetch("${BASE_URL}/findOneUser/${encodeURIComponent(email)}")
  return res;
}
