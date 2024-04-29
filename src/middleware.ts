import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const uid = request.cookies.get("uid");
  const sid = request.cookies.get("sid");
  const url = request.nextUrl.clone();

  // accessToken 값과 uid 값 둘 중 하나라도 없는 상태일 때
  // 그리고 로그인과 회원가입 페이지가 아닐 때
  // 페이지 이동 시 로그인 페이지로 이동
  if (
    (!accessToken || !uid) &&
    url.pathname !== "/signin" &&
    url.pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // accessToken이나 uid가 있는 상태일 때 로그인 페이지 혹은 회원가입 페이지 이동 시 메인 페이지로 이동
  if (accessToken && uid) {
    if (url.pathname === "/signup" || url.pathname === "/signin") {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  //사장으로 로그인 했을 때 알바관련 페이지 접근시 내 가게로 이동
  if (sid?.value === "" || sid?.value) {
    if (url.pathname.includes("employee")) {
      return NextResponse.redirect(new URL("/user/employer", request.url));
    }
  }

  //알바로 로그인 했을 때 사장님 관련 페이지 접근시 내 프로필로 이동
  if (!sid) {
    if (url.pathname.includes("employer")) {
      return NextResponse.redirect(new URL("/user/employee", request.url));
    }
  }
}

export const config = {
  matcher: ["/user/((?!noticeDetail/.*/.*|search).*)", "/signin", "/signup"],
};
