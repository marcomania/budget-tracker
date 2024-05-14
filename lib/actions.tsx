"use server"

import { UpdateUserCurrencySchema } from "@/schema/userSetting"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/categories";
import { parse } from "path";


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

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form)

  if(!parsedBody.success) throw new Error("bad request");

  const { userId } = auth();
  if(!userId) {
    redirect("/sign-in")
  }

  const { name, icon, type } = parsedBody.data;

  return await prisma.category.create({
    data: {
      userId, name, icon, type,
    }
  });
}
