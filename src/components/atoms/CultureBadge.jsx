import { motion } from 'framer-motion';

const CultureBadge = ({ culture, size = 'medium', showName = true, className = '' }) => {
  const sizes = {
    small: 'w-4 h-4 text-xs',
    medium: 'w-6 h-6 text-sm',
    large: 'w-8 h-8 text-base'
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm', 
    large: 'text-base'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <div
        className={`rounded-full flex items-center justify-center font-medium text-white shadow-md ${sizes[size]}`}
        style={{ backgroundColor: culture.color }}
        title={culture.description}
      >
        {culture.name.charAt(0)}
      </div>
      {showName && (
        <span className={`font-medium text-primary ${textSizes[size]}`}>
          {culture.name}
        </span>
      )}
    </motion.div>
  );
};

export default CultureBadge;