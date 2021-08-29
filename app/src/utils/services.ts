import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export async function authUser(payload: { email: string; password: string }) {
  return api.post("/auth", payload).then((res) => res.data);
}

export async function transfer(payload: {
  assetId: string;
  amount: number | "";
  to: string;
}) {
  const token = localStorage.getItem("token");
  if (!token) {
    // TODO: check isValidToken() here
    window.location.href = "/unlock";
  }
  return api
    .post("/send", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
