"use server"

import { UpdateUserCurrencySchema } from "@/schema/userSetting"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";


export async function UpdateUserCurrency(currency: string) {
  const parsedBody = UpdateUserCurrencySchema.safeParse({ currency })

  if(!parsedBody.success){
    throw parsedBody.error
  }

  const { userId } = auth();
  if(!userId) {
    redirect("/sign-in")
  }

  const userSettings = await prisma.userSettings.update({
    where : {
      userId,
    },
    data: {
      currency
    },
  });

  return userSettings;
}
