import React, { useMemo } from 'react';

interface WritingInputProps {
  text: string;
  setText: (text: string) => void;
  disabled?: boolean;
}

export const WritingInput: React.FC<WritingInputProps> = ({ text, setText, disabled }) => {
  
  const wordCount = useMemo(() => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  }, [text]);

  // Simple heuristic for word count color
  const countColor = wordCount < 80 ? 'text-amber-600' : wordCount > 150 ? 'text-red-600' : 'text-emerald-600';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="writing" className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Your Body Paragraph
        </label>
        <span className={`text-xs font-medium ${countColor} bg-slate-100 px-2 py-1 rounded-full`}>
          {wordCount} words
        </span>
      </div>
      
      <div className="relative flex-grow">
        <textarea
          id="writing"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder="Start writing your body paragraph here... Focus on one main idea, explain it, and provide examples."
          className="w-full h-64 md:h-80 p-4 text-slate-800 font-serif text-lg leading-loose bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-y"
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        A good body paragraph is typically between 90-140 words.
      </p>
    </div>
  );
};