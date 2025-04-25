import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface ChartComponentProps {
  data: any[];
  selectedColumns: string[];
}

export default function ChartComponent({
  data,
  selectedColumns,
}: ChartComponentProps) {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Data Visualization</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Name" />
        <YAxis />
        <Tooltip />
        {selectedColumns.map(
          (col) =>
            col !== "Name" && (
              <Bar
                key={col}
                dataKey={col}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            )
        )}
      </BarChart>
    </div>
  );
}