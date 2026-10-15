import { NextResponse } from "next/server";
import {
  leadSchema,
  mailConfigured,
  rateLimit,
  validateAttachment,
} from "@/lib/leads";
import { saveInquiry, deliverInquiry } from "@/cms/inquiries";
import { plannedSource } from "@/cms/news";
import { recordEvent } from "@/lib/events";
import { sameOrigin } from "@/lib/request-origin";
import { PayloadTooLargeError, readLimitedBody } from "@/lib/request-body";
import { pages } from "@/lib/sitemap";
export const runtime = "nodejs";
const maxBody = 51 * 1024 * 1024;
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Please send your request from this website." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data"))
    return NextResponse.json(
      { error: "Use the quote form to send your request." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length") || 0) > maxBody)
    return NextResponse.json(
      { error: "Your upload is too large. Maximum file size is 5 MB." },
      { status: 413 },
    );
  try {
    const bytes = await readLimitedBody(request, maxBody);
    const form = await new Response(new Uint8Array(bytes), {
      headers: { "content-type": request.headers.get("content-type")! },
    }).formData();
    const elapsed = Date.now() - Number(form.get("startedAt"));
    if (
      form.get("website") ||
      !Number.isFinite(elapsed) ||
      elapsed < 3000 ||
      elapsed > 86400000
    )
      return NextResponse.json(
        { error: "Please complete the form and try again." },
        { status: 400 },
      );
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (secret) {
      const token = String(form.get("cf-turnstile-response") || "");
      const verification = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: new URLSearchParams({ secret, response: token }),
          signal: AbortSignal.timeout(10000),
        },
      ).then((r) => r.json());
      if (
        !verification.success ||
        verification.action !== "inquiry" ||
        verification.hostname !==
          new URL(process.env.APP_ORIGIN || request.url).hostname
      )
        return NextResponse.json(
          { error: "Please retry the verification." },
          { status: 400 },
        );
    } else if (process.env.NODE_ENV === "production")
      return NextResponse.json(
        {
          error:
            "Please contact sales@fhsfiltration.com while verification is unavailable.",
        },
        { status: 503 },
      );
    const result = leadSchema.safeParse(Object.fromEntries(form.entries()));
    if (!result.success)
      return NextResponse.json(
        {
          error: "Please check the highlighted fields.",
          fields: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    if (!(await plannedSource(result.data.sourcePage)))
      return NextResponse.json(
        { error: "The source page is invalid. Reload the quote form." },
        { status: 400 },
      );
    const attachment = [];
    const files = form
      .getAll("attachment")
      .filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > 5)
      return NextResponse.json(
        {
          error: "Choose at most 5 files.",
          fields: { attachment: ["Choose at most 5 files."] },
        },
        { status: 400 },
      );
    for (const file of files) {
      try {
        attachment.push(
          validateAttachment(
            file.name,
            file.type,
            Buffer.from(await file.arrayBuffer()),
          ),
        );
      } catch (error) {
        return NextResponse.json(
          {
            error: (error as Error).message,
            fields: { attachment: [(error as Error).message] },
          },
          { status: 400 },
        );
      }
    }
    if (!mailConfigured())
      return NextResponse.json(
        {
          error:
            "Quote delivery is not configured yet. Your request has not been sent. Please try again when the site is ready.",
        },
        { status: 503 },
      );
    const ip =
      process.env.TRUST_PROXY === "true"
        ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
          "unknown"
        : "untrusted-local";
    if (
      !(await rateLimit(`email:${result.data.email.toLowerCase()}`)) ||
      (ip && !(await rateLimit(`ip:${ip}`)))
    )
      return NextResponse.json(
        { error: "Too many requests. Please try again in one hour." },
        { status: 429, headers: { "Retry-After": "3600" } },
      );
    const page = pages.find((p) => p.path === result.data.sourcePage);
    if (page) {
      result.data.page_id = page.id;
      result.data.template = page.template;
      result.data.customer_type =
        page.template === "T6"
          ? page.id === "distributors"
            ? "distributor"
            : "integrator"
          : "";
    }
    const lead = await saveInquiry(result.data, attachment);
    await recordEvent("quote_submit", result.data.sourcePage).catch(() =>
      console.error("Quote event unavailable:", lead.id),
    );
    try {
      await deliverInquiry(lead, attachment);
    } catch {
      console.error("Quote email pending; persisted request:", lead.id);
    }
    return NextResponse.json({ ok: true, requestId: lead.reference });
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError")
      return NextResponse.json(
        {
          error:
            "An attachment could not be read. Check the file and try again.",
          fields: { attachment: ["Choose a valid, readable file."] },
        },
        { status: 400 },
      );
    if (error instanceof PayloadTooLargeError)
      return NextResponse.json(
        { error: "Your upload is too large. Maximum file size is 5 MB." },
        { status: 413 },
      );
    return NextResponse.json(
      { error: "We could not save your request. Please try again." },
      { status: 500 },
    );
  }
}
