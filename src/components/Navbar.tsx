import { NavbarProps } from "../types/type";

function Navbar({ activeTab, setActiveTab, onAddLocationClick }: NavbarProps) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="public/navigator.svg"
            alt="navigator"
            width={30}
            height={30}
          />
          <h1 className="text-xl font-bold">locateX</h1>
        </div>

        <div>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            My Locations
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
