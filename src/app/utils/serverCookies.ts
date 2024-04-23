import { cookies } from "next/headers";

export function getServerSideCookie(name: string): string | undefined {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  if (cookie) {
    return cookie.value;
  } else {
    return undefined;
  }
}
