import { Sparkles } from 'lucide-react';

export default function PromptChip({ text, onClick }) {
  return (
    <button
      onClick={() => onClick(text)}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-[#1a1a1a] text-sm text-gray-300 hover:bg-[#262626] hover:border-gray-600 hover:text-white transition-all duration-200 cursor-pointer"
    >
      <Sparkles className="w-4 h-4 text-primary" />
      {text}
    </button>
  );
}
