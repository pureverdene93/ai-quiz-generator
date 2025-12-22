import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
// import type { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  // const payload = await req.text();

  // console.log(payload, "payload");

  // const headers = req.headers;

  // console.log(headers, "headers");
  const event = await verifyWebhook(req);

  // const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
  // console.log(wh, "secret");

  // let event: WebhookEvent;

  // try {
  //   event = wh.verify(payload, {
  //     "svix-id": headers.get("svix-id") ?? "",
  //     "svix-timestamp": headers.get("svix-timestamp") ?? "",
  //     "svix-signature": headers.get("svix-signature") ?? "",
  //   }) as WebhookEvent;
  // } catch (err) {
  //   console.error("Webhook verification failed", err);
  //   return new NextResponse("Invalid signature", { status: 400 });
  // }
  // console.log(event, "event");

  if (event.type === "user.created") {
    const user = event.data;

    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.email_addresses?.[0]?.email_address ?? "",
        name: user.first_name ?? "",
      },
    });
  }

  return NextResponse.json({ ok: true });
}
