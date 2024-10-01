import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <p>{message}</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onCancel}
                        className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
