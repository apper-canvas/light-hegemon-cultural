import { motion } from 'framer-motion';
import CultureBadge from '@/components/atoms/CultureBadge';
import ProgressBar from '@/components/atoms/ProgressBar';
import ApperIcon from '@/components/ApperIcon';

const CulturePanel = ({ cultures, onCultureSelect, selectedCulture }) => {
  if (!cultures?.length) {
    return (
      <div className="parchment-bg rounded-lg p-6 border-2 border-accent/30">
        <h3 className="font-display text-lg font-semibold text-primary mb-4">
          Cultural Overview
        </h3>
        <div className="text-center py-8">
          <ApperIcon name="Users" className="w-12 h-12 text-primary/30 mx-auto mb-3" />
          <p className="text-primary/60">No cultures established yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="parchment-bg rounded-lg p-6 border-2 border-accent/30 shadow-parchment">
      <h3 className="font-display text-lg font-semibold text-primary mb-4 flex items-center gap-2">
        <ApperIcon name="Users" size={20} />
        Cultural Overview
      </h3>
      
      <div className="space-y-4">
{cultures.map((culture, index) => (
          <motion.div
            key={culture.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selectedCulture?.Id === culture.Id 
                ? 'border-accent bg-accent/10'
                : 'border-surface-300 hover:border-accent/50 bg-surface-50'
              }
            `}
            onClick={() => onCultureSelect?.(culture)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3">
              <CultureBadge culture={culture} size="medium" />
              <div className="flex items-center gap-3">
<div className="text-right">
                  <div className="text-xs text-primary/60">Innovation</div>
                  <div className="font-semibold text-primary">{culture.innovation}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <ProgressBar 
                value={culture.happiness} 
                color="success"
                size="small"
                showLabel
                label="Happiness"
              />
              
              <div className="flex flex-wrap gap-1 mt-2">
                {culture.traditions?.slice(0, 3).map((tradition, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-surface-200 text-xs rounded-full text-primary/80"
                  >
                    {tradition}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CulturePanel;