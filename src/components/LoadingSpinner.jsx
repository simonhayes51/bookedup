const LoadingSpinner = ({ size = 'md', text = null }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`animate-spin rounded-full border-yellow-400 border-t-transparent ${sizes[size]}`}
      ></div>
      {text && <p className="text-gray-300 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
