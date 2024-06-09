import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { HistoryDataSchema } from "@/schema/history";
import { HistoryData, Period, Timeframe } from "@/lib/types";
import prisma from "@/lib/prisma";
import { getDaysInMonth, getMonth } from "date-fns";

export async function GET(request:Request) {
  const { userId } = auth();
  if(!userId) redirect("/sign-in");

  const { searchParams } = new URL(request.url);

  const timeframe = searchParams.get("timeframe");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const queryParams = HistoryDataSchema.safeParse({timeframe,year,month })
  if(!queryParams.success){
    return Response.json(queryParams.error.message, { status: 400 })
  }

  const data = await getHistoryData(userId, queryParams.data.timeframe, { month: queryParams.data.month, year: queryParams.data.year } )

  return Response.json(data);
}
export type GetHistoryDataResponseType = Awaited< ReturnType <typeof getHistoryData>>;
async function getHistoryData(userId:string, timeframe: Timeframe, period: Period ) {
  switch (timeframe) {
    case "year":
      return await getYearHistoryData(userId, period.year);
    case "month":
      return await getMonthHistoryData(userId, period.year, period.month);
  }
}

async function getYearHistoryData(userId:string , year:number) {
  const result = await prisma.yearHistory.groupBy({
    by: ["month"],
    where: {
      userId,
      year,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: {
      month: "asc",
    },
  });

  if(!result || result.length===0) return [];

  const history:HistoryData[] = [];
  for (let index = 0; index < 12; index++) {
    let expense = 0;
    let income = 0;
    
    const month = result.find((item) => item.month === index);
    if(month) {
      expense = month._sum.expense || 0;
      income = month._sum.income || 0;
    }
    history.push({year, month: index, expense, income})
    
  }

  return history;
}

async function getMonthHistoryData(userId:string, year:number, month:number) {
  const result = await prisma.monthHistory.groupBy({
    by: ["day"],
    where: {
      userId,
      year,
      month,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: {
      day: "asc",
    },
  });

  if(!result || result.length === 0) return [];

  const history:HistoryData[] = [];
  const daysInMonth = getDaysInMonth(new Date(year,month))

  for(let index = 1; index < daysInMonth; index++) {
    let expense = 0;
    let income = 0;

    const day = result.find((item) => item.day === index);
    if(day) {
      expense = day._sum.expense || 0;
      income = day._sum.income || 0;
    }
    history.push({year, month, day: index, expense, income})
  }

  return history;
}

