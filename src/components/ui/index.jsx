import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * 90s Retro Button Component - MTV Vibes!
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-none retro-shadow transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-4 border-black';

  const variants = {
    primary: 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600',
    secondary: 'bg-yellow-400 text-black hover:bg-yellow-500',
    outline: 'border-4 border-black bg-white text-black hover:bg-gray-100',
    neon: 'bg-black text-cyan-400 border-cyan-400 neon-border hover:text-pink-500',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600',
    success: 'bg-gradient-to-r from-lime-400 to-green-500 text-black hover:from-lime-500 hover:to-green-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-12 py-5 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

/**
 * 90s Input Component
 */
export const Input = ({
  label,
  error,
  helper,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold uppercase tracking-wide text-white mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-4 border-black rounded-none bg-white text-black font-bold focus:outline-none focus:border-cyan-400 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-yellow-400 font-bold">{error}</p>
      )}
      {helper && !error && (
        <p className="mt-2 text-sm text-gray-300">{helper}</p>
      )}
    </div>
  );
};

/**
 * 90s Retro Card Component
 */
export const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`retro-card ${
        hover ? 'hover:scale-105 cursor-pointer transition-transform' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * 90s Badge Component - Bold and Bright!
 */
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-800 text-white border-gray-600',
    primary: 'bg-pink-500 text-white border-pink-700',
    success: 'bg-lime-400 text-black border-lime-600',
    warning: 'bg-yellow-400 text-black border-yellow-600',
    danger: 'bg-red-500 text-white border-red-700',
    info: 'bg-cyan-400 text-black border-cyan-600',
    neon: 'bg-black text-cyan-400 neon-border',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wide border-2 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

/**
 * Avatar Component with 90s border
 */
export const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
  };

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border-4 border-black ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 text-white font-bold">
          {alt?.charAt(0)?.toUpperCase() || '?'}
        </div>
      )}
    </div>
  );
};

/**
 * 90s Modal Component
 */
export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop with 90s pattern */}
        <div
          className="fixed inset-0 transition-opacity bg-black bg-opacity-90 bg-dots"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom retro-card text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {title && (
            <div className="px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500">
              <h3 className="text-xl font-bold uppercase text-white">{title}</h3>
            </div>
          )}

          <div className="px-6 py-4 bg-white">
            {children}
          </div>

          {footer && (
            <div className="px-6 py-4 bg-yellow-400 border-t-4 border-black">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 90s Select Component
 */
export const Select = ({ label, error, options, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold uppercase tracking-wide text-white mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border-4 border-black rounded-none bg-white text-black font-bold focus:outline-none focus:border-cyan-400 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-yellow-400 font-bold">{error}</p>
      )}
    </div>
  );
};

/**
 * 90s Textarea Component
 */
export const Textarea = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold uppercase tracking-wide text-white mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 border-4 border-black rounded-none bg-white text-black font-bold focus:outline-none focus:border-cyan-400 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-yellow-400 font-bold">{error}</p>
      )}
    </div>
  );
};

/**
 * 90s Empty State Component
 */
export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      {Icon && <Icon className="mx-auto h-16 w-16 text-cyan-400" />}
      <h3 className="mt-4 text-xl font-bold uppercase text-white">{title}</h3>
      {description && (
        <p className="mt-2 text-base text-gray-300">{description}</p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
};
