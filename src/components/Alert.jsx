import React, { useEffect } from 'react';

const Alert = ({ type = 'success', message, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  const alertStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconStyles = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const borderStyles = {
    success: 'border-l-4 border-green-500',
    error: 'border-l-4 border-red-500',
    warning: 'border-l-4 border-yellow-500',
    info: 'border-l-4 border-blue-500',
  };

  return (
    <div className={`fixed top-4 right-4 max-w-sm p-4 rounded-lg border ${alertStyles[type]} ${borderStyles[type]} shadow-lg animate-slideDown z-50`}>
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{iconStyles[type]}</span>
        <div className="flex-1">
          <p className="font-semibold text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-lg font-bold opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
