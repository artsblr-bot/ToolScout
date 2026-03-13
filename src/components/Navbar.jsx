import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">ToolScout</span>
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</Link>
        </div>
      </div>
    </nav>
  );
}
