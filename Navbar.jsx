export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-red-500">Sliply</h1>
      <input
        type="text"
        placeholder="Search..."
        className="border px-4 py-2 rounded-full w-1/2"
      />
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    </nav>
  );
}
