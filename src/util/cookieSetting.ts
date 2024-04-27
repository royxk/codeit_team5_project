import { destroyCookie, setCookie } from "nookies";

export function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function checkCookie(name: string) {
  if (typeof window === "undefined") {
    return undefined;
  }
  const cookies = document.cookie.split(";");
  const cookieName = `${name}=`;
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(cookieName) === 0) {
      return true;
    }
  }
  return false;
}

export function setAccessTokenCookie(data: string) {
  setCookie(null, "accessToken", data, {
    maxAge: 60 * 60,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
}
export function setUserIdCookie(data: string) {
  setCookie(null, "uid", data, {
    maxAge: 60 * 60,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
}
export function setShopIdCookie(data: string) {
  setCookie(null, "sid", data, {
    maxAge: 60 * 60,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
}

export function deleteCookie(name: string) {
  destroyCookie(null, name, { path: "/" });
}
