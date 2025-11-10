import React from 'react';

interface TopicInputProps {
  topic: string;
  setTopic: (topic: string) => void;
  disabled?: boolean;
}

export const TopicInput: React.FC<TopicInputProps> = ({ topic, setTopic, disabled }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
      <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
        IELTS Task 2 Topic
      </label>
      <div className="relative">
        <textarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={disabled}
          placeholder="Example: Some people believe that the best way to solve traffic congestion is to increase tax on car owners. To what extent do you agree or disagree?"
          className="w-full min-h-[100px] p-4 text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-y text-base leading-relaxed"
        />
        <div className="absolute top-2 right-2 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Paste the full exam question here so the AI can check your Task Response.
      </p>
    </div>
  );
};