import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-slideUp">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
        
        <div className="flex gap-3 justify-end p-6 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-white hover:border-gray-400 font-semibold text-sm transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
