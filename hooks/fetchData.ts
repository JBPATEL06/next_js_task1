export async function fetchData(page: number = 1, query: string = "") {
  try {
    const url = query.trim()
      ? `http://localhost:5000/search?q=${encodeURIComponent(query)}&page=${page}`
      : `http://localhost:5000/users?page=${page}`;

    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error("fetchData error:", err);
    return [];
  }
}