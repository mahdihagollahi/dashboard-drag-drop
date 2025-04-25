export default function NavigationBar() {
    return (
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex space-x-4">
            {["Home", "Reports", "Charts", "Settings"].map((item) => (
              <a
                key={item}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>
    );
  }