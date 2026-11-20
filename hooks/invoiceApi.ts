export const BASE_URL = "http://localhost:5000";

export type InvoiceType = {
  _id: string;
  username: string;
  email: string;
  phone: string;
  weight: number;
  price: number;
  total: number;
  createdAt?: string;
  updatedAt?: string;
};

export async function fetchInvoices(page: number = 1, query: string = ""): Promise<InvoiceType[]> {
  try {
    const url = query.trim()
      ? `${BASE_URL}/searchInvoices?q=${encodeURIComponent(query)}&page=${page}`
      : `${BASE_URL}/invoices?page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("fetchInvoices error:", err);
    return [];
  }
}

export async function addInvoice(invoiceData: {
  username: string;
  email: string;
  phone: string;
  weight: number;
  price: number;
}) {
  return fetch(`${BASE_URL}/createInvoice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoiceData),
  });
}

export async function editInvoice(
  id: string,
  invoiceData: {
    username?: string;
    phone?: string;
    weight?: number;
    price?: number;
  }
) {
  return fetch(`${BASE_URL}/updateInvoice/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoiceData),
  });
}

export async function deleteInvoice(id: string) {
  return fetch(`${BASE_URL}/deleteInvoice/${id}`, {
    method: "DELETE",
  });
}
