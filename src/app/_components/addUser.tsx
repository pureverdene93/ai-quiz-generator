// "use client";
// import { useUser } from "@clerk/nextjs";
// import { useEffect } from "react";

// export const AddUser = () => {
//   const { user } = useUser();
//   const newUser = async () => {
//     try {
//       await fetch("api/webhooks/clerk", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           clerkId: user?.id,
//           email: user?.emailAddresses[0].emailAddress,
//           name: user?.fullName,
//         }),
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     newUser();
//   }, [user]);
//   return <div></div>;
// };
