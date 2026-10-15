import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = process.env.PREVIEW_SECRET;
  const token = url.searchParams.get("token") || "";
  const localFixture =
    process.env.NODE_ENV === "development" &&
    ["localhost", "127.0.0.1"].includes(url.hostname) &&
    url.searchParams.get("fixture") === "1";
  if (
    !localFixture &&
    (!secret ||
      Buffer.byteLength(token) !== Buffer.byteLength(secret) ||
      !timingSafeEqual(Buffer.from(token), Buffer.from(secret)))
  )
    return new Response(null, { status: 404 });
  const path = localFixture
    ? "/products/cartridges/high-flow-filter-cartridges/?fixture=full"
    : url.searchParams.get("path") || "/";
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\"))
    return new Response(null, { status: 400 });
  (await draftMode()).enable();
  return NextResponse.redirect(new URL(path, url.origin));
}
