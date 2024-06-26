import { GetFormatterForCurrency } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request:Request) {
  const { userId } = auth();
  if(!userId) redirect("/sign-in");

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewQuerySchema.safeParse({from, to});

  if(!queryParams.success) {
    return Response.json(queryParams.error.message, { status: 400 })
  }

  const transactions = await getTransactionsHistory(userId, queryParams.data.from, queryParams.data.to);

  return Response.json(transactions);
}

export type GetTransactionsHistoryResponseType = Awaited<ReturnType<typeof getTransactionsHistory>>;

async function getTransactionsHistory(userId: string, from: Date, to: Date){
  const userSetting = await prisma.userSettings.findUnique({
    where: {
      userId
    }
  });

  if(!userSetting) { 
    throw new Error("User settings not found");
  }

  const formatter = GetFormatterForCurrency(userSetting.currency);
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions.map((transaction) => {
    return {
      ...transaction,
      amount: formatter.format(transaction.amount),
    };
  });
}
