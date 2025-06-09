"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QueryData {
  year: number;
  month: number;
  category: string;
  query_count: number;
}

interface QueryChartProps {
  data: QueryData[];
}

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F43F5E",
  "#84CC16",
];

export function QueryChart({ data }: QueryChartProps) {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");

  const years = Array.from(
    new Set(
      data.map((d) => d.year).filter((y): y is number => typeof y === "number")
    )
  );

  const months = Array.from(
    new Set(
      data.map((d) => d.month).filter((m): m is number => typeof m === "number")
    )
  );

  const filteredData = data.filter(
    (d) =>
      (selectedYear === "all" || d.year === selectedYear) &&
      (selectedMonth === "all" || d.month === selectedMonth)
  );

  const categories = Array.from(new Set(filteredData.map((d) => d.category)));
  const colorMap: Record<string, string> = {};
  categories.forEach((cat, i) => {
    colorMap[cat] = COLORS[i % COLORS.length];
  });

  const chartData = categories.map((category) => {
    const total = filteredData
      .filter((d) => d.category === category)
      .reduce((sum, d) => sum + d.query_count, 0);

    return { category, query_count: total };
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-muted-foreground">Año</label>
          <Select
            onValueChange={(val) =>
              setSelectedYear(val === "all" ? "all" : parseInt(val))
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue
                placeholder={
                  selectedYear === "all" ? "Todos" : selectedYear.toString()
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm text-muted-foreground">Mes</label>
          <Select
            onValueChange={(val) =>
              setSelectedMonth(val === "all" ? "all" : parseInt(val))
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue
                placeholder={
                  selectedMonth === "all" ? "Todos" : selectedMonth.toString()
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {months.map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="query_count">
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.category}`}
                  fill={colorMap[entry.category]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
