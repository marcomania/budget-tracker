import prisma from '@/lib/prisma';
import { OverviewQuerySchema } from '@/schema/overview';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { userId } = auth();

  if(!userId) redirect("/sign-in");

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from")
  const to = searchParams.get("to")

  const queryParams = OverviewQuerySchema.safeParse({from, to})
  if(!queryParams.success) {
    return Response.json(queryParams.error.message, { status: 400})
  }

  const stats = await getCategoriesStats(userId, queryParams.data.from, queryParams.data.to);

  return Response.json(stats);
}

export type GetCategoriesStatsResponseType = Awaited< ReturnType <typeof getCategoriesStats>>;

async function getCategoriesStats(userId: string, from: Date , to: Date ){
  const totals = await prisma.transaction.groupBy({
    by: ["type", "category", "categoryIcon"],
    where: {
      userId, 
      date: { gte: from, lte: to}
    },
    _sum: {
      amount: true
    },
    orderBy: {
      _sum: { amount: "desc"}
    }
  })

  return totals;
}