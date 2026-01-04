import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export const POST = async (req: NextRequest) => {
  try {
    const event = await verifyWebhook(req);
    const userData = event.data;
    const newUser = await prisma.user.upsert({
      where: {
        clerkId: userData.id,
      },
      update: {
        email: userData.email,
        name: userData.fullName,
      },
      create: {
        clerkId: userData.id,
        email: userData.email,
        name: userData.fullName,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
};
