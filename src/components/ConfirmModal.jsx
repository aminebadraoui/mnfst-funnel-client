import React from 'react';

function ConfirmModal({ isOpen, onClose, onConfirm, onAlternative, message, confirmText, alternativeText }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 w-64 p-6 rounded-lg shadow-xl">
                <p className="text-gray-50 text-center mb-16">{message}</p>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-sm w-32 text-gray-50 py-2 px-4 rounded hover:bg-green-600"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onAlternative}
                        className="bg-blue-500 text-sm w-32 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        {alternativeText}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-sm w-32 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;