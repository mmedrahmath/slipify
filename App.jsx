import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Home />
    </div>
  );
}
