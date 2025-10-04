import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-hidden="true"></div>
      <p className="mt-4 text-gray-600" aria-live="polite">{t('loading')}</p>
    </div>
  );
};

export default LoadingSpinner;