import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(request:Request) {

  const { userId } = auth();
  //const user = await currentUser();
  if(!userId) redirect("/sign-in");


  let userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: userId,
    }
  });

  if(!userSettings) {
    userSettings = await prisma.userSettings.create({
      data: {
        userId: userId,
        currency: "USD",
      },
    });
  }

  revalidatePath("/")
  return Response.json(userSettings)
}