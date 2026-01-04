import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prisma";

export const GET = async () => {
  try {
    const session = await auth();
    const user = await prisma.user.findUnique({
      where: {
        clerkId: session.userId!,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(err, { status: 500 });
  }
};
