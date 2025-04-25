

"use client"

import { useState } from "react";

import NavigationBar from "@/ui/NavigationBar";
import ParametersSidebar from "@/ui/ParametersSidebar";
import DataTable from "@/ui/DataTable";
import ChartComponent from "@/ui/ChartComponent";

interface DataItem {
  Name: string;
  Date: string;
  Value: number;
  [key: string]: any;
}

const initialData: DataItem[] = [
  { Name: "Item 1", Date: "2023-01-01", Value: 100 },
  { Name: "Item 2", Date: "2023-01-02", Value: 200 },
  { Name: "Item 3", Date: "2023-01-03", Value: 300 },
];

const parameters = ["New Value", "New Date", "Category", "Status"];

export default function Dashboard() {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "Name",
    "Date",
    "Value",
  ]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState<keyof DataItem>("Name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (property: keyof DataItem) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDragStart = (e: React.DragEvent, param: string) => {
    setDraggedItem(param);
    e.dataTransfer.setData("text/plain", param);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && !selectedColumns.includes(draggedItem)) {
      setSelectedColumns([...selectedColumns, draggedItem]);
      const newData = data.map((item) => ({
        ...item,
        [draggedItem]: `Sample ${draggedItem}`,
      }));
      setData(newData);
    }
    setDraggedItem(null);
  };

  const filteredData = data.filter((item) =>
    item.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = filteredData.slice().sort((a, b) => {
    const aValue = String(a[orderBy]).toLowerCase();
    const bValue = String(b[orderBy]).toLowerCase();
    return order === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />

      <div className="flex gap-4 p-4">
        <ParametersSidebar
          parameters={parameters}
          onDragStart={handleDragStart}
        />

        <div className="flex-1">
          <DataTable
            data={sortedData}
            selectedColumns={selectedColumns}
            orderBy={orderBy}
            order={order}
            onSort={handleSort}
            onDrop={handleDrop}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <ChartComponent data={filteredData} selectedColumns={selectedColumns} />
        </div>
      </div>
    </div>
  );
}