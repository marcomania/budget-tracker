import { z } from "zod";

export const HistoryDataSchema = z.object({
  timeframe: z.enum(["month","year"]),
  year: z.coerce.number().min(2000).max(2500).default(2024),
  month: z.coerce.number().min(0).max(11).default(0),
});
