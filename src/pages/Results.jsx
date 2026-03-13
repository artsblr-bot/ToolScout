import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import Loader from '../components/Loader';
import { fetchToolRecommendations } from '../lib/gemini';

export default function Results() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      fetchToolRecommendations(query).then(res => {
        setData(res);
        setLoading(false);
      }).catch(err => {
        console.error("Failed to fetch tools", err);
        setError(err.message);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [query]);

  if (!query) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-white">No project described</h2>
        <Link to="/" className="text-primary hover:underline">Go back home</Link>
      </div>
    );
  }

  // Group tools by category
  const tools = data?.tools || [];
  const buildGuide = data?.build_guide;

  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  const categoryOrder = ["Frontend", "Backend", "Database", "Hosting", "AI", "APIs", "Design", "Testing"];
  
  const sortedCategories = Object.keys(groupedTools).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col items-center animate-fade-in">
      {/* Header bar */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
        <div className="flex bg-[#121212] border border-gray-800 rounded-2xl py-3 px-5 w-full max-w-2xl shadow-lg">
          <p className="text-gray-300 font-medium truncate flex-grow">
            <span className="text-gray-500 mr-2">Searching for:</span>
            {query}
          </p>
        </div>
        <Link 
          to="/"
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-[#161616] hover:bg-[#202020] border border-gray-800 hover:border-gray-600 transition-all font-semibold text-sm text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">Search Again</span>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center py-20 animate-fade-in group w-full flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 mb-6 border border-red-500/20">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-white">Something went wrong</h2>
          <p className="text-gray-400 max-w-md text-center">{error}</p>
        </div>
      ) : !data || !data.tools || data.tools.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No tools found for this description.
        </div>
      ) : (
        <div className="w-full space-y-16">
          {sortedCategories.map((category, i) => (
            <div 
              key={category} 
              className="space-y-6 opacity-0"
              style={{ animation: `fade-in-up 0.5s ease-out ${i * 0.15 + 0.1}s forwards` }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{category}</h2>
                <div className="h-px bg-gray-800 flex-grow ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedTools[category].map((tool, idx) => (
                  <ToolCard key={idx} tool={tool} />
                ))}
              </div>
            </div>
          ))}

          {buildGuide && (
            <div 
              className="mt-16 pt-16 border-t border-gray-800 opacity-0"
              style={{ animation: `fade-in-up 0.5s ease-out ${sortedCategories.length * 0.15 + 0.1}s forwards` }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">How to Build This</h2>
                  <p className="text-gray-400">Your step-by-step roadmap to building {query}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#121212] border border-gray-800 px-4 py-2 rounded-xl flex flex-col">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Time</span>
                    <span className="text-sm text-gray-300 font-medium">{buildGuide.estimated_time}</span>
                  </div>
                  <div className="bg-[#121212] border border-gray-800 px-4 py-2 rounded-xl flex flex-col">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Difficulty</span>
                    <span className="text-sm font-medium" style={{ 
                      color: buildGuide.difficulty?.toLowerCase() === 'beginner' ? '#4ade80' : 
                             buildGuide.difficulty?.toLowerCase() === 'intermediate' ? '#fbbf24' : '#f87171' 
                    }}>
                      {buildGuide.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
                {buildGuide.steps?.map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-[#161616] group-hover:bg-primary text-gray-400 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300">
                      <span className="font-bold text-sm">{step.order}</span>
                    </div>

                    {/* Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#121212] border border-gray-800 p-5 rounded-2xl hover:border-gray-600 transition-colors shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold shrink-0">
                          {step.tool}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{step.instruction}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
