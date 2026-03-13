export default function About() {
  return (
    <div className="max-w-xl mx-auto w-full px-4 py-16 flex flex-col items-center text-center animate-fade-in-up">
      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 shadow-[0_0_30px_rgba(124,58,237,0.2)]">
        <span className="text-3xl">🚀</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-white tracking-tight">About ToolScout</h1>
      
      <div className="relative w-full">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl -translate-x-4 -translate-y-4"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-3xl translate-x-4 translate-y-4"></div>

        <div className="bg-[#121212] border border-gray-800 p-8 md:p-12 rounded-3xl w-full relative z-10 shadow-2xl flex flex-col gap-6">
          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Built by AJ, 15, from India.
          </p>
          
          <div className="w-12 h-px bg-gray-700 mx-auto"></div>
          
          <p className="text-lg text-gray-400 leading-relaxed italic font-medium">
            "I kept wasting hours finding the right tools for my projects. So I built this."
          </p>
        </div>
      </div>
    </div>
  );
}
