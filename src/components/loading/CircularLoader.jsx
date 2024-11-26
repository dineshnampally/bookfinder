import React from 'react';

const CircularLoader = ({ progress, isComplete }) => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="relative w-20 h-20">
        <div
          className={`w-full h-full rounded-full border-4 ${
            isComplete ? 'border-purple-600' : 'border-purple-300'
          } border-t-transparent animate-spin`}
          style={{
            animation: isComplete ? 'none' : 'spin 1s linear infinite',
          }}
        ></div>

        <div
          className={`absolute inset-0 flex items-center justify-center text-sm font-semibold ${
            isComplete ? 'text-white' : 'text-purple-600'
          }`}
        >
          {isComplete ? '100%' : `${progress}%`}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CircularLoader;
