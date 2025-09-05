import axios, { AxiosInstance } from "axios";

export const apiClient:AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

//노션에 적힌대로 일단 작성
//추후 수정 필요

const API = "http://localhost:8080";

export async function fetchJSON(path: string, init?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    credentials: "include", // ✅ 항상 쿠키 포함
    ...init,
  });
  if (res.ok) return res.json();
  throw new Error(`HTTP ${res.status}`);
}

export async function authedFetchJSON(path: string, init?: RequestInit) {
  const doFetch = () =>
    fetch(`${API}${path}`, { credentials: "include", ...init });

  let res = await doFetch();
  if (res.status === 401) {
    const fr = await fetch(`${API}/kakao/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (fr.ok) {
      res = await doFetch(); // 재시도
    } else {
      window.location.href = "/login"; // refresh 실패 → 로그인 페이지로
      return;
    }
  }

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.headers.get("content-type")?.includes("json")
    ? res.json()
    : res.text();
}
