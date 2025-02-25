'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ResultContent />
    </Suspense>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const analysis = searchParams.get('analysis');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Analysis Result
        </h1>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner transition-colors duration-300">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {analysis ? analysis : 'No analysis available.'}
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

// Функция-заглушка для загрузки
function LoadingComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-gray-100">
      Loading...
    </div>
  );
}
