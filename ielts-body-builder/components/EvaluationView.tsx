import React, { useState } from 'react';
import { EvaluationResult } from '../types';

interface EvaluationViewProps {
  result: EvaluationResult;
  onReset: () => void;
}

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  let color = 'text-red-500 border-red-500';
  if (score >= 6) color = 'text-amber-500 border-amber-500';
  if (score >= 7.5) color = 'text-emerald-500 border-emerald-500';

  return (
    <div className={`flex items-center justify-center w-24 h-24 rounded-full border-4 ${color} bg-white shadow-lg`}>
      <span className={`text-3xl font-bold ${color}`}>{score}</span>
    </div>
  );
};

const CriterionCard: React.FC<{ title: string; content: string; icon: React.ReactNode }> = ({ title, content, icon }) => (
  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
    <div className="flex items-center gap-2 mb-2 text-slate-700 font-semibold">
      {icon}
      <h4>{title}</h4>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
  </div>
);

export const EvaluationView: React.FC<EvaluationViewProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'improved' | 'model'>('feedback');

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Section: Score & Overall Comment */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="flex-shrink-0">
          <ScoreCircle score={result.bandScore} />
          <div className="text-center mt-2 text-xs font-medium text-slate-400 uppercase tracking-wider">Band Score</div>
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Assessment Summary</h3>
          <p className="text-slate-600 leading-relaxed">{result.feedback.overallComment}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-center border-b border-slate-200">
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'feedback' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Detailed Feedback
        </button>
        <button
          onClick={() => setActiveTab('improved')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'improved' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Improved Version
        </button>
        <button
          onClick={() => setActiveTab('model')}
          className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'model' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
        >
          New Model Answer
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[400px]">
        
        {activeTab === 'feedback' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CriterionCard 
              title="Task Response" 
              content={result.feedback.taskResponse} 
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            />
            <CriterionCard 
              title="Coherence & Cohesion" 
              content={result.feedback.coherenceCohesion} 
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
            />
            <CriterionCard 
              title="Lexical Resource" 
              content={result.feedback.lexicalResource} 
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
            <CriterionCard 
              title="Grammatical Range" 
              content={result.feedback.grammaticalRangeAccuracy} 
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
            />
          </div>
        )}

        {activeTab === 'improved' && (
          <div className="prose max-w-none">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">Polished Version of Your Writing</h4>
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-slate-800 font-serif text-lg leading-loose shadow-inner">
              {result.improvedVersion}
            </div>
            <p className="mt-4 text-slate-500 text-sm">
              This version keeps your original ideas but enhances vocabulary, grammar, and flow to reach a higher band score.
            </p>
          </div>
        )}

        {activeTab === 'model' && (
          <div className="prose max-w-none">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">Band 9 Model Paragraph (Alternative Approach)</h4>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-slate-800 font-serif text-lg leading-loose shadow-inner">
              {result.modelAnswer}
            </div>
            <p className="mt-4 text-slate-500 text-sm">
              This is a completely fresh body paragraph written by the AI demonstrating perfect structure and vocabulary for this topic.
            </p>
          </div>
        )}

      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Start New Practice
        </button>
      </div>
    </div>
  );
};