// import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  const { clerkId, email, name } = await req.json();
  try {
    const create = await prisma.user.upsert({
      where: {
        clerkId: clerkId,
      },
      update: {
        email: email,
        name: name,
      },
      create: {
        clerkId: clerkId,
        email: email,
        name: name,
      },
    });
    return NextResponse.json({ create }, { status: 200 });
  } catch (err) {
    console.log(err, "error from server");
    return NextResponse.json(
      { err: "server error" },
      {
        status: 500,
      }
    );
  }
};
// export const GET = async (req: NextRequest) => {
//   const { userId: clerkId } = auth();
//   if (!clerkId) {
//     return NextResponse.json("cant find clerk id");
//   }
//   const user = await prisma.user.findUnique({
//     where: {
//       clerkId,
//     },
//     select: { id: true },
//   });
//   return NextResponse.json({ userId: user?.id });
// };
