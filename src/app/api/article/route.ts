import prisma from "../../../../lib/prisma";

export const POST = async (req: Request) => {
  try {
    const { question, options, answer, articleId } = await req.json();
    const create = await prisma.quiz.create({
      data: {
        question: question,
        options: options,
        answer: answer,
        articleId: articleId,
      },
    });
    return Response.json(create);
  } catch (err) {
    console.error(err);
    return Response.json({ err: "server error" }, { status: 500 });
  }
};
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");
  if (!articleId) {
    return new Response(JSON.stringify({ err: "articleId is required" }), {
      status: 400,
    });
  }
  const getQuizzes = await prisma.article.findMany({
    where: { id: articleId },
  });
  return Response.json(getQuizzes, { status: 200 });
};

// try {
//   const event = await verifyWebhook(req);
//   if (event.type === "user.created") {
//     const user = event.data;
//     await prisma.user.create({
//       data: {
//         clerkId: user.id,
//         email: user.email_addresses?.[0]?.email_address ?? "",
//         name: user.first_name ?? "",
//       },
//     });
//   }
//   return NextResponse.json({ ok: true });
// } catch (err) {
//   console.log(err, "psda zailoo alaa har gichii min pyzda lalar");
//   return NextResponse.json(
//     { err: "psda zail2 gichii zail psda" },
//     { status: 500 }
//   );
// }const
