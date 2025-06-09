// /app/api/data/route.ts
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get("table");
  const page = parseInt(searchParams.get("page") || "1", 10);

  if (!table || !["conversations", "messages", "summary", "faqs", "students"].includes(table)) {
    return Response.json({ error: "Tabla inválida" }, { status: 400 });
  }

  const skip = (page - 1) * PAGE_SIZE;

  try {
    if (table === "conversations") {
      const results = await prisma.conversations.findMany({
        orderBy: { created_at: "desc" },
        skip,
        take: PAGE_SIZE,
      });

      //console.log("Conversations results:", results);
      return Response.json(results);
    } else if (table === "messages") {
      const results = await prisma.messages.findMany({
        orderBy: { timestamp: "desc" },
        skip,
        take: PAGE_SIZE,
      });

      //console.log("Messages results:", results);
      return Response.json(results);
    } else if (table === "summary") {
      const results = await prisma.n8n_chatbot_summary.findMany({
        skip,
        take: PAGE_SIZE,
      });

      //console.log("Summary results:", results);
      return Response.json(results);
    } else if (table === "faqs") {
      const results = await prisma.n8n_faq_list.findMany({
        select: {
          original_question: true,
          variants: true,
          response: true,
          category: true,
          context: true,
        },
        skip,
        take: PAGE_SIZE,
      });

      //console.log("FAQs results:", results);
      return Response.json(results);
    } else if (table === "students") {
      const results = await prisma.n8n_students.findMany({
        skip,
        take: PAGE_SIZE,
      });

      //console.log("Students results:", results);
      return Response.json(results);
    }


    //return Response.json(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
