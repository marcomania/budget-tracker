"use server"

import { UpdateUserCurrencySchema } from "@/schema/userSetting"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { CreateCategorySchema, CreateCategorySchemaType, DeleteCategorySchema, DeleteCategorySchemaType } from "@/schema/categories";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";

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

  if(!parsedBody.success) throw new Error(parsedBody.error.message);

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

export async function DeleteCategory(form: DeleteCategorySchemaType) {
  const parsedBody = DeleteCategorySchema.safeParse(form)

  if(!parsedBody.success) throw new Error(parsedBody.error.message);

  const { userId } = auth();
  if(!userId) {
    redirect("/sign-in")
  }

  const categories = await prisma.category.delete({
    where: {
      name_userId_type: {
        userId: userId,
        name: parsedBody.data.name,
        type: parsedBody.data.type,
      },
    },
  });

  return categories;
}

export async function CreateTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);
  if(!parsedBody.success) throw new Error(parsedBody.error.message);

  const { userId } = auth();
  if(!userId) {
    redirect("/sign-in")
  }

  const { amount, category, date, description, type } = parsedBody.data;
  const categoryRow = await prisma.category.findFirst({
    where: {
      userId,
      name: category
    }
  });

  if(!categoryRow) throw new Error("category not found");
  
  await prisma.$transaction([
    prisma.transaction.create({
      data: { 
        userId, 
        amount, 
        date, 
        description: description || "",
        type,
        category: categoryRow.name,
        categoryIcon: categoryRow.icon
      }
    }),

    prisma.monthHistory.upsert({
      where: {
        day_month_year_userId: {
          userId,
          day: date.getUTCDay(),
          month: date.getUTCMonth(),
          year: date.getFullYear()
        }
      },
      create: {
        userId,
        day: date.getUTCDay(),
        month: date.getUTCMonth(),
        year: date.getFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0, 
        },
        income: {
          increment: type === "income" ? amount : 0, 
        },
      }
    }),

    prisma.yearHistory.upsert({
      where: {
        month_year_userId: {
          userId,
          month: date.getUTCMonth(),
          year: date.getFullYear()
        }
      },
      create: {
        userId,
        month: date.getUTCMonth(),
        year: date.getFullYear(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0, 
        },
        income: {
          increment: type === "income" ? amount : 0, 
        },
      }
    })
  ])
}