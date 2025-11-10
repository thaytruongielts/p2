import React, { useState, useCallback } from 'react';
import { TopicInput } from './components/TopicInput';
import { WritingInput } from './components/WritingInput';
import { EvaluationView } from './components/EvaluationView';
import { evaluateBodyParagraph } from './services/geminiService';
import { AppState, EvaluationResult } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [topic, setTopic] = useState<string>('');
  const [userText, setUserText] = useState<string>('');
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = useCallback(async () => {
    if (!topic.trim() || !userText.trim()) {
      setErrorMessage("Please enter both a topic and your writing.");
      return;
    }

    setAppState(AppState.EVALUATING);
    setErrorMessage('');

    try {
      const result = await evaluateBodyParagraph(topic, userText);
      setEvaluationResult(result);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      setErrorMessage("Something went wrong during evaluation. Please check your connection or API key.");
    }
  }, [topic, userText]);

  const handleReset = useCallback(() => {
    setAppState(AppState.IDLE);
    setTopic('');
    setUserText('');
    setEvaluationResult(null);
    setErrorMessage('');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                IELTS <span className="text-primary">Body Builder</span>
              </h1>
            </div>
            <div className="text-sm text-slate-500 hidden sm:block">
              Powered by Gemini 2.5
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Header (Only show in Idle state) */}
        {appState === AppState.IDLE && (
          <div className="text-center mb-10 space-y-3 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-900">Master the Body Paragraph</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Paste your Task 2 topic, write your argument, and get instant AI feedback with a Band 9 model answer.
            </p>
          </div>
        )}

        {appState === AppState.SUCCESS && evaluationResult ? (
          <EvaluationView result={evaluationResult} onReset={handleReset} />
        ) : (
          <div className={`grid gap-6 transition-opacity duration-500 ${appState === AppState.EVALUATING ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            
            {/* Error Banner */}
            {errorMessage && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <TopicInput topic={topic} setTopic={setTopic} disabled={appState === AppState.EVALUATING} />
            
            <WritingInput text={userText} setText={setUserText} disabled={appState === AppState.EVALUATING} />

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                disabled={!topic || !userText || appState === AppState.EVALUATING}
                className={`
                  relative overflow-hidden group
                  px-8 py-4 rounded-lg font-bold text-white shadow-lg transition-all
                  ${!topic || !userText 
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary to-blue-600 hover:shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]'
                  }
                `}
              >
                {appState === AppState.EVALUATING ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Evaluating...
                  </span>
                ) : (
                  "Evaluate My Writing"
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;