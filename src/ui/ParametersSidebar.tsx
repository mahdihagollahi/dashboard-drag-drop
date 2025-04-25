interface ParametersSidebarProps {
    parameters: string[];
    onDragStart: (e: React.DragEvent, param: string) => void;
  }
  
  export default function ParametersSidebar({
    parameters,
    onDragStart,
  }: ParametersSidebarProps) {
    return (
      <div
        className="w-64 bg-white p-4 rounded-lg shadow-md"
        onDragOver={(e) => e.preventDefault()}
      >
        <h2 className="text-lg font-semibold mb-4">Parameters</h2>
        {parameters.map((param) => (
          <div
            key={param}
            draggable
            onDragStart={(e) => onDragStart(e, param)}
            className="p-2 mb-2 bg-gray-50 rounded cursor-move hover:bg-gray-100 transition-colors"
          >
            {param}
          </div>
        ))}
      </div>
    );
  }