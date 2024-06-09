import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


export async function GET(request:Request) {
  const { userId } = auth();
  if(!userId) redirect("/sign-in");

  const periods = await getHistoryPeriods(userId);

  return Response.json(periods);
}

export type GetHistoryPeriodsResponseType = Awaited< ReturnType <typeof getHistoryPeriods>>;
async function getHistoryPeriods(userId: string) {
  const historyPeriods = await prisma.monthHistory.findMany({
    where: {
      userId,
    },
    select: {
      year: true,
    },
    distinct: ["year"],
    orderBy: [
      { year: "desc", },
    ],
  });

  const years = historyPeriods.map(period => period.year);
  if(years.length === 0) {
    return [new Date().getFullYear()];
  }

  return years;
}