// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware(async (auth, req) => {
//   if (req.nextUrl.pathname.startsWith("/api/webhooks/clerk")) {
//     return;
//   }

//   const session = await auth();

//   if (!session.userId) {
//     return session.redirectToSignIn();
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!api/webhooks/clerk|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/api/webhooks/clerk")) {
    return;
  }

  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    "/((?!_next|api/webhooks/clerk|.*\\.(?:css|js|png|jpg|jpeg|svg|ico|woff2?)).*)",
  ],
};
