import React from 'react';

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  selected?: boolean;
  className?: string;
};

const OptionButton = ({ children, icon, selected = false, className = '' }: Props) => {
  const baseClasses =
    'flex items-center justify-center px-4 py-2 text-sm font-medium border rounded-md cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

  const selectedClasses = 'bg-blue-100 border-blue-500 text-blue-700';
  const defaultClasses = 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';

  return (
    <button
      type="button"
      className={`${baseClasses} ${selected ? selectedClasses : defaultClasses} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default OptionButton;