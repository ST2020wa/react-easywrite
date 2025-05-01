import React from 'react';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({ onConfirm, onCancel }: DeleteConfirmModalProps) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          {t('deleteAll.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t('deleteAll.confirmMessage', 'Are you sure you want to delete all your writing? This action cannot be undone.')}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          >
            {t('deleteAll.cancel', 'Cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            {t('deleteAll.confirm', 'Delete')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;