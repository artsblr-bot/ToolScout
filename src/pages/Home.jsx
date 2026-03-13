import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PromptChip from '../components/PromptChip';
import { ArrowRight, Search } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  const chips = [
    "A voice AI browser extension",
    "A mobile app for tracking habits",
    "A website for my small business"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-10 md:py-20 flex flex-col items-center justify-center text-center animate-fade-in-up">
      <div className="mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          The right tools for your project. <br className="hidden md:block" />
          <span className="text-primary italic pr-2">Instantly.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
          Describe what you want to build below. We'll use AI to analyze and return the best free tools, APIs, and resources for your stack.
        </p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-2xl relative mb-12 group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="w-6 h-6 text-gray-500 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe what you want to build..."
          className="w-full pl-14 pr-32 md:pr-40 py-5 bg-[#121212] border border-gray-800 rounded-2xl text-lg text-white placeholder-gray-500 shadow-2xl focus:outline-none focus:border-primary/50 focus:bg-[#161616] focus:ring-4 focus:ring-primary/10 transition-all"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute inset-y-2 right-2 px-4 md:px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <span className="hidden md:inline">Find Tools</span>
          <ArrowRight className="w-5 h-5 md:hidden" />
        </button>
      </form>

      <div className="flex flex-col items-center gap-4">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Try an example</span>
        <div className="flex flex-wrap justify-center gap-3">
          {chips.map((chip, idx) => (
            <PromptChip key={idx} text={chip} onClick={setQuery} />
          ))}
        </div>
      </div>
    </div>
  );
}
