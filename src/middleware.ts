// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware(async (auth) => {
//   const session = await auth();

//   if (!session.userId) {
//     return session.redirectToSignIn();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  // ✅ webhook route-ийг алгасна
  if (req.nextUrl.pathname.startsWith("/api/webhooks/clerk")) {
    return;
  }

  const session = await auth();

  if (!session.userId) {
    return session.redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // ❗ webhook route-ийг эндээс бас хасна
    "/((?!api/webhooks/clerk|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
