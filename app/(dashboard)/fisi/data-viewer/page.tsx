// app/admin/data-viewer/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TABLES = ["conversations", "messages", "summary", "faqs", "students"];

export default function DataViewerPage() {
  const [table, setTable] = useState<string>("conversations");
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [table, page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/n8n?table=${table}&page=${page}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error al cargar datos", err);
    } finally {
      setLoading(false);
    }
  };

  const renderRow = (row: any, idx: number) => (
    <tr key={idx} className="border-b border-muted/30">
      {Object.entries(row).map(([key, value]) => (
        <td
          key={key}
          className="px-2 py-1 text-sm text-gray-800 dark:text-gray-100 max-w-[200px] truncate"
          title={String(value)}
        >
          {String(value)}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-[#3f6cb5] dark:text-[#5f8de0]">
        Visor de Datos
      </h1>

      <div className="mb-4">
        <Select
          value={table}
          onValueChange={(val) => {
            setTable(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Selecciona una tabla" />
          </SelectTrigger>
          <SelectContent>
            {TABLES.map((tbl) => (
              <SelectItem key={tbl} value={tbl}>
                {tbl}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="rounded-2xl shadow p-4 overflow-auto">
        {loading ? (
          <p className="text-center text-muted-foreground">Cargando...</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-[#3f6cb5] dark:bg-[#274a8d] text-white">
                {data[0] &&
                  Object.keys(data[0]).map((col) => (
                    <th
                      key={col}
                      className="px-2 py-1 font-medium whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>{data.map(renderRow)}</tbody>
          </table>
        )}
      </Card>

      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span className="text-muted-foreground">Página {page}</span>
        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
