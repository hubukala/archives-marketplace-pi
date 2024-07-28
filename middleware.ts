import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (request.nextUrl.pathname.startsWith("/account")) {
        if (!token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}
