import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
  } from "@mui/material";
  
  interface DataTableProps {
    data: any[];
    selectedColumns: string[];
    orderBy: string;
    order: "asc" | "desc";
    onSort: (property: string) => void;
    onDrop: (e: React.DragEvent) => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
  }
  
  export default function DataTable({
    data,
    selectedColumns,
    orderBy,
    order,
    onSort,
    onDrop,
    searchQuery,
    onSearchChange,
  }: DataTableProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <div className="mb-4 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded w-64"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <TableContainer
            component={Paper}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            sx={{ maxHeight: 440, overflowX: "auto" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {selectedColumns.map((col) => (
                    <TableCell
                      key={col}
                      sortDirection={orderBy === col ? order : false}
                      sx={{
                        bgcolor: "grey.100",
                        fontWeight: "bold",
                        minWidth: 120,
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? order : "asc"}
                        onClick={() => onSort(col)}
                      >
                        {col}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
  
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {selectedColumns.map((col) => (
                      <TableCell key={col}>{item[col]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }