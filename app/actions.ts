"use server";

export async function search(formData: FormData) {
  const query = formData.get("search");
  console.log("Search query:", query);
}
