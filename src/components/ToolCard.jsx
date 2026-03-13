import { ExternalLink, Star, ShieldCheck } from 'lucide-react';

export default function ToolCard({ tool }) {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-gray-800 bg-card hover:border-gray-600 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 overflow-hidden group">
      <div className="p-6 flex-grow flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center text-xl font-bold text-white border border-gray-700/50">
              {tool.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{tool.name}</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                {tool.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-500/20">
            <Star className="w-3.5 h-3.5 fill-current" />
            {tool.rating}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed text-sm flex-grow">
          {tool.description}
        </p>

        {/* Best For section */}
        <div className="p-3 rounded-xl bg-[#262626]/50 border border-gray-800/50">
          <div className="flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-gray-300">Best for</span>
          </div>
          <p className="text-sm text-gray-400">{tool.best_for}</p>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="px-6 py-4 border-t border-gray-800 bg-[#161616] flex items-center justify-between">
        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wide">
          {tool.free_tier ? 'Free Tier' : 'Freemium'}
        </span>
        
        <a 
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Visit site
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
